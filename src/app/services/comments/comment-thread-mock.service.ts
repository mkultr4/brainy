import { Injectable } from '@angular/core';
import { CommentThread } from '../../models/comments/comment-thread';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { CommentThreadMessage } from '../../models/comments/comment-thread-message';
import * as moment from 'moment';
import { COMMENT_THREADS_STATUSES, COMMENT_THREADS_TYPES, COMMENTS_THREAD_MESSAGE_EXAMPLE } from '../../data/mock-comments';
import { PARTICIPANTS_TYPES } from '../../data/mock-participants';
import { BaseService } from '../base.service';
import * as _ from 'lodash';
@Injectable()
export class CommentThreadMockService extends BaseService {
  // Commenthread
  private _commentThreads: BehaviorSubject<CommentThread[]>;
  public commentThreads: Observable<CommentThread[]>;
  // Comments
  private _commentThreadMessages: BehaviorSubject<CommentThreadMessage[]>;
  public commentThreadMessages: Observable<CommentThreadMessage[]>;

  // Comments per date
  private _commentThreadMessagesPerDate: BehaviorSubject<any[]>;
  public commentThreadMessagesPerDate: Observable<any[]>;

  private baseUrl: string;
  private dataStore: {
    commentThreads: Array<CommentThread>,
    commentThreadMessages: Array<CommentThreadMessage>,
    commentThreadMessagesPerDate: Array<any>
  };
  proccessRequest(event: string, data: any): Observable<any> {
    throw new Error('Method not implemented.');
  }
  constructor() {
    super();
    this.dataStore = {
      commentThreads: [],
      commentThreadMessages: [],
      commentThreadMessagesPerDate: []
    };
    this._commentThreads = <BehaviorSubject<CommentThread[]>>new BehaviorSubject([]);
    this.commentThreads = this._commentThreads.asObservable();

    this._commentThreadMessages = <BehaviorSubject<CommentThreadMessage[]>>new BehaviorSubject([]);
    this.commentThreadMessages = this._commentThreadMessages.asObservable();

    this._commentThreadMessagesPerDate = <BehaviorSubject<any[]>>new BehaviorSubject([]);
    this.commentThreadMessagesPerDate = this._commentThreadMessagesPerDate.asObservable();

  }


  loadAll(levelId?, referenceId?, commentThreads?: Array<CommentThread>) {

    this._commentThreads = <BehaviorSubject<CommentThread[]>>new BehaviorSubject([]);
    this.commentThreads = this._commentThreads.asObservable();
    const observable = new Observable((observer) => {
      if (commentThreads && commentThreads.length > 0) {
        this.dataStore.commentThreads = _.cloneDeep(commentThreads);

      } else {
        this.dataStore.commentThreads = [];

      }
      this._commentThreads.next(Object.assign([], this.dataStore).commentThreads);
      observer.next(this.dataStore.commentThreads);
      observer.complete();
    });
    return observable;

  }

  create(commentThread: CommentThread) {
    const observable = new Observable((observer) => {
      this.dataStore.commentThreads.push(commentThread);
      this._commentThreads.next(Object.assign({}, this.dataStore).commentThreads);
      observer.next(this.dataStore.commentThreads);
      observer.complete();
    });
    return observable;
  }
  update(commentThread: CommentThread, forceError?) {

    const observable = new Observable((observer) => {
      if (forceError) {
        observer.next(false);
        observer.complete();
      } else {
        commentThread.saved = true;
        this.dataStore.commentThreads.forEach((c, i) => {
          if (c.id === commentThread.id) {
            this.dataStore.commentThreads[i] = commentThread;
          }
        });

        this._commentThreads.next(Object.assign({}, this.dataStore).commentThreads);
        observer.next(true);
        observer.complete();
      }

    });

    return observable;


  }
  /**
   * Mar read comment
   * @param commentThread
   */
  markRead(commentThread: CommentThread) {

    const observable = new Observable((observer) => {

      this.dataStore.commentThreads.forEach((c, i) => {
        if (c.id === commentThread.id) {
          this.dataStore.commentThreads[i].unreadMessages = false;
        }
      });

      this._commentThreads.next(Object.assign({}, this.dataStore).commentThreads);
      observer.next(true);
      observer.complete();


    });

    return observable;


  }
  remove(commentThreadId: string) {
    const observable = new Observable((observer) => {
      this.dataStore.commentThreads.forEach((c, i) => {
        if (c.id === commentThreadId) {
          this.dataStore.commentThreads.splice(i, 1);
        }
      });

      this._commentThreads.next(Object.assign({}, this.dataStore).commentThreads);
      observer.next(this.dataStore.commentThreads);
      observer.complete();

    });

    return observable;

  }

  getDownloadName(commentThread: CommentThread) {
    const observable = new Observable((observer) => {

      observer.next('comentarios_ajustes_visuales.pdf');
      observer.complete();
    });

    return observable;
  }
  /**
   * Download a comment thread
   * @param commentThread
   */
  downloadCommentThread(commentThread: CommentThread) {

    const observable = new Observable((observer) => {
      setTimeout(() => {
        observer.next('/assets/data/download.pdf');
        observer.complete();
      }, 2000);
    });
    return observable;
  }

  // Load all comment thread messages
  loadAllCommentThreadMessages(commentThreadId: string, _commentThreadMessages?: Array<CommentThreadMessage>) {
    const observable = new Observable((observer) => {
      const commentThread = this.dataStore.commentThreads.filter(c => c.id === commentThreadId);
      if (commentThread.length > 0) {
        // Comments
        const commentThreadMessages = commentThread[0].comments;

        this.dataStore.commentThreadMessages = commentThreadMessages;
        this._commentThreadMessages.next(Object.assign({}, this.dataStore).commentThreadMessages);

      } else {
        this.dataStore.commentThreadMessages = _commentThreadMessages;
        this._commentThreadMessages.next(Object.assign({}, this.dataStore).commentThreadMessages);
      }

      observer.next(this.dataStore.commentThreadMessages);
      // observer.complete();

    });
    return observable;

  }
  // Create comment
  createComment(commentThreadId: string, comment: CommentThreadMessage) {
    const observable = new Observable((observer) => {
      comment.saved = true;
      comment.isNewMessage = true;
      this.dataStore.commentThreadMessages.push(comment);
      this._commentThreadMessages.next(Object.assign({}, this.dataStore).commentThreadMessages);
      observer.next(this.dataStore.commentThreadMessages);
      observer.complete();

    });
    return observable;

  }
  saveComment(commentThread: CommentThread) {
    const observable = new Observable((observer) => {
      observer.next(commentThread);
      observer.complete();

    });
    return observable;
  }


  updateComment(commentThreadId: string, comment: CommentThreadMessage, forceUpdateDate: boolean = false, markEdited: boolean = true) {
    const observable = new Observable((observer) => {
      this.dataStore.commentThreadMessages.forEach((c, i) => {
        if (c.id === comment.id) {
          if (markEdited) {
            comment.edited = true;
          }
          if (forceUpdateDate) {
            comment.timestamp = new Date();
          }
          this.dataStore.commentThreadMessages[i] = comment;
        }
      });
      this._commentThreadMessages.next(Object.assign({}, this.dataStore).commentThreadMessages);
      observer.next(this.dataStore.commentThreadMessages);
      observer.complete();
    });
    return observable;

  }
  deleteComment(commentThreadId: string, commentId: string) {

    const observable = new Observable((observer) => {
      this.dataStore.commentThreadMessages.forEach((c, i) => {
        if (c.id === commentId) {
          this.dataStore.commentThreadMessages[i].deleted = true;
        }
      });

      this._commentThreadMessages.next(Object.assign({}, this.dataStore).commentThreadMessages);
      observer.next(this.dataStore.commentThreadMessages);
      observer.complete();
    });
    return observable;
  }


  // Comment status
  getCommentThreadStatuses() {
    const observable = new Observable((observer) => {
      observer.next(COMMENT_THREADS_STATUSES);
      observer.complete();
    });
    return observable;

  }
  // Comment status
  getParticipantTypes() {

    const observable = new Observable((observer) => {
      observer.next(PARTICIPANTS_TYPES);
      observer.complete();
    });
    return observable;

  }
  // Get comment types
  getCommentThreadTypes() {
    return of(COMMENT_THREADS_TYPES);
  }
  findCommentThreadMessages(coreId, query, typesFilter, statusesFilter) {
    const observable = new Observable((observer) => {
      const repository = COMMENTS_THREAD_MESSAGE_EXAMPLE;
      let commentThreadMessageFilter = repository.filter((comment: CommentThreadMessage) => {
        let valid = false;
        if (query.length > 0) {
          if (comment.type === 'text') {
            // let query = new RegExp('^' + this.search, "i");
            const regex = new RegExp(query, 'gi');
            if (regex.test(comment.commentText)) {
              valid = true;
            }
          }

        }
        if (typesFilter) {
          if (typesFilter.key !== 'all') {
            if (typesFilter.key === 'file') {
              if (comment.mimeType !== 'image') {
                valid = true;
              } else {
                valid = false;
              }
            } else if (typesFilter.key === 'image') {
              if (comment.type === 'file' && comment.mimeType === 'image') {
                valid = true;
              } else {
                valid = false;
              }
            }
            else if (comment.type === typesFilter.key) {
              valid = true;
            } else {
              valid = false;
            }
          } else {
            valid = true;
          }
        }
        if (statusesFilter) {
          if (statusesFilter.key !== 'all') {
            if (comment.commentThread.status.key === statusesFilter.key) {
              valid = true;
            } else {
              valid = false;
            }
          } else {
            valid = true;
          }
        }
        return valid;
      });
      commentThreadMessageFilter.sort((a, b) => {
        return b.timestamp.getTime() - a.timestamp.getTime();
      });
      observer.next(commentThreadMessageFilter);
      observer.complete();
    });
    return observable;

  }
  // Comments per day
  getCommentPerDay(comments: Array<CommentThreadMessage>) {
    const commentsThread: Array<CommentThreadMessage> = comments;
    const dateMap = commentsThread.reduce((m, v) => {
      const day = moment(v.timestamp).format('YYYY-MM-DD');
      const entry = m[day];
      if (typeof entry === 'undefined') {
        m[day] = [v];
      } else {
        entry.push(v);
      }
      return m;
    }, {});

    const res = Object.keys(dateMap).map(function (d) {
      return {
        day: d,
        comments: dateMap[d].sort((a, b) => {
          return moment(a.timestamp).toDate().getTime() - moment(b.timestamp).toDate().getTime();
        })
      };
    });
    res.sort(function (a, b) { return moment(a.day).toDate().getTime() - moment(b.day).toDate().getTime() })

    return res;
  }

  // Comments per day
  getDayCommens(comments: Array<CommentThreadMessage>) {
    const commentsThread: Array<CommentThreadMessage> = comments;
    const dateMap = commentsThread.reduce((m, v) => {
      const day = moment(v.timestamp).format('YYYY-MM-DD');
      const entry = m[day];
      if (typeof entry === 'undefined') {
        m[day] = day;
      } /* else {
          entry.push(v);
        }*/
      return m;
    }, []);
    const res = Object.keys(dateMap).map(function (d) {
      return {
        day: d,
      };
    });
    res.sort(function (a, b) {
      return moment(a.day).toDate().getTime() - moment(b.day).toDate().getTime();
    });

    return res;
  }
  // Get all users of comments
  getWorkspaceOfComments(comments: Array<CommentThreadMessage>, workspaceId: string) {
    const commentsThread: Array<CommentThreadMessage> = comments;
    const userMap = commentsThread.reduce((m, v) => {

      if (v.workspaceAccess.id !== workspaceId) {
        const workspaceAccess = v.workspaceAccess;
        const entry = m[workspaceAccess.id];
        if (typeof entry === 'undefined') {
          m[workspaceAccess.id] = v.workspaceAccess;
        }
      }
      return m;

    }, {});
    const res = Object.keys(userMap).map(function (u) {
      return {
        user: userMap[u],
      };
    });
    // console.log(res);
    return res;

  }
}
