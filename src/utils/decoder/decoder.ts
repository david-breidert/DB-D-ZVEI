import {
  getCurrentFrequencyFft,
  getTonNummer,
  getValidatedTonfolge
} from './decoderZveiAudio';
import store from '../../store/index';

export default class Decoder {
  microphoneId: string;
  kanal: string;
  audioStream: MediaStream | undefined;
  audioContext: AudioContext;
  audioAnalyser: AnalyserNode;
  interval: number;
  currentFrequency: number;
  currentTon: number | string;
  minTonCount: number;
  maxTonCount: number;

  constructor(kanal: string, mediaDeviceId?: string) {
    this.microphoneId = mediaDeviceId || 'default';
    this.kanal = kanal;
    this.audioContext = new AudioContext();
    this.audioAnalyser = this.audioContext.createAnalyser();
    this.audioAnalyser.minDecibels = -40;
    this.audioAnalyser.maxDecibels = -10;
    this.audioAnalyser.smoothingTimeConstant = 0;
    this.interval = 0;
    this.currentFrequency = -1;
    this.currentTon = -1;
    this.minTonCount = 3;
    this.maxTonCount = 11;
  }

  async start() {
    this.audioStream = await navigator.mediaDevices.getUserMedia({
      audio: { deviceId: this.microphoneId }
    });
    this.audioContext
      .createMediaStreamSource(this.audioStream)
      .connect(this.audioAnalyser);

    let tonFolgeGesamt: Array<number | string> = [];
    let zeitLetzterTon = 0;

    const updateData = () => {
      const currentFrequency = getCurrentFrequencyFft(
        this.audioContext,
        this.audioAnalyser
      );
      if (currentFrequency !== -1) {
        //store.dispatch('updateLastTimeReceived', Date.now())
        const currentTon = getTonNummer(currentFrequency);
        if (currentTon !== -1) {
          tonFolgeGesamt.push(currentTon);
          zeitLetzterTon = Date.now();
          if (tonFolgeGesamt.length === 1) {
            setTimeout(() => {
              let tonfolge = getValidatedTonfolge(
                tonFolgeGesamt,
                this.minTonCount,
                this.maxTonCount
              );
              if (tonfolge == null && Date.now() - zeitLetzterTon <= 150) {
                const intervallCheck = setInterval(() => {
                  tonfolge = getValidatedTonfolge(
                    tonFolgeGesamt,
                    this.minTonCount,
                    this.maxTonCount
                  );
                  if (tonfolge != null) {
                    console.log('Tonfolge durch IntervallCheck ermittelt:');
                    //store.dispatch('addAlarm', tonfolge)
                    clearInterval(intervallCheck);
                    tonFolgeGesamt = [];
                  } else if (
                    tonfolge == null &&
                    Date.now() - zeitLetzterTon > 210
                  ) {
                    clearInterval(intervallCheck);
                    tonFolgeGesamt = [];
                  }
                }, 140);
              } else if (tonfolge != null) {
                console.log('Tonfolge ermittelt:');
                //store.dispatch('addAlarm', tonfolge)

                tonFolgeGesamt = [];
              } else {
                tonFolgeGesamt = [];
              }
            }, 600);
          }
        }
      }
    };

    this.interval = window.setInterval(() => {
      updateData();
    }, 10);

    console.log('Decoder started on channel: ' + this.kanal);
  }

  stop() {
    clearInterval(this.interval);
    console.log('Decoder stopped on channel: ' + this.kanal);
  }
}
