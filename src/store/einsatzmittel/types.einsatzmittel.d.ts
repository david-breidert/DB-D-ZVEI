export interface Einsatzmittel {
  _id: string;
  einsatzmittel: string;
  tonfolge: Array<number>;
}

export interface EinsatzmittelState {
  einsatzmittel: Array<Einsatzmittel>;
}
