export class Tour {
  message: string;
  target: string;
  pulseTarget: string;
  // edge: string = 'right';
  align = 'center';
  callbackStart: Function;
  callbackEnd: Function;
  // Step inner
  stepsInner: Array<string> = new Array<string>();
  autoScroll = false;
  gutterAlignament:number;
  popupArrowTop:number;
  constructor();
  constructor(message: string, target: string, pulseTarget?: string,
    align?: string,
    stepsInner?: Array<string>,
    callbackStart?: Function,
    callbackEnd?: Function,
    autoScroll?: boolean, );
  constructor(
    message?: string,
    target?: string,
    pulseTarget?: string,
    align?: string,
    stepsInner?: Array<string>,
    callbackStart?: Function,
    callbackEnd?: Function,
    autoScroll?: boolean,
  ) {
    this.message = message;
    this.target = target;
    this.pulseTarget = pulseTarget;
    if (stepsInner) {
      this.stepsInner = stepsInner;
    }

    if (callbackStart) {
      this.callbackStart = callbackStart;
    }
    if (callbackEnd) {
      this.callbackEnd = callbackEnd;
    }
    if (autoScroll) {
      this.autoScroll = autoScroll;
    }

  }


  setStepsInner(stepsInner: Array<string>) {
    this.stepsInner = stepsInner;
  }
  setAutoScroll(autoScroll: boolean) {
    this.autoScroll = autoScroll;

  }
}
