import { Observable, Subject } from 'rxjs'

import { IMessageIn, IMessageOut, Service } from '../misc'
import { metadata as proto } from '../proto'
import { Streams, StreamsSubtype } from '../Streams'
import { FixData, FixDataState } from './FixData'
import { Logs, LogState } from './Logs'
import { Pulsar, PulsarState } from './Pulsar'
import { Title, TitleState } from './Title'

export enum MetaDataType {
  Title,
  FixData,
  Logs,
  Pulsar,
}

export type MetaDataState = TitleState | FixDataState | LogState | PulsarState

export interface MetaDataMessage {
  type: MetaDataType
  data: MetaDataState
}

export class MetaDataService extends Service<proto.IMetaData, proto.MetaData> {
  static mergeTitle(s1: TitleState, s2: TitleState): TitleState {
    return Title.merge(s1, s2)
  }

  static mergeFixData(s1: FixDataState, s2: FixDataState): FixDataState {
    return FixData.merge(s1, s2)
  }

  private title: Title
  private fixData: FixData
  private logs: Logs
  private pulsar: Pulsar

  private localUpdateSubject: Subject<MetaDataMessage>
  private remoteUpdateSubject: Subject<MetaDataMessage>

  constructor(
    messageIn$: Observable<IMessageIn>,
    messageOut$: Subject<IMessageOut>,
    titleState: TitleState,
    fixDataState: FixDataState,
    logState: LogState,
    pulsarState: PulsarState,
    id: number
  ) {
    super(messageIn$, messageOut$, Streams.METADATA, proto.MetaData)

    this.title = new Title(titleState)
    this.fixData = new FixData(fixDataState)
    this.logs = new Logs(id, logState)
    this.pulsar = new Pulsar(id, pulsarState)

    this.localUpdateSubject = new Subject()
    this.remoteUpdateSubject = new Subject()

    this.newSub = this.messageIn$.subscribe(({ msg: { type, data } }) => {
      const dataObj = JSON.parse(data)
      switch (type) {
        case MetaDataType.Title:
          this.remoteUpdateSubject.next({
            type: MetaDataType.Title,
            data: this.title.handleRemoteState(dataObj),
          })
          break
        case MetaDataType.FixData:
          this.remoteUpdateSubject.next({
            type: MetaDataType.FixData,
            data: this.fixData.handleRemoteFixDataState(dataObj),
          })
          break
        case MetaDataType.Logs:
          dataObj.vector = new Map<number, number>(dataObj.vector)
          this.remoteUpdateSubject.next({
            type: MetaDataType.Logs,
            data: this.logs.handleRemoteLogState(dataObj.id, {
              share: dataObj.share,
              vector: dataObj.vector,
            }),
          })
          break
        case MetaDataType.Pulsar:
          this.remoteUpdateSubject.next({
            type: MetaDataType.Pulsar,
            data: this.pulsar.handleRemotePulsar(dataObj.id, {
              activatePulsar: dataObj.activatePulsar,
            }),
          })
          break
        default:
          console.error('No MetaDataType for type ' + type)
      }
    })
  }

  set localUpdate$(source: Observable<MetaDataMessage>) {
    this.newSub = source.subscribe(({ type, data }) => {
      switch (type) {
        case MetaDataType.Title:
          const { title, titleModified } = data as TitleState
          this.title.handleLocalState({ title, titleModified })
          super.send(
            { type: MetaDataType.Title, data: JSON.stringify(this.title.state) },
            StreamsSubtype.METADATA_TITLE
          )
          break
        case MetaDataType.FixData:
          break
        case MetaDataType.Logs:
          const { share } = data as LogState
          this.logs.handleLocalLogState(share)
          this.remoteUpdateSubject.next({
            type: MetaDataType.Logs,
            data: this.logs.state,
          })
          const state = this.logs.state
          super.send(
            {
              type: MetaDataType.Logs,
              data: JSON.stringify({
                id: this.logs.id,
                share: state.share,
                vector: Array.from(state.vector || new Map<number, number>()),
              }),
            },
            StreamsSubtype.METADATA_LOGS
          )
          break
        case MetaDataType.Pulsar:
          const { activatePulsar } = data as PulsarState
          this.pulsar.handleLocalPulsar(activatePulsar)
          this.remoteUpdateSubject.next({
            type: MetaDataType.Pulsar,
            data: this.pulsar.state,
          })
          const statePulsar = this.pulsar.state
          super.send(
            {
              type: MetaDataType.Pulsar,
              data: JSON.stringify({
                id: this.pulsar.id,
                activatePulsar: statePulsar.activatePulsar,
              }),
            },
            StreamsSubtype.METADATA_PULSAR
          )
          break
        default:
          console.error('No MetaDataType for type ' + type)
      }
    })
  }

  set memberJoin$(source: Observable<number>) {
    this.newSub = source.subscribe((id) => {
      super.send(
        { type: MetaDataType.FixData, data: JSON.stringify(this.fixData.state) },
        StreamsSubtype.METADATA_FIXDATA,
        id
      )
      super.send(
        { type: MetaDataType.Title, data: JSON.stringify(this.title.state) },
        StreamsSubtype.METADATA_TITLE,
        id
      )
      const state = this.logs.stateWithVectorAsArray
      super.send(
        {
          type: MetaDataType.Logs,
          data: JSON.stringify({ share: state.share, vector: state.vector }),
        },
        StreamsSubtype.METADATA_LOGS,
        id
      )
      const statePulsar = this.pulsar.state
      super.send(
        {
          type: MetaDataType.Pulsar,
          data: JSON.stringify({
            activatePulsar: statePulsar.activatePulsar,
          }),
        },
        StreamsSubtype.METADATA_PULSAR,
        id
      )
    })
  }

  get remoteUpdate$(): Observable<MetaDataMessage> {
    return this.remoteUpdateSubject.asObservable()
  }

  dispose(): void {
    this.localUpdateSubject.complete()
    this.remoteUpdateSubject.complete()
  }
}
