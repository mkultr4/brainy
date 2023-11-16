import { Component, OnInit, ViewChild, Input, ElementRef, Output, EventEmitter, OnDestroy, AfterViewInit } from '@angular/core';
import * as RecordRTC from 'recordrtc/RecordRTC';
import { AudioPlayerComponent } from '../../../shared/audio-player/audio-player.component';
import { CommentThreadMessage } from '../../../../models/comments/comment-thread-message';
import * as WaveSurfer from 'wavesurfer.js';
import Microphone from 'wavesurfer.js/dist/plugin/wavesurfer.microphone.min.js';
/**
 * Component use RecordRTC and wavesurfer, to record audio
 */
@Component({
  selector: 'app-comment-input-record,[app-comment-input-record]',
  templateUrl: './comment-input-record.component.html',
  styleUrls: ['./comment-input-record.component.scss']
})
export class CommentInputRecordComponent implements OnInit, OnDestroy, AfterViewInit {
  public isEdge = navigator.userAgent.indexOf('Edge') !== -1 && (!!navigator.msSaveOrOpenBlob || !!navigator.msSaveBlob);
  public isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  public recordAction = false;
  public audioSrc = undefined;
  public audioDuration;
  public timeElapsedInterval;
  public timeElapsed = 0;
  public isRecording = false;
  public playerAction = 'pause';
  public waveSurfer: any;
  // private
  private stream: MediaStream;
  private recordRTC: any;
  public recordSrc = '';
  // Inputs
  @Input() maxDuration = 21000;
  // View childs
  @ViewChild('recordAudio') audio: ElementRef;
  @ViewChild(AudioPlayerComponent) audioPlayer: AudioPlayerComponent;
  // Outputs
  @Output() recordOnClose = new EventEmitter();
  @Output() recordOnStart = new EventEmitter();
  @Output() recordOnEnd = new EventEmitter();
  @Output() recordOnAccept = new EventEmitter();
  @Output() recordOnCancel = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  // After view init
  ngAfterViewInit() {
    setTimeout(() => {
      // Init wave surfer mic
      this.waveSurfer = WaveSurfer.create({
        container: '#waveform-record',
        waveColor: '#4f5c69',
        interact: false,
        cursorWidth: 0,
        height: 56,
        hideScrollbar: true,
        plugins: [
          Microphone.create()
        ]
      });
    });
  }
  // Replace audio
  replaceAudio(src?) {
    const newAudio = document.createElement('audio');
    newAudio.controls = true;
    if (src) {
      newAudio.src = src;
    }
    const parentNode = this.audio.nativeElement.parentNode;
    parentNode.innerHTML = '';
    parentNode.appendChild(newAudio);
    this.audio.nativeElement = newAudio;


  }
  // Dispatch action
  dispatchAction() {
    if (this.isRecording) {
      this.stopRecord();
    } else {
      this.record();
    }
  }
  // Record start
  record() {
    // Player
    this.audioSrc = false;
    // Change Action
    this.playerAction = 'pause';
    if (typeof navigator.mediaDevices === 'undefined' ||
      !navigator.mediaDevices.getUserMedia) {
      alert('This browser does not supports WebRTC getUserMedia API.');
      if (!!navigator.getUserMedia) {
        alert('This browser seems supporting deprecated getUserMedia API.');
      }
    }

    navigator.mediaDevices.getUserMedia({ audio: true }).then(
      stream => {

        this.recordCallback(stream);

      }, e => console.log(e)
    )

    this.replaceAudio();

  }
  // Record callback
  recordCallback(stream) {
    // Start michrophone wave
    this.waveSurfer.microphone.start();
    this.isRecording = true;
    // Check Stream
    this.stream = stream;
    // Reinit Audio
    //  this.replaceAudio();
    this.audio.nativeElement.muted = true;
    this.audio.nativeElement.srcObject = stream;
    this.audio.nativeElement.play();

    // Options
    const options = {
      type: 'audio',
      mimeType: 'audio/ogg',
      numberOfAudioChannels: this.isEdge ? 1 : 2,
      bufferSize: 16384,
      sampleRate: 44100,
 
      onTimeStamp: (timestamp, timestamps) => {
        const duration = (new Date().getTime() - timestamps[0]) / 1000;
        console.log('duration', duration);
        if (duration < 0) { return 0; }
      }
    };

    if (navigator.platform && navigator.platform.toString().toLowerCase().indexOf('win') === -1) {
      options.sampleRate = 48000; // or 44100 or remove this line for default
    }
    if (this.recordRTC) {
      this.recordRTC.clearRecordedData()
      this.recordRTC.destroy();
      this.recordRTC = null;
    }
    this.recordRTC = RecordRTC(this.stream, options);



    this.recordRTC.startRecording();

    this.timeElapsed = 0;
    this.timeElapsedInterval = setInterval(() => {
      this.timeElapsed += 1;
      if (this.timeElapsed * 1000 >= this.maxDuration) {
        this.stopRecord();
      }
    }, 1000);
    this.recordOnStart.emit();
  }
  // Stop record
  stopRecord() {
    // Stop michrophone wave
    this.waveSurfer.microphone.stopDevice();
    if (this.isRecording) {
      this.isRecording = false;
      clearTimeout(this.timeElapsedInterval);
      this.recordRTC.stopRecording(this.stopRecordingCallback());
    }


  }
  // Stop record callback
  stopRecordingCallback() {

    setTimeout(() => {

      const recordRTC = this.recordRTC;

      recordRTC.getDataURL(dataURL => {
        this.replaceAudio(dataURL);
        this.audioSrc = dataURL;
        this.audioDuration = this.timeElapsed;
        const commentThreadMessage = new CommentThreadMessage();
        commentThreadMessage.commentAudio = dataURL;
        commentThreadMessage.type = 'audio';

        this.recordOnEnd.emit(commentThreadMessage);
        this.stream.stop();
        this.stream.getAudioTracks().forEach(track => track.stop());
      });

    }, 300);


  }
  // On close record
  closeRecorder() {
    this.recordOnClose.emit();
  }


  // Player Component plat
  startPlayer() {
    if (this.playerAction === 'pause') {
      this.audioPlayer.play();
    } else if (this.playerAction === 'play') {
      this.audioPlayer.pause();
    }
  }
  // On player stop
  onPlayerStop() {
    this.playerAction = 'pause';
  }
  // On player play
  onPlayerPlay() {
    this.playerAction = 'play';
  }
  // On player play
  onPlayerPause() {
    this.playerAction = 'pause';
  }
  // On accept record create the message
  acceptRecord() {
    const commentThreadMessage = new CommentThreadMessage();
    commentThreadMessage.commentAudio = this.audioSrc;
    commentThreadMessage.type = 'audio';
    commentThreadMessage.commentAudioDuration = this.timeElapsed;
    this.recordOnAccept.emit(commentThreadMessage);
    this.reinitRecording();
  }
  // On cancel emit
  cancel() {
    this.recordOnCancel.emit();
    this.reinitRecording();
  }

  reinitRecording() {
    this.playerAction = 'pause';
    this.timeElapsed = 0;
    if (this.isRecording) {
      this.isRecording = false;
      clearTimeout(this.timeElapsedInterval);
      this.recordRTC.stopRecording(() => { });
    }
    this.audioSrc = undefined;
  }

  ngOnDestroy() {
    if (this.audio.nativeElement instanceof Audio) {
      this.audio.nativeElement.removeEventListener('timeupdate', () => { });
    }
    if (this.waveSurfer) {
      this.waveSurfer.destroy();
    }
    this.reinitRecording();
  }
}
