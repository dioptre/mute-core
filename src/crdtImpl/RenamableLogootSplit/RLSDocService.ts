import { RenamableListOperation, RenamableReplicableList, TextOperation } from 'mute-structs'
import { CollaboratorsService } from '../../collaborators'
import { DocService } from '../../core'
import { RLSSync } from '../../syncImpl'
import { RLSDocument } from './RLSDocument'
import { RLSState } from './RLSState'
import { RLSSyncMessage } from './RLSSyncMessage'

export class RLSDocService extends DocService<RenamableReplicableList, RenamableListOperation> {
  constructor(
    id: number,
    collaboratorService: CollaboratorsService,
    document: RLSDocument,
    sync: RLSSync,
    syncMessage: RLSSyncMessage
  ) {
    super(id, collaboratorService, document, sync, syncMessage)
  }

  logLocalOperation(id: number, textope: TextOperation, ope: RenamableListOperation): void {
    console.log('Implementation pending...', id, textope.author, ope.author)
  }

  logRemoteOperation(
    id: number,
    texteope: TextOperation[],
    ope: RenamableListOperation,
    clock: number,
    author: number
  ): void {
    console.log('Implementation pending...', id, texteope.length, ope.author, clock, author)
  }

  get state(): RLSState {
    const { vector, richOperations, networkClock } = this.sync.stateElements
    return new RLSState(this.id, this.document.doc, richOperations, vector, networkClock)
  }
}
