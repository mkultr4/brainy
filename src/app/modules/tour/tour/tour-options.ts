export interface TourOptions {
  // = "Siguiente"
  nextMessage: string;
  // "Listo"
  finishMessage: string;
  // = false
  autoStart: boolean;
  // gutter alignament
  gutterAlignament?: number;
  // popup clas
  popupClass?: string;
  // btn clas
  popupBtnClass?: string;
  // with arrow
  popupArrow?: boolean;
  // arrow top
  popupArrowTop?: number;
}
