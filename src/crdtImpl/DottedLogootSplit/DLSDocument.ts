import { Del, Ins, SimpleDotPos } from 'dotted-logootsplit'
import { OpEditableReplicatedList } from 'dotted-logootsplit/dist/types/core/op-replicated-list'
import { TextDelete, TextInsert, TextOperation } from 'mute-structs'
import { Document, Position } from '../../core'
import { sync } from '../../proto'
import { BlockOperation } from './DLSRichOperation'

export class DLSDocument extends Document<
  OpEditableReplicatedList<SimpleDotPos, string>,
  BlockOperation
> {
  public handleLocalOperation(operations: TextOperation[]): void {
    operations.forEach((textOperation) => {
      if (textOperation instanceof TextInsert) {
        const blockOperation = this._doc.insertAt(textOperation.index, textOperation.content)
        this.localOperationLogsSubject.next({ textop: textOperation, operation: blockOperation })
        this.localOperationSubject.next(blockOperation)
      } else if (textOperation instanceof TextDelete) {
        const blockOperationList = this._doc.removeAt(textOperation.index, textOperation.length)
        blockOperationList.forEach((blockOperation) => {
          this.localOperationLogsSubject.next({ textop: textOperation, operation: blockOperation })
          this.localOperationSubject.next(blockOperation)
        })
      }
    })
  }

  public handleRemoteOperation(operation: BlockOperation): TextOperation[] {
    const res = this._doc.applyOp(operation)
    const tab: TextOperation[] = []
    res.forEach((ope) => {
      if (ope instanceof Ins) {
        tab.push(new TextInsert(ope.index, ope.content, operation.replica()))
      } else if (ope instanceof Del) {
        tab.push(new TextDelete(ope.index, ope.length, operation.replica()))
      }
    })
    return tab
  }

  public positionFromIndex(_index: number): Position | undefined {
    throw new Error('Method not implemented.')
  }

  public indexFromId(_id: sync.IdentifierMsg): number {
    throw new Error('Method not implemented.')
  }
}
