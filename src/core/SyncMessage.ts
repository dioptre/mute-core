import { Observable, Subject, zip } from 'rxjs'
import { IMessageIn, IMessageOut, Service } from '../misc'
import { IExperimentLogsSyncMessage } from '../misc/IExperimentLogs'
import { sync as proto } from '../proto'
import { Streams, StreamsSubtype } from '../Streams'
import { Interval } from './Interval'
import { ReplySyncEvent } from './ReplySyncEvent'
import { RichOperation } from './RichOperation'
import { StateVector } from './StateVector'

export abstract class SyncMessage<Op> extends Service<proto.ISyncMsg, proto.SyncMsg> {
  protected remoteQuerySyncSubject: Subject<StateVector>
  protected remoteQuerySyncIdSubject: Subject<number>
  protected remoteRichOperationSubject: Subject<RichOperation<Op>>
  protected remoteReplySyncSubject: Subject<ReplySyncEvent<Op>>

  protected experimentLogsSubject: Subject<IExperimentLogsSyncMessage>

  constructor(messageIn$: Observable<IMessageIn>, messageOut$: Subject<IMessageOut>) {
    super(messageIn$, messageOut$, Streams.DOCUMENT_CONTENT, proto.SyncMsg)

    this.remoteQuerySyncSubject = new Subject()
    this.remoteQuerySyncIdSubject = new Subject()
    this.remoteRichOperationSubject = new Subject()
    this.remoteReplySyncSubject = new Subject()

    this.experimentLogsSubject = new Subject()

    // FIXME: should I save the subscription for later unsubscribe/subscribe?
    this.newSub = this.messageIn$.subscribe(({ senderId, msg }) => {
      switch (msg.type) {
        case 'richOpMsg':
          const t1 = process.hrtime()
          const richOpe = this.handleRichOpMsg(msg.richOpMsg as proto.RichOperationMsg)
          const t2 = process.hrtime()
          this.experimentLogsSubject.next({
            type: 'remote',
            operation: richOpe,
            time1: t1,
            time2: t2,
          })
          break
        case 'querySync':
          this.remoteQuerySyncIdSubject.next(senderId) // Register the id of the peer
          this.handleQuerySyncMsg(msg.querySync as proto.QuerySyncMsg)
          break
        case 'replySync':
          this.handleReplySyncMsg(msg.replySync as proto.ReplySyncMsg)
          break
      }
    })
  }

  get remoteRichOperations$(): Observable<RichOperation<Op>> {
    return this.remoteRichOperationSubject.asObservable()
  }

  get remoteQuerySync$(): Observable<StateVector> {
    return this.remoteQuerySyncSubject.asObservable()
  }

  get remoteReplySync$(): Observable<ReplySyncEvent<Op>> {
    return this.remoteReplySyncSubject.asObservable()
  }

  get experimentLogs$(): Observable<IExperimentLogsSyncMessage> {
    return this.experimentLogsSubject.asObservable()
  }

  set localRichOperations$(source: Observable<RichOperation<Op>>) {
    this.newSub = source.subscribe((richOp) => {
      const t2 = process.hrtime()
      const richOpMsg = this.serializeRichOperation(richOp)
      super.send({ richOpMsg }, StreamsSubtype.DOCUMENT_OPERATION)
      const t1 = process.hrtime()
      this.experimentLogsSubject.next({
        type: 'local',
        operation: richOp,
        time1: t1,
        time2: t2,
      })
    })
  }

  set querySync$(source: Observable<StateVector>) {
    this.newSub = source.subscribe((vector) => {
      const querySync = proto.QuerySyncMsg.create()
      vector.forEach((clock, id) => {
        if (id !== undefined && clock !== undefined) {
          querySync.vector[id] = clock
        }
      })
      super.send({ querySync }, StreamsSubtype.DOCUMENT_QUERY)
    })
  }

  set replySync$(source: Observable<ReplySyncEvent<Op>>) {
    this.newSub = zip(
      source,
      this.remoteQuerySyncIdSubject.asObservable(),
      (replySyncEvent, id) => ({ id, replySyncEvent })
    ).subscribe(({ id, replySyncEvent: { richOps, intervals } }) => {
      const replySync = proto.ReplySyncMsg.create()

      replySync.richOpsMsg = richOps.map((o) => this.serializeRichOperation(o))
      replySync.intervals = intervals.map(({ id, begin, end }) =>
        proto.IntervalMsg.create({ id, begin, end })
      )
      super.send({ replySync }, StreamsSubtype.DOCUMENT_REPLY, id)
    })
  }

  dispose(): void {
    this.remoteQuerySyncSubject.complete()
    this.remoteQuerySyncIdSubject.complete()
    this.remoteRichOperationSubject.complete()
    this.remoteReplySyncSubject.complete()
    this.experimentLogsSubject.complete()
    super.dispose()
  }

  protected abstract serializeRichOperation(
    richOperation: RichOperation<Op>
  ): proto.RichOperationMsg
  protected abstract deserializeRichOperation(
    richOperationMsg: proto.RichOperationMsg
  ): RichOperation<Op>

  private handleRichOpMsg(content: proto.RichOperationMsg): RichOperation<Op> {
    const richOp = this.deserializeRichOperation(content)
    this.remoteRichOperationSubject.next(richOp)
    return richOp
  }

  private handleQuerySyncMsg(content: proto.QuerySyncMsg): void {
    const map = new Map()
    Object.keys(content.vector).forEach((key) => {
      map.set(parseInt(key, 10), content.vector[key])
    })
    this.remoteQuerySyncSubject.next(new StateVector(map))
  }

  private handleReplySyncMsg({ richOpsMsg, intervals }: proto.ReplySyncMsg): void {
    const richOps = richOpsMsg.map((o) =>
      this.deserializeRichOperation(o as proto.RichOperationMsg)
    )

    this.remoteReplySyncSubject.next(
      new ReplySyncEvent<Op>(
        richOps,
        intervals.map(
          ({ id, begin, end }) => new Interval(id as number, begin as number, end as number)
        )
      )
    )
  }
}
