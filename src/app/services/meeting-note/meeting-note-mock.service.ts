import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { MEETING_NOTE_TYPES, TOPICS_EXAMPLE, AGREEMENTS_EXAMPLE, TASKS_CLOSE, MEETING_NOTE_AUDIT } from '../../data/mock-meeting-note';
import { MeetingNote } from '../../models/meeting-note/meeting-note';
import { CORES, CORE_STATUSES } from '../../data/mock-cores';
import { Topic } from '../../models/meeting-note/topic';
import * as uuid from 'uuid/v4';
import { TopicFile } from '../../models/meeting-note/topic-file';
import { TopicLineItem } from 'src/app/models/meeting-note/topic-line-item';
import { TopicLineItemReference } from 'src/app/models/meeting-note/topic-line-item-reference';
import { WORKSPACE_ACCESSES } from 'src/app/data/mock-workspace-accesses';
import { Invitation } from 'src/app/models/invitations/invitation';
import * as _ from 'lodash';
import * as moment from 'moment';
@Injectable()
export class MeetingNoteMockService extends BaseService {
  // To design purpose
  public topicEditionLogs = [];
  // Store
  private dataStore;
  // Meeting note
  private _meetingNote;
  public meetingNote: Observable<MeetingNote>;
  // Topics
  private _topics;
  public topics: Observable<Topic>;
  // Constructor
  constructor() {
    super()
    this.dataStore = {
      meetingNote: new MeetingNote(),
      topics: []
    };
    // Meeting note
    this._meetingNote = new BehaviorSubject<MeetingNote>(new MeetingNote());
    this.meetingNote = this._meetingNote.asObservable();
    // Topics
    this._topics = new BehaviorSubject<Topic[]>([]);
    this.topics = this._topics.asObservable();
  }

  proccessRequest(event: string, data: any): Observable<any> {
    throw new Error('Method not implemented.');
  }


  /**
   * Load core by id
   * @param id
   */
  loadById(id, type, canceled) {
    const observable = new Observable(observer => {
      const meetingNote = Object.assign(new MeetingNote(), CORES.filter(c => c.type.key === 'meeting-note')[0]);
      this.dataStore.meetingNote = _.cloneDeep(meetingNote);
      if (canceled) {
        this.dataStore.meetingNote.status = CORE_STATUSES.filter(s => s.key === 'canceled')[0];
      }

      if (type === 'scheduled') {
        this.dataStore.meetingNote.meetingNoteType = MEETING_NOTE_TYPES.filter(t => t.key === 'scheduled')[0];
        const futureMonth = moment().add(1, 'M');
        console.log(futureMonth);
        this.dataStore.meetingNote.date = futureMonth.toDate();
        this.dataStore.meetingNote.hour = '09:00 pm'
        this.dataStore.meetingNote.duration = '12'
        this.dataStore.meetingNote.place = 'Mexicali 64, Condesa'
      } else {
        this.dataStore.meetingNote.meetingNoteType = MEETING_NOTE_TYPES.filter(t => t.key === 'fill_now')[0];
      }
      setTimeout(() => {
        this._meetingNote.next(Object.assign({}, this.dataStore).meetingNote);
        observer.next(this.dataStore.meetingNote);
      });
    });
    return observable;
  }

  /**
   * Load core by id
   * @param id
   */
  updateScheduledDate(meetingNote: MeetingNote) {
    const observable = new Observable(observer => {
      this.dataStore.meetingNote = meetingNote;
      this._meetingNote.next(Object.assign({}, this.dataStore).meetingNote);
      observer.next(this.dataStore.meetingNote);
    });
    return observable;
  }
  /**
 * Create a meeting note
 * @param core
 */
  create(meetingNote: MeetingNote) {
    const observable = new Observable(observer => {
      const create = meetingNote;
      create.id = '3';
      observer.next(create);
    });
    return observable;
  }

  /**
 * Get meeting note types
 */
  getMeetingNoteTypes() {
    return of(MEETING_NOTE_TYPES);
  }

  /**
   * Load topics by id
   * @param meetingNoteId 
   * @param empty 
   */
  loadTopicsById(meetingNoteId, empty) {
    const observable = new Observable(observer => {
      this.dataStore.topics = [];
      this.dataStore.topics = _.cloneDeep( TOPICS_EXAMPLE);
      if (empty) {
        this.dataStore.topics = [];
      }
      if (this.dataStore.topics.length === 0) {
        const emptyTopic = new Topic();
        emptyTopic.id = uuid();
        emptyTopic.order = 1;
        this.dataStore.topics.push(emptyTopic);
      }
      this._topics.next(Object.assign([], this.dataStore).topics);
      observer.next(this.dataStore.topics);
    });
    return observable;
  }
  /**
   * Add topic
   */
  addTopic() {
    const observable = Observable.create((observer) => {
      const topic = new Topic();
      topic.id = uuid();
      topic.order = this.dataStore.topics.length + 1;
      //  topic.title = 'Tema sin título';
      this.dataStore.topics.push(topic);
      this._topics.next(Object.assign([], this.dataStore).topics);
      observer.next(topic);
    });
    return observable;
  }
  /**
   * Remove topic
   * @param topicId
   */
  removeTopic(topicId: any) {
    const observable = Observable.create((observer) => {
      this.dataStore.topics.forEach((t, index) => {
        if (t.id === topicId) {
          this.dataStore.topics.splice(index, 1);
        }
      });
      if (this.dataStore.topics.length === 0) {
        const emptyTopic = new Topic();
        emptyTopic.id = uuid();
        emptyTopic.order = 1;
        this.dataStore.topics.push(emptyTopic);
      }
      this._topics.next(Object.assign([], this.dataStore).topics);
      observer.next(this.dataStore.topics);
    });
    return observable;
  }
  /**
   * Update  Topics descriptions
   * @param topic 
   * @param descriptionItems 
   */
  updateTopicDescriptionItems(topicId: any, descriptionItems) {
    const observable = Observable.create((observer) => {
      this.dataStore.topics.forEach((t, index) => {
        if (t.id === topicId) {
          this.dataStore.topics[index].descriptionItems = Object.assign([], descriptionItems);
          // console.log(this.dataStore.topics[index].descriptionItems);
        }
      });
      this._topics.next(Object.assign([], this.dataStore).topics);
      observer.next(descriptionItems);
    });
    return observable;
  }
  /**
   * Get topic line item
   * @param topicId 
   * @param topicLineId 
   */
  getTopicLineItem(topicId: any, topicLineId: any, referenceLine: string) {
    const observable = Observable.create((observer) => {
      let topicLineItem;
      this.dataStore.topics.forEach((t, index) => {
        if (t.id === topicId) {
          if (referenceLine === TopicLineItemReference.DESCRIPTION) {
            topicLineItem = this.dataStore.topics[index].descriptionItems.filter(i => i.id === topicLineId)[0];
          }
          else if (referenceLine === TopicLineItemReference.AGREEMENT) {
            topicLineItem = this.dataStore.topics[index].agreementItems.filter(i => i.id === topicLineId)[0];
          }
          // console.log(this.dataStore.topics[index].descriptionItems);
        }
      });
      observer.next(Object.assign(new TopicLineItem(), topicLineItem));
      observer.complete();
    });
    return observable;
  }
  /**
   * Get subtopic and subtopic content
   * @param topicId 
   * @param subtopicId 
   */
  getSubtopicContent(topicId: any, subtopicId: any) {
    const observable = Observable.create((observer) => {
      let descriptionItems = [];
      this.dataStore.topics.forEach((t, index) => {
        if (t.id === topicId) {
          descriptionItems = this.dataStore.topics[index].descriptionItems.filter(i => i.id === subtopicId || i.idParent === subtopicId);
          // console.log(this.dataStore.topics[index].descriptionItems);
        }
      });
      observer.next(descriptionItems);
    });
    return observable;
  }
  /**
   * Remove subtopic ontent
   * @param topicId 
   * @param subTopicId 
   */
  removeSubtopicContent(topicId: any, subTopicId: any) {
    const observable = Observable.create((observer) => {
      this.dataStore.topics.forEach((t, index) => {
        if (t.id === topicId) {
          this.dataStore.topics[index].descriptionItems =
            Object.assign([], this.dataStore.topics[index]
              .descriptionItems.filter(i => i.id !== subTopicId && i.idParent !== subTopicId));
          // console.log(this.dataStore.topics[index].descriptionItems);
        }
      });
      this._topics.next(Object.assign([], this.dataStore).topics);
      observer.next(topicId);
    });
    return observable;
  }
  /**
   * Remove topic line item
   * @param topicId 
   * @param itemId 
   */
  removeTopicLineItem(topicId: any, itemId: any) {
    const observable = Observable.create((observer) => {
      this.dataStore.topics.forEach((t, index) => {
        if (t.id === topicId) {
          this.dataStore.topics[index].descriptionItems =
            Object.assign([], this.dataStore.topics[index].descriptionItems.filter(i => i.id !== itemId));
          // console.log(this.dataStore.topics[index].descriptionItems);
        }
      });
      this._topics.next(Object.assign([], this.dataStore).topics);
      observer.next(topicId);
    });
    return observable;
  }
  /**
   * Update topic line item
   * @param topicId 
   * @param itemId 
   */
  updateTopicLineItem(topicId: any, topicLineItem: TopicLineItem) {
    const observable = Observable.create((observer) => {
      this.dataStore.topics.forEach((t, index) => {
        if (t.id === topicId) {
          this.dataStore.topics[index].descriptionItems.forEach((i, index2) => {
            if (i.id === topicLineItem.id) {
              this.dataStore.topics[index].descriptionItems[index2] = Object.assign(new TopicLineItem(), topicLineItem);
            }
          })
          // console.log(this.dataStore.topics[index].descriptionItems);
        }
      });
      this._topics.next(Object.assign([], this.dataStore).topics);
      observer.next(topicId);
    });
    return observable;
  }
  /**
   * Update store Topic description
   * @param topic
   */
  updateStoreTopicDescriptionItems(topic: Topic, descriptionItems) {

    this.dataStore.topics.forEach((t, index) => {
      if (t.id === topic.id) {
        this.dataStore.topics[index].descriptionItems = Object.assign([], descriptionItems);
        // console.log(this.dataStore.topics[index].descriptionItems);
      }
    });
    this._topics.next(Object.assign([], this.dataStore).topics);
  }

  /**
   * Update store agreement lines
   * @param topic
   */
  updateStoreAgreementDescriptionItems(topic: Topic, agreementItems) {

    this.dataStore.topics.forEach((t, index) => {
      if (t.id === topic.id) {
        this.dataStore.topics[index].agreementItems = Object.assign([], agreementItems);
        // console.log(this.dataStore.topics[index].descriptionItems);
      }
    });
    this._topics.next(Object.assign([], this.dataStore).topics);
  }
  /**
   * Update store topic
   * @param topic
   */
  updateTopicCommentThread(topic: Topic) {

    this.dataStore.topics.forEach((t, i) => {
      if (t.id === topic.id) {
        this.dataStore.topics[i].commentThreads = Object.assign([], topic.commentThreads);
      }
    });

    this._topics.next(Object.assign([], this.dataStore).topics);
  }


  /**
   * Update store status
   * @param status
   */
  updateStoreStatus(status) {
    this.dataStore.meetingNote.status = status;
    this._meetingNote.next(Object.assign({}, this.dataStore).meetingNote);
  }

  getTopicById(topicId: string) {
    const observable = Observable.create((observer) => {
      let topic;
      this.dataStore.topics.forEach(t => {
        if (t.id === topicId) {
          topic = t;
        }
      });

      observer.next(Object.assign(new Topic(), topic));
    });
    return observable;
  }
  /**
   * Mark pending
   * @param topicId 
   * @param pending 
   */
  markPending(topicId, pending) {
    const observable = Observable.create((observer) => {
      let topic;
      this.dataStore.topics.forEach((t, i) => {
        if (t.id === topicId) {
          console.log(pending);
          this.dataStore.topics[i].pending = pending;
          topic = this.dataStore.topics[i];
        }
      });
      this._topics.next(Object.assign([], this.dataStore).topics);
      observer.next(topic);
    });
    return observable;
  }
  /**
   * Update topic title
   * @param topicId
   * @param title
   */
  updateTopicTitle(topicId, title: string, emptyDefault = true) {
    const observable = Observable.create((observer) => {
      let topic;
      if (emptyDefault && (!title || title.length === 0)) {
        title = 'Tema sin título';
      }
      this.dataStore.topics.forEach((t, i) => {
        if (t.id === topicId) {
          this.dataStore.topics[i].title = title;
          this.dataStore.topics[i].saved = true;
          topic = this.dataStore.topics[i];

        }
      });
      this._topics.next(Object.assign([], this.dataStore).topics);
      observer.next(topic);
    });
    return observable;
  }

  /**
   * Update topic agreement
   * @param topicId 
   * @param agreement 
   */
  updateTopicAgreement(topicId, agreement) {
    const observable = Observable.create((observer) => {
      let topic;

      this.dataStore.topics.forEach((t, i) => {
        if (t.id === topicId) {
          this.dataStore.topics[i].agreement = agreement;
          topic = this.dataStore.topics[i];

        }
      });
      this._topics.next(Object.assign([], this.dataStore).topics);
      observer.next(topic);
    });
    return observable;
  }

  /**
  * Update topic task
  * @param topicId 
  * @param task 
  */
  updateTopicTask(topicId, topicLineItem: TopicLineItem) {
    const observable = Observable.create((observer) => {
      this.dataStore.topics.forEach((topic, indexTopic) => {
        if (topic.id === topicId) {

          if (topicLineItem.reference === TopicLineItemReference.DESCRIPTION) {
            this.dataStore.topics[indexTopic].descriptionItems.forEach((line: TopicLineItem, index) => {
              if (line.id === topicLineItem.id) {
                this.dataStore.topics[indexTopic].descriptionItems[index] = Object.assign(new TopicLineItem(), topicLineItem);
              }
            })
          } else if (topicLineItem.reference === TopicLineItemReference.AGREEMENT) {
            this.dataStore.topics[indexTopic].agreementItems.forEach((line: TopicLineItem, index) => {
              if (line.id === topicLineItem.id) {
                this.dataStore.topics[indexTopic].descriptionItems[index] = Object.assign(new TopicLineItem(), topicLineItem);
              }
            })

          }

        }
      });
      this._topics.next(Object.assign([], this.dataStore).topics);
      observer.next(topicLineItem);
    });
    return observable;
  }




  /**
   * Update topic list title
   * @param topics
   */
  updateTopicListTitle(topics: Topic[]) {
    const observable = Observable.create((observer) => {
      topics.forEach((t, i) => {
        const index = this.dataStore.topics.indexOf(t);
        console.log(index);
        if (t.title.length === 0) {
          console.log('without title');
          this.dataStore.topics[index].title = 'Tema sin título';
          this.dataStore.topics[index].saved = true;
        } else {
          console.log('with title');
          this.dataStore.topics[index].title = t.title;
          this.dataStore.topics[index].saved = true;
        }

      });
      this._topics.next(Object.assign([], this.dataStore).topics);
      observer.next(this.dataStore.topics);
    });
    return observable;
  }

  /**
   * Program meeting notr
   * @param meetingNote 
   */
  program(meetingNote) {
    const observable = Observable.create((observer) => {
      setTimeout(() => {
        observer.next(meetingNote);
      }, 1500);
    });
    return observable;
  }
  /**
   * Upload image gallery
   * @param file
   */
  uploadImageGallery(file: File) {
    const observable = Observable.create((observer) => {
      setTimeout(() => {
        const url = URL.createObjectURL(file);
        const img = document.createElement('img');
        img.src = url;
        img.onload = (event) => {
          // console.log(event);
          const w = img.width;
          const h = img.height;

          const topicFile = new TopicFile();
          topicFile.id = uuid();
          topicFile.url = url;
          topicFile.setting = { naturalWidth: w, naturalHeight: h }
          topicFile.name = file.name;
          img.remove();
          observer.next(topicFile);
        };

      });
    });
    return observable;
  }

  /**
  * Delete image gallery
  * @param imageGalleryId
  */
  deleteImageGallery(imageGalleryId) {
    const observable = Observable.create((observer) => {
      observer.next(imageGalleryId);
    });
    return observable;
  }
  /**
   * Update image gallery
   * @param topicFile
   * @param file
   */
  updateImageGallery(topicFile: TopicFile, file: File) {
    const observable = Observable.create((observer) => {
      setTimeout(() => {
        const url = URL.createObjectURL(file);
        const img = document.createElement('img');
        img.src = url;
        img.onload = (event) => {
          // console.log(event);
          const w = img.width;
          const h = img.height;

          //  topicFile.id = uuid();
          topicFile.url = url;
          topicFile.setting = { naturalWidth: w, naturalHeight: h }
          topicFile.name = file.name;
          img.remove();
          observer.next(topicFile);
        };

      });
    });
    return observable;
  }

  /**
   * Update image gallery
   * @param file
   */
  updateTopicFile(topicFile: TopicFile) {
    const observable = Observable.create((observer) => {
      observer.next(topicFile);
    });
    return observable;
  }
  /**
   * Upload topic file
   * @param file
   */
  uploadTopicFile(file: File) {
    const observable = Observable.create((observer) => {
      setTimeout(() => {
        const url = URL.createObjectURL(file);
        const topicFile = new TopicFile();
        topicFile.id = uuid();
        topicFile.url = url;
        topicFile.name = file.name;
        // Next
        observer.next(topicFile);
      });
    });
    return observable;
  }
  /**
   * Update order topics
   * @param topics
   */
  updateOrderTopics(topics: Array<Topic>) {
    const observable = Observable.create((observer) => {
      observer.next(true);
    });
    return observable;
  }

  // #region Feedback Close
  /**
   * Get meeting note close view
   * @param id
   */
  getMeetingNoteCloseById(id: string) {
    const observable = Observable.create(async (observer) => {
      const meetingNote = Object.assign(new MeetingNote(), CORES.filter(c => c.type.key === 'meeting-note')[0]);
      meetingNote.owner = WORKSPACE_ACCESSES[0].user;
      meetingNote.ownerRol = WORKSPACE_ACCESSES[0].rol;
      meetingNote.status = CORE_STATUSES.filter(s => s.key === 'approved')[0];
      meetingNote.approvedDate = new Date();
      meetingNote.approvedBy = <Invitation>{ workspaceAccess: WORKSPACE_ACCESSES[2] };
      meetingNote.approvedBy.groupReference = 'approver';
      meetingNote.nextMeeting = <MeetingNote>{
        id: uuid(),
        date: new Date().toDateString(),
        hour: '21:00',
        duration: '12',
        place: 'Mexicali 64, Condesa'
      }
      observer.next(meetingNote);
    });
    return observable;
  }
  /**
   * Find topics of meeting note close
   * @param id
   */
  findTopicsMeetingNoteClose(id: any) {
    const observable = Observable.create((observer) => {
      observer.next(AGREEMENTS_EXAMPLE);
    });
    return observable;
  }
  /**
   * Find topics of meeting note close
   * @param id
   */
  findTasksMeetingNoteClose(id: any) {
    const observable = Observable.create((observer) => {
      observer.next(TASKS_CLOSE);
    });
    return observable;
  }
  // #endregion

  /**
   * Comments unresolved
   */
  getCommentsUnresolved() {
    const observable = Observable.create((observer) => {
      let commentPendings = [];
      if (this.dataStore.topics.length > 0) {
        this.dataStore.topics.forEach((topic: Topic) => {
          commentPendings = commentPendings.concat(topic.commentThreads.filter(c => c.status.key !== 'resolved'));
        });
      }
      observer.next(commentPendings);
    });
    return observable;

  }
  /**
   * Check if meeting note is ready to approve
   */
  checkIsReadyToApprove() {
    const observable = Observable.create((observer) => {
      let response = { topicsPending: [], topicsWithoutAgreement: [], commentsUnresolved: [], readyToApprove: false };
      let readyToApprove = false;
      if (this.dataStore.topics.length > 0 && !this.dataStore.meetingNote.nextMeeting) {
        const topicsPending = this.dataStore.topics.filter(t => t.pending === true);
        let topicsWithoutAgreement = [];
        this.dataStore.topics.forEach((topic: Topic) => {
          // Check agreements
          if (topic.agreementItems.length > 0) {
            const item = topic.agreementItems[0];
            if (item.type === 'text') {
              const cleanLine = item.content.text;
              if (cleanLine === '<br>' || cleanLine === '<span></span>' || cleanLine === '<span><br></span>' || cleanLine === '') {
                topicsWithoutAgreement.push(topic);
              }
            }
          }
          // Check comments
          const commentsUnresolved = topic.commentThreads.filter(c => c.status.key !== 'resolved');
          // Push the comments unresolved
          response.commentsUnresolved.push(...commentsUnresolved);
        });
        // Topics pending
        response.topicsPending = topicsPending;
        // Topics without agreement
        response.topicsWithoutAgreement = topicsWithoutAgreement;
        // Check if ready to approve  
        if (response.commentsUnresolved.length === 0 &&
          response.topicsPending.length === 0 &&
          response.topicsWithoutAgreement.length === 0) {
          readyToApprove = true;
        }

      }
      if (this.dataStore.meetingNote.nextMeeting) {
        readyToApprove = true;
      }
      response.readyToApprove = readyToApprove;
      observer.next(response);
    });
    return observable;

  }

  // Schedule next meeting
  scheduleNextMeeting(topicPendings, topicsWithoutAgreement) {
    const observable = Observable.create((observer) => {
      this.dataStore.meetingNote.nextMeeting = new MeetingNote();
      this._meetingNote.next(Object.assign({}, this.dataStore).meetingNote);
      observer.next(this.dataStore.meetingNote);
    });
    return observable;
  }
  // Get audit of meeting note
  getAudit(meetingNoteId, withAuditory = false) {
    const observable = Observable.create((observer) => {
      let auditory = [];
      if (withAuditory) {
        auditory = Object.assign([], MEETING_NOTE_AUDIT);
      }
      observer.next(auditory);
    });
    return observable;
  }

  // Get topic edition log
  findTopicEditionLog(topicId: any) {
    return of(this.topicEditionLogs.filter(t => t.idTopic === topicId));
  }

  // Get topic edition log
  getUpdatesTopic(topicId: any) {

    const observable = Observable.create((observer) => {
      const topic = this.dataStore.topics.filter(t => t.id === topicId)[0];
      // Title edition
      const title = `<span class="topic-line-edited-wrapper"  id="${'topic-line-edited-edition-title'}">${topic.title}</span>`
      // Topic Line edition
      const updateLine = topic.descriptionItems[1];
      updateLine.content.text = `<span class="topic-line-edited-wrapper" id="${'topic-line-edited-edition-text-1'}">${topic.descriptionItems[1].content.text}</span>`
      // Return updates
      observer.next({ title: title, updateItems: [updateLine], addedLines: [], removeItems: [] });
    });
    return observable;
  }
}
