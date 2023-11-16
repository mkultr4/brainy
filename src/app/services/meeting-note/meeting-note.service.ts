import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { MeetingNote } from 'src/app/models/meeting-note/meeting-note';
import { Topic } from 'src/app/models/meeting-note/topic';
import { TopicFile } from 'src/app/models/meeting-note/topic-file';
import { SocketService } from '../socket.service';
import { environment } from 'src/environments/environment';
import * as io from 'socket.io-client';
import { MeetingNoteType } from 'src/app/models/meeting-note/meeting-note-type';


@Injectable()
export class MeetingNoteService extends SocketService {
  // Store
  private dataStore;
  // Meeting note
  private _meetingNote;
  public meetingNote: Observable<MeetingNote>;
  // Topics
  private _topics;
  public topics: Observable<Topic>;

  private coreId;

  constructor() {
    super(environment.urlSocketMeetingNote);

    this.dataStore = {
      meetingNote: new MeetingNote(),
      topics: []
    };

    // Meeting note
    this._meetingNote = new BehaviorSubject<MeetingNote>(new MeetingNote());
    this._topics = new BehaviorSubject<Topic>(new Topic());
    // Topic
    this.meetingNote = this._meetingNote.asObservable();
    this.topics = this._topics.asObservable();
  }

  /*proccessRequest(event: string, data: any): Observable<any> {
    throw new Error('Method not implemented.');
  }*/

  /** 
   * Load core by id
   * @param id, type, canceled
   */
  loadById(id: string, type: MeetingNoteType, canceled: number) {
    this.coreId = id;
    const observable = new Observable((observer) => {
      // Init data stores
      this.proccessRequest('getMeetingNoteByCoreId', id).subscribe((meetingNoteByCore) => {
        this.dataStore.meetingNote = Object.assign(new MeetingNote(), meetingNoteByCore);
        //console.log(this.dataStore.meetingNote);
        this._meetingNote.next(Object.assign({}, this.dataStore).meetingNote);
        observer.next(this.dataStore.meetingNote);
      });
    });
    return observable;
  }

  /**
   * Create a meeting note
   * @param core
   */
  create(meetingNote: MeetingNote) {    
    const newMeetingNote = this.proccessRequest('saveMeetingNote', meetingNote)
    return newMeetingNote;
  }

  /**
   * Get meeting note type
   */
  getMeetingNoteTypes(): Observable<MeetingNoteType[]> {
    let allTypes = this.proccessRequest('getAllMeetingNoteTypes', {});
    return allTypes;
  }

  /**
   * Load task by id
   * @param meetingNoteId
   * @param empty
   */
  loadTopicsById(meetingNoteId, empty) {

  }

  /**
   * Add topic
   */
  addTopic() {

  }

  /**
   * Remove topic
   * @params topicId
   */
  removeTopic(topicId: any) {

  }

  /**
   * Update store
   * @param topic
   */
  updateStoreTopicDesciptionItems(topic: Topic, descriptionItems) {

  }

  /**
   * Update store draft
   * @param topic
   */
  updateStoreTopicDescriptionItemsDraft(topic: Topic, descriptionItems) {

  }

  /**
   * Get comment unresolved
   */
  getCommentsUnresolved() {

  }

  /**
   * Update store status
   * @param status
   */
  updateStoreStatus(status) {

  }

  getTopicById(topicId: string) {

  }

  /**
   * Update topic title
   * @param topicId
   * @param title
   */
  updateTopicTitle(topicId, title: string, emptyDefault = true) {

  }

  /**
   * Update topic list title
   * @param topics
   */
  updateTopicListTitle(topics: Topic[]) {

  }

  /**
   * Program meeting note
   * @param meetingNote
   */
  program(meetingNote) {

  }

  /**
   * Upload image gallery
   * @param file
   */
  uploadImageGallery(file: File) {

  }

  /**
   * Delete image gallery
   * @param imageGalleryId
   */
  deleteImageGallery(imageGalleryId) {

  }

  /**
   * Update image gallery
   * @param topicFile
   * @param file
   */
  updateImageGallery(topicFile: TopicFile, file: File) {

  }

  /**
   * Update image gallery
   * @param file
   */
  updateTopicFile(topicFile: TopicFile) {

  }

  /**
   * Upload topic file
   * @param file
   */
  uploadTopicFile(file: File) {

  }

  /**
   * Updae order topics
   * @param topics
   */
  updateOrderTopics(topics: Array<Topic>) {

  }
}
