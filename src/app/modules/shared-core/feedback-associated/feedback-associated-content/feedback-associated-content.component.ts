import { Component, OnInit, Input, HostListener, ViewChild, Output, EventEmitter } from '@angular/core';
import { Feedback } from 'src/app/models/feedback/feedback';
import { Piece } from 'src/app/models/feedback/piece';
import { PaginationInstance } from 'ngx-pagination';
import { FeedbackAssociatedPieceComponent } from '../feedback-associated-piece/feedback-associated-piece.component';
import { CoreWorkflowService } from '../../services/core-workflow.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-feedback-associated-content',
  templateUrl: './feedback-associated-content.component.html',
  styleUrls: ['./feedback-associated-content.component.scss']
})
export class FeedbackAssociatedContentComponent implements OnInit {
  public pieceShow: Piece;
  public leftSidenavCompressed = false;
  public rightSidenavCompressed = true;
  public paginationMaxWidth = '100%';
  public minimize = false;
  // Pagination
  public paginationConfig: PaginationInstance = {
    id: 'custom',
    itemsPerPage: 1,
    currentPage: 1,
    totalItems: 0
  };
  // Inputs
  @Input() feedback: Feedback;
  @Input() pieces: Piece[];
  // Output
  @Output() onMinimize = new EventEmitter();
  // View child
  @ViewChild('pieceShowEl') piceCloseComp: FeedbackAssociatedPieceComponent;
  constructor(
    private _coreWorkflowService: CoreWorkflowService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.paginationConfig.totalItems = this.pieces.length;
    this.resize();
  }

  resize() {
    if (window.innerWidth < 1200) {
      this.leftSidenavCompressed = true;

    } else {
      this.leftSidenavCompressed = false;
    }
  }
  /**
   * On change ration piece
   * @param sizes
   */
  onChangeRatio(sizes) {
    console.log(sizes);
    this.paginationMaxWidth = sizes.width + 'px';
  }
  /**
 * On page change
 * @param page
 */
  onPageChange(page) {
    this.paginationConfig.currentPage = page;
  }
  /**
   * On select piece
   * @param show
   */
  onSelectPiece(show: Piece) {
    const index = this.pieces.indexOf(show);
    this.paginationConfig.currentPage = index + 1;
  }

  onMinimizeHeader() {
    this.minimize = true;
    this.onMinimize.emit(this.minimize);
  }
  restoreMinimize() {
    this.minimize = false;
    this.onMinimize.emit(this.minimize);
    setTimeout(()=>{
      this.piceCloseComp.calculateRatioPiece();
    },200)
  }
  onClose(){
    this._coreWorkflowService.showSidenavFeedback(null);
  }
  
  goToFeedback(){
    if(this.feedback.status.key !== 'approved'){
      this._router.navigate(['/feedback',this.feedback.id])
    }else{
      this._router.navigate(['/feedback/close',this.feedback.id])
    }
  }
  @HostListener('window:resize', ['$event']) onResize(event) {
    this.resize();
    setTimeout(() => {
      if(!this.minimize){
      this.piceCloseComp.calculateRatioPiece();
      }
    });

  }
}
