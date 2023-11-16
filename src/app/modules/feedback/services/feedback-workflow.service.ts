import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Piece } from '../../../models/feedback/piece';
import { CommentThread } from '../../../models/comments/comment-thread';

@Injectable()
export class FeedbackWorkflowService {
  // Zoom
  private _zoom: Subject<number> = new Subject();
  public zoom: Observable<number>;
  // Piece width
  private _pieceWidth: Subject<number> = new Subject();
  public pieceWidth: Observable<number>;
  //  Piece show
  private _pieceShow: Subject<Piece> = new Subject();
  public pieceShow: Observable<Piece>;
  // Video
  private _seekVideo: Subject<number> = new Subject();
  public seekVideo: Observable<number>;
  // Check feedback status
  private _checkFeedabckStatus: Subject<CommentThread> = new Subject();
  public checkFeedabckStatus: Observable<CommentThread>;
  // Versions show
  private _sidenavVersions: Subject<any> = new Subject();
  public sidenavVersions: Observable<any>;

  constructor() {
    // Zoom
    this.zoom = this._zoom.asObservable();
    // Piece width
    this.pieceWidth = this._pieceWidth.asObservable();
    // Piece show
    this.pieceShow = this._pieceShow.asObservable();
    // Vieo
    this.seekVideo = this._seekVideo.asObservable();
    // Feedback status
    this.checkFeedabckStatus = this._checkFeedabckStatus.asObservable();
    // Versions
    this.sidenavVersions = this._sidenavVersions.asObservable();

  }
  /**
   * Set zoom
   * @param zoom
   */
  setZoom(zoom: number) {
    this._zoom.next(zoom);
  }

  /**
 * Set piece calculate width
 * @param pieceCalculateWidth
 */
  setPieceWidth(pieceCalculateWidth: number) {
    this._pieceWidth.next(pieceCalculateWidth);
  }
  /**
   * Show piece
   * @param piece 
   */
  showPiece(piece: Piece) {
    this._pieceShow.next(piece);
  }


  /**
   * Set seek video
   * @param time
   */
  setSeekVideo(time: number) {
    this._seekVideo.next(time);
  }

  // Check feedback status
  checkStatus(commentThread: CommentThread) {
    console.log('check status');
    this._checkFeedabckStatus.next(commentThread);
  }
  // Show versiones
  showVersions(piece: Piece, show: boolean) {
    this._sidenavVersions.next({ piece: piece, show: show });
  }


}
