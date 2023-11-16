import { Component, OnInit, Output, Input,EventEmitter} from '@angular/core';
import { Piece } from 'src/app/models/feedback/piece';

@Component({
  selector: 'app-feedback-associated-piece',
  templateUrl: './feedback-associated-piece.component.html',
  styleUrls: ['./feedback-associated-piece.component.scss']
})
export class FeedbackAssociatedPieceComponent implements OnInit {
  public _piece: Piece;
  public rightSidenavCompressed = false;
  public leftSidenavCompressed = false;
  public overflowHidden = false;
  // Sizes
  public containerWidth = 0;
  public containerHeight = 0;
  public calculatedWidth = 0;
  public calculatedHeight = 0;
  @Input() set piece(piece: Piece) {
    this._piece = piece;
    this.calculateRatioPiece();
  }
  @Input() set compress(compress) {
    this.leftSidenavCompressed = compress.leftSidenavCompressed;
    this.rightSidenavCompressed = compress.rightSidenavCompressed;
    this.calculateRatioPiece();
  }

  // Outpus
  @Output() onChangeRatio = new EventEmitter();

  constructor() { }
  ngOnInit() {
  }

  /**
   * How display piece
   */
  calculateRatioPiece() {
    this.overflowHidden = true;
    let rightSidenav = 80;
    let leftSidenav = 240;
    
    if (this.leftSidenavCompressed) {
      leftSidenav = 48;
    }

    this.containerWidth = $('#slide-out-feedback-associated').width() - leftSidenav - rightSidenav;  
    this.containerHeight = window.innerHeight - 140 - 110;
    const containerWidth = this.containerWidth - 40;
    const containerHeight = this.containerHeight - 40;

    const containerWidth30 = containerWidth * 0.3;
    const containerHeight30 = containerWidth * 0.3;
    // Ration natural
    const widthRatio = this._piece.setting.naturalWidth / containerWidth;
    const heightRatio = this._piece.setting.naturalHeight / containerHeight;
    let bestRatio = widthRatio;
    if (widthRatio < heightRatio) {
      bestRatio = heightRatio;
    }

    const widthRatioThin = this._piece.setting.naturalWidth / containerWidth30;
    const heightRatioThin = this._piece.setting.naturalHeight / containerHeight30;
    let bestRatioThin = widthRatio;
    if (widthRatioThin >= heightRatioThin) {
      bestRatioThin = heightRatioThin;
    }

    const calculatedWidthNatural = this._piece.setting.naturalWidth / bestRatio;
    const calculatedHeightNatural = this._piece.setting.naturalHeight / bestRatio;

    const calculatedWidthThin = this._piece.setting.naturalWidth / bestRatioThin;
    const calculatedHeightThin = this._piece.setting.naturalHeight / bestRatioThin;


    if (this._piece.setting.naturalWidth < containerWidth30) {
      this.calculatedWidth = calculatedWidthThin;
      this.calculatedHeight = calculatedHeightThin;
    } else {
      this.calculatedWidth = calculatedWidthNatural;
      this.calculatedHeight = calculatedHeightNatural;
    }
    this.onChangeRatio.emit({ width: this.calculatedWidth, height: this.calculatedHeight });
    setTimeout(()=>{
      this.overflowHidden = false;
    },200);
  }

}
