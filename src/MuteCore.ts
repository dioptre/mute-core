import { merge, Observable, Subject } from 'rxjs'

import { map } from 'rxjs/operators'
import { CollaboratorsService, ICollaborator } from './collaborators/'
import { Disposable } from './Disposable'
import { DocService } from './doc/'
import {
  BroadcastMessage,
  JoinEvent,
  MessageEmitter,
  NetworkMessage,
  SendRandomlyMessage,
  SendToMessage,
} from './network/'
import { collaborator as proto } from './proto'
import { RichLogootSOperation, SyncMessageService, SyncService } from './sync'
import { generateId } from './util'

export class MuteCore implements Disposable, MessageEmitter {
  readonly collaboratorsService: CollaboratorsService
  readonly docService: DocService
  readonly syncService: SyncService
  readonly syncMessageService: SyncMessageService

  private initSubject: Subject<string>

  constructor(me: proto.ICollaborator) {
    if (!me.muteCoreId) {
      me.muteCoreId = generateId()
    }

    /* FIXME: this.me object doesn't have id property set to the correct network id (it is set to 0 just below).
      This is because the id is initialized once join() method is called.
    */

    this.initSubject = new Subject<string>()

    this.collaboratorsService = new CollaboratorsService(Object.assign({ id: 0 }, me))
    this.docService = new DocService(me.muteCoreId)
    this.syncService = new SyncService(me.muteCoreId, this.collaboratorsService)
    this.syncMessageService = new SyncMessageService()

    this.docService.initSource = this.initSubject
    this.docService.remoteLogootSOperationSource = this.syncService.onRemoteLogootSOperation

    this.syncService.localLogootSOperationSource = this.docService.onLocalLogootSOperation
    this.syncService.remoteQuerySyncSource = this.syncMessageService.onRemoteQuerySync
    this.syncService.remoteReplySyncSource = this.syncMessageService.onRemoteReplySync
    this.syncService.remoteRichLogootSOperationSource = this.syncMessageService.onRemoteRichLogootSOperation
    // this.syncService.storedStateSource = this.syncStorage.onStoredState

    this.syncMessageService.localRichLogootSOperationSource = this.syncService.onLocalRichLogootSOperation
    this.syncMessageService.querySyncSource = this.syncService.onQuerySync
    this.syncMessageService.replySyncSource = this.syncService.onReplySync
  }

  set messageSource(source: Observable<NetworkMessage>) {
    this.collaboratorsService.messageSource = source
    this.syncMessageService.messageSource = source
  }

  get onInit(): Observable<string> {
    return this.initSubject.asObservable()
  }

  get onMsgToBroadcast(): Observable<BroadcastMessage> {
    return merge(
      this.collaboratorsService.onMsgToBroadcast,
      this.syncMessageService.onMsgToBroadcast
    )
  }

  get onMsgToSendRandomly(): Observable<SendRandomlyMessage> {
    return merge(
      this.collaboratorsService.onMsgToSendRandomly,
      this.syncMessageService.onMsgToSendRandomly
    )
  }

  get onMsgToSendTo(): Observable<SendToMessage> {
    return merge(this.collaboratorsService.onMsgToSendTo, this.syncMessageService.onMsgToSendTo)
  }

  init(key: string): void {
    this.initSubject.next(key)
  }

  dispose(): void {
    this.collaboratorsService.dispose()
    this.docService.dispose()
    this.syncService.dispose()
    this.syncMessageService.dispose()
  }
}
