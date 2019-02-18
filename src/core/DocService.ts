import { TextOperation } from 'mute-structs'
import { Observable, Subject, zip } from 'rxjs'
import { filter, first } from 'rxjs/operators'
import { CollaboratorsService, ICollaborator } from '../collaborators'
import { LocalOperation, RemoteOperation } from '../logs'
import { Disposable } from '../misc'
import { IExperimentLogs } from '../misc/IExperimentLogs'
import { Document, Position } from './Document'
import { State } from './State'
import { Sync } from './Sync'
import { SyncMessage } from './SyncMessage'

export abstract class DocService<Seq, Op> extends Disposable {
  protected document: Document<Seq, Op>
  protected sync: Sync<Op>
  protected syncMsg: SyncMessage<Op>

  protected id: number
  protected collaboratorService: CollaboratorsService

  protected _localOperationForLog$: Subject<LocalOperation<Op>>
  protected _remoteOperationForLog: Subject<RemoteOperation<Op>>

  protected experimentalLogsSubject: Subject<IExperimentLogs>

  constructor(
    id: number,
    collaboratorService: CollaboratorsService,
    document: Document<Seq, Op>,
    sync: Sync<Op>,
    syncMessage: SyncMessage<Op>
  ) {
    super()
    this.id = id
    this.collaboratorService = collaboratorService
    this.document = document
    this.sync = sync
    this.syncMsg = syncMessage

    this._localOperationForLog$ = new Subject()
    this._remoteOperationForLog = new Subject()
    this.experimentalLogsSubject = new Subject()

    this.document.remoteOperations$ = this.sync.remoteOperations$
    this.sync.localOperations$ = this.document.localOperations$
    this.sync.remoteQuerySync$ = this.syncMsg.remoteQuerySync$
    this.sync.remoteReplySync$ = this.syncMsg.remoteReplySync$
    this.sync.remoteRichOperations$ = this.syncMsg.remoteRichOperations$
    this.syncMsg.localRichOperations$ = this.sync.localRichOperations$
    this.syncMsg.querySync$ = this.sync.querySync$
    this.syncMsg.replySync$ = this.sync.replySync$

    this.newSub = this.document.localOperationLog$.subscribe((op) => {
      this.logLocalOperation(this.id, op.textop, op.operation)
    })
    const e = zip(
      this.document.remoteOperationLog$,
      this.sync.logsRemoteRichOperations$,
      (v1, v2) => ({ v1, v2 })
    )
    this.newSub = e.subscribe(({ v1, v2 }) => {
      this.logRemoteOperation(this.id, v1.textop, v1.operation, v2.clock, v2.author)
    })

    const experimentalLogZip = zip(this.sync.experimentLogs$, this.document.experimentLogs$)

    this.newSub = this.syncMsg.experimentLogs$
      .pipe(filter((sml) => sml.type === 'remote'))
      .subscribe((syncMsgLog) => {
        experimentalLogZip
          .pipe(
            filter(
              ([_sl, dl]) => dl.type === 'remote' && syncMsgLog.operation.operation === dl.operation
            ),
            first()
          )
          .subscribe(([syncLog, docLog]) => {
            this.experimentalLogsSubject.next({
              type: 'remote',
              site: this.id,
              operation: syncMsgLog.operation,
              vector: syncLog.vector,
              time1: syncMsgLog.time1,
              time2: syncMsgLog.time2,
              time3: docLog.time3,
              time4: docLog.time4,
              stats: docLog.stats,
            })
          })
      })

    this.newSub = experimentalLogZip
      .pipe(filter(([_sl, dl]) => dl.type === 'local'))
      .subscribe(([syncLog, docLog]) => {
        this.syncMsg.experimentLogs$
          .pipe(
            filter((sml) => sml.type === 'local' && docLog.operation === sml.operation.operation),
            first()
          )
          .subscribe((syncMsgLog) => {
            this.experimentalLogsSubject.next({
              type: 'local',
              site: this.id,
              operation: syncMsgLog.operation,
              vector: syncLog.vector,
              time1: syncMsgLog.time1,
              time2: syncMsgLog.time2,
              time3: docLog.time3,
              time4: docLog.time4,
              stats: docLog.stats,
            })
          })
      })
  }

  synchronize() {
    this.sync.sync()
  }

  indexFromId(pos: any): number {
    return this.document.indexFromId(pos)
  }

  positionFromIndex(index: number): Position | undefined {
    return this.document.positionFromIndex(index)
  }

  abstract get state(): State<Seq, Op>
  abstract logLocalOperation(id: number, textope: TextOperation, ope: Op): void
  abstract logRemoteOperation(
    id: number,
    texteope: TextOperation[],
    ope: Op,
    clock: number,
    author: number
  ): void

  set localTextOperations$(source: Observable<TextOperation[]>) {
    this.document.localTextOperations$ = source
  }

  get remoteTextOperations$(): Observable<{
    collaborator: ICollaborator | undefined
    operations: TextOperation[]
  }> {
    return this.document.remoteTextOperations$
  }

  get localOperationForLog$(): Observable<LocalOperation<Op>> {
    return this._localOperationForLog$.asObservable()
  }

  get remoteOperationForLog$(): Observable<RemoteOperation<Op>> {
    return this._remoteOperationForLog.asObservable()
  }

  get experimentsLogs$() {
    return this.experimentalLogsSubject.asObservable()
  }

  get digestUpdate$(): Observable<number> {
    return this.document.digest$
  }

  dispose() {
    this._localOperationForLog$.complete()
    this._remoteOperationForLog.complete()
    this.experimentalLogsSubject.complete()
    super.dispose()
  }
}
