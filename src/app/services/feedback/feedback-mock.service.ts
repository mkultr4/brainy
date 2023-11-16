import { Injectable, OnDestroy } from '@angular/core';
import { BaseService } from '../base.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Piece } from '../../models/feedback/piece';
import * as uuid from 'uuid/v4';
import { FileInformation } from '../../models/files/file-information';
import * as PDFJS from 'pdfjs-dist/build/pdf';
import * as PDFDocumentProxy from 'pdfjs-dist/build/pdf';
import { Site } from '../../models/seo/site';
import { PIECES_VERSIONES } from '../../data/mock-feedback';
import { CommentThread } from '../../models/comments/comment-thread';
import { WORKSPACE_ACCESSES } from '../../data/mock-workspace-accesses';
import { COMMENT_THREADS_STATUSES } from '../../data/mock-comments';
import { CommentThreadMessage } from '../../models/comments/comment-thread-message';
import { PARTICIPANTS_TYPES } from '../../data/mock-participants';
import { CORES, CORE_STATUSES } from '../../data/mock-cores';
import { Invitation } from '../../models/invitations/invitation';
import { Core } from '../../models/cores/core';

@Injectable()
export class FeedbackMockService extends BaseService {
  public piecesRepository;
  // Piece
  public pieces: Observable<Piece[]>;
  private _pieces = new BehaviorSubject<Piece[]>([]);
  // Piece versions
  public versions: Observable<Piece[]>;
  private _versions = new BehaviorSubject<Piece[]>([]);
  private dataStore = {
    pieces: [],
    versions: []
  };

  constructor() {
    super();
    this.pieces = this._pieces.asObservable();
    this.versions = this._versions.asObservable();
    this.dataStore.pieces = [];
    this.dataStore.versions = [];
    // Settings to pdf
    PDFJS.GlobalWorkerOptions.workerSrc = '/node_modules/pdfjs-dist/build/pdf.worker.min.js';
    this.piecesRepository = Object.assign(new Array<Piece>(), PIECES_VERSIONES);

  }

  proccessRequest(event: string, data: any): Observable<any> {
    return new Observable();
  }
  /**
   * Load pieces by id
   * @param id
   * @param empty
   */
  loadPiecesById(id: string, empty = false, generateComments = false) {

    this.dataStore.pieces = Object.assign([], []);

    const observable = new Observable((observer) => {
      // Init data stores
      this.dataStore.pieces = [];
      this.dataStore.versions = [];
      const pieces = this.piecesRepository.filter(p => p.latest === true).map((p) => {
        p.commentThreads = []
        return p;
      });
      this.dataStore.pieces = pieces;
      // Versions
      const versions = this.piecesRepository.filter(p => p.latest === false);
      this.dataStore.versions = Object.assign([], versions);
      if (empty) {
        this.dataStore.pieces = Object.assign([], []);
      }
      if (this.dataStore.pieces.length === 0) {
        const emptyPiece = new Piece();
        emptyPiece.id = uuid();
        emptyPiece.latest = true;
        this.dataStore.pieces.push(emptyPiece);
      }
      if (generateComments) {
        this.generateComments();
      }

      this._pieces.next(Object.assign([], this.dataStore).pieces);
      observer.next(this.dataStore.pieces);

    });
    return observable;

  }

  /**
 * Generate comments
 */
  private generateComments() {
    this.eliminateComments();
    if (this.dataStore.pieces.length > 0) {
      this.generateDefualtCommentsPiece(this.dataStore.pieces[0]);
    }
  }

  private eliminateComments() {
    this.dataStore.pieces.forEach((p, i) => {
      this.dataStore.pieces[i].commentThreads = new Array<CommentThread>();
    });
  }
  private generateDefualtCommentsPiece(piece: Piece) {
    // Generate random comments
    let left = 50;
    let top = 30;
    for (let index = 0; index < 3; index++) {
      const commentThread = new CommentThread();
      commentThread.id = uuid();
      commentThread.title = 'Test';
      commentThread.event = 'click';
      commentThread.type = 'pin';
      commentThread.workspaceAccess = WORKSPACE_ACCESSES[1];
      commentThread.number = piece.commentThreads.length + 1;
      commentThread.originalContainerHeight = piece.setting.naturalHeight;
      commentThread.originalContainerWidth = piece.setting.naturalWidth;
      commentThread.levelId = 'PIECE';
      commentThread.referenceId = piece.id;
      commentThread.left = top;
      commentThread.top = left;
      commentThread.originalLeft = left;
      commentThread.originalTop = top;
      commentThread.saved = true;
      commentThread.unreadMessages = true;
      commentThread.status = COMMENT_THREADS_STATUSES[index + 1];
      const comment = Object.assign(new CommentThreadMessage(), <CommentThreadMessage>{
        id: uuid(),
        type: 'text',
        commentText: 'Hola mundo',
        timestamp: new Date(),
        saved: true,
        workspaceAccess: WORKSPACE_ACCESSES[1],
        commentThread: commentThread
      });
      commentThread.comments.push(comment);
      if (commentThread.status.key === 'resolved') {
        commentThread.resolvedAt = new Date(2018, 1, 1, 19, 20, 10, 0);
        commentThread.resolvedBy = WORKSPACE_ACCESSES[1];
      }
      commentThread.participantType = PARTICIPANTS_TYPES[index];

      piece.commentThreads.push(commentThread);

      left += 50;
      top += 30;

    }


  }
  /**
   * Get feedback piece by id
   * @param id
   */
  getFeedbackPieceById(pieceId: string) {
    const observable = Observable.create((observer) => {
      let piece;
      this.dataStore.pieces.forEach(p => {
        if (p.id === pieceId) {
          piece = p;
        }
      });
      if (!piece) {
        // console.log('find in versions', this.dataStore.pieceVersions);
        this.dataStore.versions.forEach(p => {
          if (p.id === pieceId) {
            piece = p;
          }
        });
      }
      console.log(piece);
      observer.next(piece);
    });
    return observable;
  }
  /**
   * Create a feedback piece
   * @param feedbackPiece
   */
  createFeedbackPiece(piece: Piece) {
    this.dataStore.pieces.push(piece);
    this.orderFeedbackPiece();
    this._pieces.next(Object.assign({}, this.dataStore).pieces);
  }

  /**
  * Delete a feedback piece
  * @param pieceId
  */
  deleteFeedbackPiece(pieceId: string) {

    const observable = new Observable((observer) => {
      this.dataStore.pieces.forEach((p, i) => {
        if (p.id === pieceId) { this.dataStore.pieces.splice(i, 1); }
      });
      if (this.dataStore.pieces.length === 0) {

        const emptyPiece = new Piece();
        emptyPiece.latest = true;
        emptyPiece.id = uuid();
        this.dataStore.pieces.push(emptyPiece);
      }
      this.orderFeedbackPiece();
      this._pieces.next(Object.assign({}, this.dataStore).pieces);
      observer.next(this.dataStore.pieces);
    });
    return observable;
  }
  /**
   * update store pieces
   * @param pieces
   */
  updateStorePieces(pieces: Array<Piece>) {

    const observable = Observable.create(observer => {
      if (pieces.length > 0) {
        pieces.forEach(n => n.empty = false);
        // If has more one file
        const newPieces = pieces.filter(p => !p.id);
        // Update because is create a empty item in memory
        const updatePieces = pieces.filter(p => p.id);
        let indexOfUpdate = -1;
        // Update Piece
        this.dataStore.pieces.forEach((p, i) => {
          const updatePiece = updatePieces[0];
          if (p.id === updatePiece.id) {
            indexOfUpdate = i;
            this.dataStore.pieces[i] = Object.assign(new Piece, updatePiece);
          }

        });
        // Create Piece
        if (newPieces.length > 0) {
          newPieces.forEach(p => {
            this.dataStore.pieces.splice(indexOfUpdate + 1, 0, p);
            indexOfUpdate = this.dataStore.pieces.indexOf(p);
          });

        }
        this.orderFeedbackPiece();
        this.dataStore.pieces = Object.assign(new Array<Piece>(), this.dataStore.pieces);
        this._pieces.next(Object.assign({}, this.dataStore).pieces);
        observer.next(this.dataStore.pieces);
      }

    });
    return observable;


  }
  /**
   * update store pieces
   * @param pieces
   */
  updateStoreVersions(versions: Array<Piece>) {

    const observable = Observable.create(observer => {
      if (versions.length > 0) {
        this.dataStore.versions = this.dataStore.versions.concat(versions);
        this._versions.next(Object.assign({}, this.dataStore).versions);
        observer.next(this.dataStore.pieces);
      }

    });
    return observable;


  }
  /**
   * Mock function create a version
   * @param piece 
   */
  createFeedbackPieceVersion(piece: Piece) {

    const versionNumber = this.dataStore.versions.filter(p => p.parentId === piece.parentId).length + 1;
    piece.versionNumber = versionNumber;
    piece.latest = false;

    return piece;

  }
  updatePieceStoreCommentThread(piece: Piece) {

    this.dataStore.pieces.forEach((p, i) => {
      if (p.id === piece.id) {
        this.dataStore.pieces[i].commentThreads =
          Object.assign([], piece.commentThreads);
      }
    });
    this.dataStore.versions.forEach((p, i) => {
      if (p.id === piece.id) {
        this.dataStore.versions[i].commentThreads =
          Object.assign([], piece.commentThreads);
      }
    });
    this._pieces.next(Object.assign([], this.dataStore).pieces);
    this._versions.next(Object.assign([], this.dataStore).versions);
  }


  /**
   * Update order feedback pieces
   * @param pieces
   */
  updateOrderFeedbackPieces(pieces: Array<Piece>) {
    const observable = Observable.create((observer) => {
      observer.next(true);
    });
    return observable;
  }

  /**
   * Order pieces
   */
  private orderFeedbackPiece() {
    // Order
    let order = 1;
    this.dataStore.pieces.forEach(piece => {
      if (!piece.id) {
        piece.id = uuid();
      }
      piece.order = order;
      order++;
    });
  }
  /**
 * Upload Pieces images
 * @param firstFeedbackPiece
 * @param files
 */
  uploadImages(firstPiece: Piece, files: File[]) {

    const observable = Observable.create(async (observer) => {
      const pieces = [];
      let count = 1;
      for (const file of files) {
        const piece = <Piece>await this.processFeedbackImage(file);
        if (count === 1) {
          piece.id = firstPiece.id;
        }
        piece.latest = true;
        pieces.push(piece);
        count++;
      }
      setTimeout(async () => {
        this.updateStorePieces(pieces).subscribe(piecesUpload => {
          observer.next(piecesUpload);
        });


      }, 1500);
    });

    return observable;

  }

  /**
   * Process feedback image
   * @param file
   */
  async processFeedbackImage(file: File) {
    const fileInfo: FileInformation = new FileInformation();
    fileInfo.id = uuid();
    fileInfo.file = file;
    const extension = file.name.split('.').pop().toLowerCase();
    // Create a feedback piece
    const piece: Piece = new Piece();
    piece.created = new Date();
    piece.fileInformation = fileInfo;
    return new Promise((resolve) => {
      const url = URL.createObjectURL(piece.fileInformation.file);
      const img = document.createElement('img');
      img.src = url;
      img.onload = (event) => {
        // console.log(event);
        const w = img.width;
        const h = img.height;
        piece.name = 'pieza_1.' + extension;
        piece.type = 'image';
        piece.url = url;
        piece.setting = { naturalWidth: w, naturalHeight: h }
        img.remove();
        resolve(piece);
      };
    });
  }
  // #region Upload Document
  uploadDocument(firstPiece: Piece, file: File) {
    const observable = Observable.create(async (observer) => {
      const pieces = [];
      for (let pageNum = 1; pageNum <= 3; pageNum++) {
        const piece = new Piece();
        piece.url = 'assets/img/pdf_page_example.jpg';
        piece.type = 'image';
        piece.name = 'Pagina ' + pageNum;
        piece.setting = { naturalWidth: 892, naturalHeight: 1263 };
        piece.latest = true;
        if (pageNum === 1) {
          piece.id = firstPiece.id;
        }
        pieces.push(piece);
      }
      setTimeout(() => {
        this.updateStorePieces(pieces).subscribe(piecesUpload => {
          observer.next(piecesUpload);
        });
      }, 1500);
    });
    return observable;
  }
  // #endregion

  // #region Upload PDF
  /**
  * Upload pdf
  * @param firstFeedbackPiece
  * @param file
  */
  uploadDocumentPdf(firstPiece: Piece, file: File) {
    const observable = Observable.create(async (observer) => {
      const pieces = [];
      const pdf = <PDFDocumentProxy>await this.processPdf(file);
      console.log(pdf);
      if (!pdf) {
        observer.error('error al convertir pdf');
      } else {
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const piece = await this.proccessPdfPage(pdf, pageNum);
          piece.latest = true;
          if (pageNum === 1) {
            piece.id = firstPiece.id;
          }
          pieces.push(piece);
        }
      }
      setTimeout(() => {
        this.updateStorePieces(pieces).subscribe(piecesUpload => {
          observer.next(piecesUpload);
        });
      }, 1500);
    });
    return observable;
  }
  /**
   * Process pdf
   * @param file
   */
  private async processPdf(file: File) {
    return new Promise((resolve) => {
      PDFJS.isWorkerDisabled = true;
      const url = URL.createObjectURL(file);
      PDFJS.getDocument(url).then((pdf) => {
        resolve(pdf);
      }, (error) => {
        resolve(null);
      });
    });
  }
  /**
   * Process pdf page
   * @param pdf
   * @param pageNum
   */
  private async proccessPdfPage(pdf, pageNum): Promise<any> {
    return new Promise((resolve) => {
      pdf.getPage(pageNum).then((page) => {

        const scale = 1.5;
        const viewport = page.getViewport(scale);
        //
        // Prepare canvas using PDF page dimensions
        //
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        //
        // Render PDF page into canvas context
        //
        const task = page.render({ canvasContext: context, viewport: viewport });
        task.promise.then(() => {
          const dataImage = canvas.toDataURL('image/jpeg');
          const piece = new Piece();
          piece.url = dataImage;
          piece.type = 'image';
          piece.name = 'Pagina ' + pageNum;
          piece.setting = { naturalWidth: viewport.width, naturalHeight: viewport.height };
          canvas.remove();
          resolve(piece);
        });
      });
    });
  }
  // #endregion

  // #region Upload sites
  /**
   * Upload Pieces sites
   * @param firstFeedbackPiece
   * @param sites
   */
  uploadSites(firstPiece: Piece, sites: Site[]) {
    const observable = Observable.create((observer) => {
      const pieces = [];
      let count = 1;
      sites.forEach(site => {
        const piece = this.processSites(site);
        piece.latest = true;
        if (count === 1) {
          piece.id = firstPiece.id;
        }
        pieces.push(piece);
        count++;
      });
      setTimeout(() => {
        this.updateStorePieces(pieces).subscribe(results => {
          observer.next(results);
        });
      }, 1500);

    });
    return observable;

  }

  private processSites(site: Site): Piece {
    const feedbackPiece = new Piece();
    feedbackPiece.url = 'assets/img/example_screen.jpg';
    feedbackPiece.type = 'image';
    feedbackPiece.name = site.url;
    feedbackPiece.setting = { naturalWidth: 1280, naturalHeight: 4436 };
    return feedbackPiece;
  }
  // #endregion

  // #region Upload video
  /**
   * Upload video
   * @param firstFeedbackPiece
   * @param file
   */
  uploadVideo(firstPiece: Piece, file: File) {

    const observable = Observable.create(async (observer) => {
      const feedbackPiece = <Piece>await this.processVideo(file);
      feedbackPiece.id = firstPiece.id;
      feedbackPiece.latest = true;
      setTimeout(() => {
        this.updateStorePieces([feedbackPiece]).subscribe(results => {
          observer.next(results);
        });
      }, 1500);
    });
    return observable;
  }
  private async processVideo(file: File) {
    return new Promise((resolve) => {
      // get url
      const url = URL.createObjectURL(file);
      const fileType = file.type;
      // create video html
      const video = document.createElement('video');
      // set src
      video.src = url;
      // Piece
      const feedbackPiece = new Piece();
      video.load();
      // on load
      video.onloadeddata = (event) => {
        const w = video.videoWidth;
        const h = video.videoHeight;
        feedbackPiece.name = file.name;
        feedbackPiece.type = 'video';
        feedbackPiece.fileType = fileType;
        feedbackPiece.url = url;
        feedbackPiece.empty = false;
        feedbackPiece.setting = { naturalWidth: w, naturalHeight: h, duration: video.duration };
        // Poster
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, w, h);
        // Set frame
        feedbackPiece.poster = canvas.toDataURL('image/jpeg');
        canvas.remove();
        video.remove();
        resolve(feedbackPiece);
      };
    });
  }

  // #endregion

  // #region Replace piece

  /**
 * Upload first when replace 
 * @param feedbackPiece
 * @param file
 */
  uploadReplacePiece(piece: Piece, file: File, forceError = false): Promise<any> {

    const observable = Observable.create(async (observer) => {
      setTimeout(() => {
        observer.next({ valid: !forceError, piece: Piece });
      }, 3000);
    });

    return observable;

  }
  /**
   * Change piece image
   * @param piece
   * @param file
   * @param mantainComments
   */
  changePieceImage(piece: Piece, file: File, mantainComments: boolean = false) {

    const observable = Observable.create(async (observer) => {
      let generatedVersion = Object.assign(new Piece(), piece);
      generatedVersion.id = uuid();
      generatedVersion.parentId = piece.id;
      generatedVersion = this.createFeedbackPieceVersion(generatedVersion);

      const pieceNew = <Piece>await this.processFeedbackImage(file);
      pieceNew.id = piece.id;
      pieceNew.latest = true;
      pieceNew.versionNumber = generatedVersion.versionNumber + 1;
      pieceNew.empty = false;
      if (mantainComments) {
        piece.commentThreads = pieceNew.commentThreads;
      }
      pieceNew.edited = true;

      setTimeout(() => {
        this.updateStorePieces([pieceNew]).subscribe();
        this.updateStoreVersions([generatedVersion]).subscribe();
        observer.next(pieceNew);
      }, 3000);
    });
    return observable;
  }
  /**
   * Change piece video
   * @param piece 
   * @param file 
   * @param mantainComments 
   */
  changePieceVideo(piece: Piece, file: File, mantainComments: boolean = false) {

    const observable = Observable.create(async (observer) => {
      // Version
      let generatedVersion = Object.assign(new Piece(), piece);
      generatedVersion.id = uuid();
      generatedVersion.parentId = piece.id;
      generatedVersion = this.createFeedbackPieceVersion(generatedVersion);
      // Current
      const pieceNew = <Piece>await this.processVideo(file);
      pieceNew.id = piece.id;
      pieceNew.empty = false;
      pieceNew.latest = true;
      pieceNew.versionNumber = generatedVersion.versionNumber + 1;
      if (mantainComments) {
        pieceNew.commentThreads = piece.commentThreads;
      }
      pieceNew.edited = true;
      setTimeout(() => {
        this.updateStorePieces([piece]).subscribe();
        this.updateStoreVersions([generatedVersion]).subscribe();
        observer.next(pieceNew);
      }, 3000);
    });
    return observable;

  }
  // #endregion

  // #region Versions

  /**
   * Get versions of piece
   * @param id
   */
  findVersions(id: string) {

    const observable = Observable.create(async (observer) => {

      const versions = Object.assign([], this.dataStore.versions.filter(v => v.parentId === id));
      const pieces = this.dataStore.pieces.filter(p => p.id === id);

      if (pieces.length > 0 && !pieces[0].empty) {
        const piece = Object.assign({}, pieces[0]);
        piece.latest = true;
        piece.commentThreads = [];
        piece.versionNumber = versions.length + 1;
        versions.unshift(piece);
        observer.next(versions);
      } else {
        observer.next([]);
      }
    });

    return observable;

  }
  /**
   * Find all comment thread with not behavior subject
   * @param pieceId
   */
  findAllCommentThread(pieceId: string) {

    const observable = Observable.create(async (observer) => {
      const pieces = this.dataStore.pieces.filter(p => p.id === pieceId);
      const piecesVersion = this.dataStore.versions.filter(p => p.id === pieceId);
      if (pieces.length > 0) {
        const commentThreads = Object.assign(new Array<CommentThread>(), pieces[0].commentThreads);
        observer.next(commentThreads);
      } else if (piecesVersion.length > 0) {
        const commentThreads = Object.assign(new Array<CommentThread>(), piecesVersion[0].commentThreads);
        observer.next(commentThreads);
      } else {
        observer.next([]);
      }
    });

    return observable;

  }

  // #endregion

  // #region Feedback Close
  /**
   * Get feedback close view
   * @param id
   */
  getFeedCloseById(id: string) {
    // Enviroment design
    const observable = Observable.create(async (observer) => {
      const feedback = Object.assign(new Core(), CORES.filter(c => c.type.key === 'feedback')[0]);
      feedback.owner = WORKSPACE_ACCESSES[0].user;
      feedback.ownerRol = WORKSPACE_ACCESSES[0].rol;
      feedback.status = CORE_STATUSES.filter(s => s.key === 'approved')[0];
      feedback.approvedDate = new Date();
      feedback.approvedBy = <Invitation>{ workspaceAccess: WORKSPACE_ACCESSES[2] };
      feedback.approvedBy.groupReference = 'approver';
      observer.next(feedback);
    });
    return observable;
  }
  /**
   * Find pieces
   * @param id
   */
  findPiecesFeedbackClose(id: any) {
    const observable = Observable.create((observer) => {
      observer.next(this.dataStore.pieces = Object.assign([], PIECES_VERSIONES.filter(p => p.latest === true)));
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
      if (this.dataStore.pieces.length > 0) {
        this.dataStore.pieces.forEach((piece: Piece) => {
          commentPendings = commentPendings.concat(piece.commentThreads.filter(c => c.status.key !== 'resolved'));
        });
      }
      observer.next(commentPendings);
    });
    return observable;

  }
  /**
   * Check if feedback is ready to approve
   */
  checkIsReadyToApprove() {
    const observable = Observable.create((observer) => {
      let readyToApprove = false;
      const countPieces = this.dataStore.pieces.filter(p => !p.empty).length;
      if (countPieces > 0) {
        let countComments = 0;
        readyToApprove = true;
        this.dataStore.pieces.forEach((piece: Piece) => {
          const commentsUnresolved = piece.commentThreads.filter(c => c.status.key !== 'resolved');
          if (commentsUnresolved.length > 0) {
            readyToApprove = false;
          }
          countComments += piece.commentThreads.length;
        });
        // If not have comments
        if (countComments === 0) {
          readyToApprove = false;
        }
        // return readyToApprove;
      }
      observer.next(readyToApprove);
    });
    return observable;

  }

  pieceSelected() {
    const observable = Observable.create(async (observer) => {


    });
    return observable;
  }

}
