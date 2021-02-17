import { Einsatzmittel } from '../einsatzmittel/types.einsatzmittel';

export interface Alarm {
  tonfolge: [
    {
      tf: Array<number>;
      confidence: number;
      zeitstempel: number;
      em: Einsatzmittel;
    }
  ];
}

export interface AlarmeState {
  alarme: Array<Alarm>;
}
