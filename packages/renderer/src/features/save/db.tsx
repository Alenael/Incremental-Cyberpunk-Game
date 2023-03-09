import {CONSTANTS} from '/@/Constants';

function getDB(): Promise<IDBObjectStore> {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) reject('Indexed DB does not exists');

    const indexedDbRequest: IDBOpenDBRequest = window.indexedDB.open(CONSTANTS.SAVE_NAME, 1);

    indexedDbRequest.onupgradeneeded = function (this: IDBRequest<IDBDatabase>) {
      const db = this.result;
      db.createObjectStore(CONSTANTS.SAVE_STORE);
    };

    indexedDbRequest.onerror = function (this: IDBRequest<IDBDatabase>, ev: Event) {
      reject(`Failed to get IDB ${ev}`);
    };

    indexedDbRequest.onsuccess = function (this: IDBRequest<IDBDatabase>) {
      const db = this.result;
      if (!db) {
        reject('database loading result was undefined');
        return;
      }
      resolve(
        db.transaction([CONSTANTS.SAVE_STORE], 'readwrite').objectStore(CONSTANTS.SAVE_STORE),
      );
    };
  });
}

export function load(): Promise<string> {
  return new Promise((resolve, reject) => {
    getDB()
      .then(db => {
        return new Promise<string>((resolve, reject) => {
          const request: IDBRequest<string> = db.get(CONSTANTS.SAVE_RECORD);
          request.onerror = function (this: IDBRequest<string>, ev: Event) {
            reject('Error in Database request to get savestring: ' + ev);
          };

          request.onsuccess = function (this: IDBRequest<string>) {
            resolve(this.result);
          };
        }).then(saveString => resolve(saveString));
      })
      .catch(r => reject(r));
  });
}

export function save(saveString: string): Promise<void> {
  return getDB().then(db => {
    return new Promise<void>((resolve, reject) => {
      const request = db.put(saveString, CONSTANTS.SAVE_RECORD);

      request.onerror = function (e) {
        reject('Error saving game to IndexedDB: ' + e);
      };

      request.onsuccess = () => resolve();
    });
  });
}

export function deleteGame(): Promise<void> {
  return getDB().then(db => {
    db.delete(CONSTANTS.SAVE_RECORD);
  });
}
