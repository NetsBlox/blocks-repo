// This import loads the firebase namespace along with all its type information.
import * as firebase from 'firebase/app';

// These imports load individual services into the firebase namespace.
// import 'firebase/auth';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: 'AIzaSyCaNoOrCMi_Idwg0gBJfxBitmifNc_1Nb0',
  authDomain: 'module-repo.firebaseapp.com',
  databaseURL: 'https://module-repo.firebaseio.com',
  projectId: 'module-repo',
  storageBucket: 'module-repo.appspot.com',
  messagingSenderId: '127603488590'
});

export const db = firebase.firestore();
export const modulesRef = db.collection('modules');
export const usersRef = db.collection('users');

// fully loads a collection
export function loadCol(col, whereParams) {
  let docPromise = whereParams ? col.where(...whereParams).get() : col.get();
  let results = [];
  return docPromise
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        let obj = {
          _id: doc.id,
          ...doc.data()
        };
        results.push(obj);
      });
      return results;
    });
}
