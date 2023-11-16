import {
  Component, SimpleChanges, AfterViewInit,
  Input, OnChanges, Output, EventEmitter, OnDestroy, ViewChild, ElementRef
} from '@angular/core';




declare var $: any;

@Component({
  selector: 'app-audio-player,[app-audio-player]',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss'],
})
export class AudioPlayerComponent implements AfterViewInit, OnChanges, OnDestroy {
  // Audio Object

  public audioAction = 'play';
  duration = 0;
  @Input() durationRecord = 0;
  public currentTime = 0;
  public canPlay = false;
  public audioPlayerReady = false;
  public isSeeking = false;
  // Audio Source
  @Input() audioSrc: string;
  @Input() audioRandom: string;
  @Input() notVisibleEmpty = false;
  // Events
  @Output() playerOnPlay = new EventEmitter();
  @Output() playerOnPause = new EventEmitter();
  @Output() playerOnStop = new EventEmitter();
  // Elements
  @ViewChild('slider') slider: ElementRef;
  @ViewChild('pin') pin: ElementRef;
  @ViewChild('audioSource') audioSource: ElementRef;
  // Slide element
  $slider;
  // Audio Object
  public audio: HTMLAudioElement = new Audio();
  constructor() { }

  ngAfterViewInit() {
    this.$slider = $(this.slider.nativeElement);
    this.initAudioPlayer();
  }
  ngOnChanges(change: SimpleChanges) {

    if (change.audioSrc) {
      if (change.audioSrc.currentValue !== change.audioSrc.previousValue) {

        if (this.audioSrc) {

          // this.audio = new Audio();

          this.duration = 0;
          this.currentTime = 0;

          if (typeof this.audioSrc === 'object') {
            // Create the url with a BLOB
            console.log('object');
            const url = URL.createObjectURL(this.audioSrc);

            // this.audioElement.nativeElement = new Audio();
            this.audioSource.nativeElement.src = url;
            // this.audio = new Audio(url);
            //  this.audioElement.nativeElement.load();
            this.audioSource.nativeElement.load();

          } else if (typeof this.audioSrc === 'string') {
            console.log('string');
            // this.audio = new Audio();
            // this.audioElement.nativeElement = new Audio();
            const source = this.audioSrc;
            // this.audio = new Audio(source);
            this.audioSource.nativeElement.src = source;

            this.audioSource.nativeElement.load();

            // this.audioElement.nativeElement.load();



          }


        }
      }
    }
  }
  setDuration() {

    if (this.audioSource.nativeElement.duration !== Infinity) {
      this.duration = Number(this.audioSource.nativeElement.duration.toFixed(1));
    } else {
      this.duration = 0;
    }
  }
  onloadeddata() {

    this.setDuration();
  }
  onloadedmetadata() {

    this.setDuration();
  }
  ondurationchange() {
    this.setDuration();
  }
  oncanplay() {
    setTimeout(() => {
      this.setDuration();
      if (this.duration === 0) {
        this.duration = this.durationRecord;
      }

      this.canPlay = true;

    }, 300);

  }
  ontimeupdate() {
    this.currentTime = Number(this.audioSource.nativeElement.currentTime.toFixed(1)) / 1;
  }
  onended() {
    this.audioAction = 'play';
    this.currentTime = 0;
    this.playerOnStop.emit();
  }
  initAudioPlayer() {

    /*this.audioSource.nativeElement.addEventListener('loadeddata', () => {
      this.setDuration();
    })*/

    /*this.audioSource.nativeElement.addEventListener('loadedmetadata', () => {
      this.setDuration();
    })*/
    /*this.audioSource.nativeElement.addEventListener('durationchange', () => {
      this.setDuration();
    })
    this.audioSource.nativeElement.addEventListener('canplay', () => {
      this.setDuration();
      this.canPlay = true;
    })
    this.audioSource.nativeElement.addEventListener("timeupdate", () => {
      this.currentTime = Number(this.audioSource.nativeElement.currentTime.toFixed(1)) / 1;
    })

    this.audioSource.nativeElement.addEventListener("ended", () => {
      this.audioAction = "play";
      this.currentTime = 0;

    })*/
  }

  onMouseDown($event) {
    const target = $(event.target);
    if (target[0] === this.pin.nativeElement) {
      this.isSeeking = true;
      this.seek($event);
    } else {
      this.isSeeking = false;
    }
  }

  onMouseMove($event) {
    if (this.isSeeking) {
      this.seek($event);
    }
  }

  onMouseUp($event) {
    this.isSeeking = false;
  }

  // Get Time
  getCoefficient($event) {
    const sliderEl = this.slider.nativeElement;
    const rect = sliderEl.getBoundingClientRect();
    let K = 0;
    if (sliderEl.dataset.direction === 'horizontal') {

      const offsetX = $event.clientX - this.$slider.offset().left;
      const width = sliderEl.clientWidth;
      K = offsetX / width;
    } else if (sliderEl.dataset.direction === 'vertical') {

      const height = sliderEl.clientHeight;
      const offsetY = $event.clientY - rect.top;
      K = 1 - offsetY / height;
    }
    return K;
  }
  // Go to..
  seek($event) {
    this.audioSource.nativeElement.currentTime = this.audioSource.nativeElement.duration * this.getCoefficient($event);
  }

  // Trigger action
  trigger($event) {
    $event.preventDefault();
    $event.stopPropagation();
    if (this.audioAction === 'pause') {
      this.pause();
    } else if (this.audioAction === 'play') {
      this.play();
    }
  }
  // Play
  play() {
    this.audioSource.nativeElement.play();
    this.audioAction = 'pause';
    this.playerOnPlay.emit();
  }
  // Pause
  pause() {
    this.audioSource.nativeElement.pause();
    this.audioAction = 'play';
    this.playerOnPause.emit();

  }
  // Change time
  changetime() {
    this.audioSource.nativeElement.currentTime = this.currentTime;
  }
  resetAudio() {
    /*
        this.audioSource.nativeElement.removeEventListener("loadeddata", () => { });
        this.audioSource.nativeElement.addEventListener('loadedmetadata', () => { });
        this.audioSource.nativeElement.addEventListener('durationchange', () => { });
        this.audioSource.nativeElement.removeEventListener("canplay", () => { });
        this.audioSource.nativeElement.removeEventListener("timeupdate", () => { });
        this.audioSource.nativeElement.removeEventListener("ended", () => { });*/

  }
  ngOnDestroy() {
    console.log('destroy audio');
    this.resetAudio();
  }

}
