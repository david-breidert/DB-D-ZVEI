export type Einsatzmittel = {
  _id: string;
  name: string;
  kanal: string;
  tonfolge: ValidatedTonfolge;
};

export type Ton = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 'R' | 'S' | -1;

export type Tonfolge = Array<0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 'R' | 'S'>;

export type ValidatedTonfolge = [0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9, 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9, 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9, 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9, 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9, 'S'?];

export type Ruf = {
  kanal: string;
  tonfolge: ValidatedTonfolge;
  confidence: 1 | 2;
  zeitstempel: number;
};

export type Alarm = Array<Ruf>;
