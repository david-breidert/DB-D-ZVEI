import Datastore from 'nedb';
import path from 'path';
import fs from 'fs';
import { remote } from 'electron';
import { Einsatzmittel, ValidatedTonfolge } from '@/types';

export default class EinsatzmittelDatabase {
  kanal: string;
  db: Datastore;

  constructor(kanal: string) {
    this.kanal = kanal;
    this.db = new Datastore({ filename: path.join(remote.app.getPath('userData'), 'em' + this.kanal + '.db'), autoload: true });
    console.log(this.db);
  }

  /**
   * Returns a Promise that resolves to a found EM
   * @param query an object with key value pairs to compare against DB Content
   */

  getEm(query: object): Promise<Einsatzmittel | null> {
    return new Promise((resolve, reject) => {
      this.db.findOne(query, (err, em: Einsatzmittel | null) => {
        if (err) reject(err);
        if (em == null) {
          resolve(null);
        } else {
          resolve(em);
        }
      });
    });
  }

  getAlleEm(): Promise<Array<Einsatzmittel>> {
    return new Promise((resolve, reject) => {
      this.db.find({}, (err: Error | null, docs: Array<Einsatzmittel>) => {
        if (err) {
          reject(err);
        } else {
          resolve(docs);
        }
      });
    });
  }

  /**
   * Add one Einsatzmittel to the database
   * @param em Einsatzmittel to be added to the Database
   */

  addEm(em: { name: string; kanal: string; tonfolge: ValidatedTonfolge }) {
    this.db.insert(em, (err, savedEm) => {
      if (err) throw err;
      console.log('Successfully added EM: ');
      console.dir(savedEm);
    });
  }

  /**
   * Update EM with existing ID in the database
   * @param em Einsatzmittel to be updated
   */
  editEm(em: Einsatzmittel) {
    this.db.update({ _id: em._id }, em);
  }

  /**
   * Delete one Einsatzmittel from the database
   * @param em Einsatzmittel to be deleted from the database
   */
  deleteEm(em: Einsatzmittel) {
    this.db.remove({ _id: em._id }, {}, (err, n) => {
      if (err) throw err;
      console.log('Successfully deleted one EM from the database, ID: ' + em._id);
    });
  }
  deleteDB() {
    fs.rm(path.join(remote.app.getPath('userData'), 'em' + this.kanal + '.db'), () => {
      console.log('Successfuly deleted database file');
    });
  }
}
