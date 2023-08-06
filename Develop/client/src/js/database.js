import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('jate')) {
        db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
        console.log('jate database created');
      }
    },
  });

export const putDb = async (content) => {
  const jateDB = await initdb();
  const tx = jateDB.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');

  const request = store.put({ id: 1, value: content });
  const result = await request;

  console.log('result.value', result);
  return tx.done;
};

export const getDb = async () => {
  console.log('GET all from the database');
  const jateDB = await initdb();
  const tx = jateDB.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  
  const request = store.getAll();
  const result = await request;
  
  console.log('result.value', result);
  return result.value;
};

initdb();
