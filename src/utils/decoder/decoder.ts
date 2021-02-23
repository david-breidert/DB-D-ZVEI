import { Tonfolge, ValidatedTonfolge } from '@/types';
import { getCurrentFrequencyFft, getTonNummer, getValidatedTonfolge } from './decoderZveiAudio';
import EinsatzmittelDatabase from './einsatzmittelDatabase';

export default class Decoder {
  microphoneId: string;
  kanal: string;
  audioStream: MediaStream | undefined;
  audioContext = new AudioContext();
  audioAnalyser = this.audioContext.createAnalyser();
  interval = 0;
  db: EinsatzmittelDatabase;
  currentFrequency = -1;
  currentTon: number | string = -1;
  minTonCount = 3;
  maxTonCount = 11;
  running = false;

  constructor(kanal: string, mediaDeviceId?: string) {
    this.microphoneId = mediaDeviceId || 'default';
    this.kanal = kanal;
    this.audioAnalyser.minDecibels = -40;
    this.audioAnalyser.maxDecibels = -10;
    this.audioAnalyser.smoothingTimeConstant = 0;
    this.db = new EinsatzmittelDatabase(kanal);
  }

  async start() {
    this.running = true;
    this.audioStream = await navigator.mediaDevices.getUserMedia({
      audio: { deviceId: this.microphoneId }
    });
    this.audioContext.createMediaStreamSource(this.audioStream).connect(this.audioAnalyser);

    let tonFolgeGesamt: Tonfolge = [];
    let zeitLetzterTon = 0;

    const updateData = () => {
      const currentFrequency = getCurrentFrequencyFft(this.audioContext, this.audioAnalyser);
      if (currentFrequency !== -1) {
        if (this.onReceived) this.onReceived();
        const currentTon = getTonNummer(currentFrequency);
        if (currentTon !== -1) {
          tonFolgeGesamt.push(currentTon);
          zeitLetzterTon = Date.now();
          if (tonFolgeGesamt.length === 1) {
            setTimeout(() => {
              let tonfolge = getValidatedTonfolge(tonFolgeGesamt, this.minTonCount, this.maxTonCount);
              if (tonfolge == null && Date.now() - zeitLetzterTon <= 150) {
                const intervallCheck = setInterval(() => {
                  tonfolge = getValidatedTonfolge(tonFolgeGesamt, this.minTonCount, this.maxTonCount);
                  if (tonfolge != null) {
                    console.log('Tonfolge durch IntervallCheck ermittelt: ' + tonfolge);
                    this.onTonfolge(this.kanal, tonfolge);
                    clearInterval(intervallCheck);
                    tonFolgeGesamt = [];
                  } else if (tonfolge == null && Date.now() - zeitLetzterTon > 210) {
                    clearInterval(intervallCheck);
                    tonFolgeGesamt = [];
                  }
                }, 140);
              } else if (tonfolge != null) {
                console.log('Tonfolge ermittelt: ' + tonfolge);
                this.onTonfolge(this.kanal, tonfolge);
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

  onTonfolge(kanal: string, tonfolge: ValidatedTonfolge) {
    console.log('No Handler specified to handle Tonfolge: ' + tonfolge);
  }

  onReceived() {
    console.log('onReceived not set');
  }

  stop() {
    clearInterval(this.interval);
    console.log('Decoder stopped on channel: ' + this.kanal);
    this.running = false;
  }
}
