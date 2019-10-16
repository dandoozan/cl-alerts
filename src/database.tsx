import firebase from './firebase';

export async function addAlert(data) {
  return new Promise((resolve, reject) => {
    console.log(`***in database addAlert, data=`, data);
    setTimeout(() => {
      resolve('');
    }, 1000);
  });
  // console.log(`***in database addAlert, data=`, data);
  // return '';
  // try {
  //   let db = firebase.firestore();
  //   let docRef = await db.collection('alerts').add(data);
  //   return docRef.id;
  // } catch (error) {
  //   console.error('Error adding document: ', error);
  // }
}
export function getAlert(id) {
  return new Promise((resolve, reject) => {
    console.log(`***in database getAlert, id=${id}`);
    setTimeout(() => {
      resolve(null);
    }, 1000);
  });
  // console.log(`***in database getAlert, id=${id}`);
  // return null;
  // try {
  //   let db = firebase.firestore();
  //   let doc = await db
  //     .collection('alerts')
  //     .doc(id)
  //     .get();
  //   let data = doc.data();
  //   if (doc.exists) {
  //     return doc.data();
  //   } else {
  //     // doc.data() will be undefined in this case
  //     console.log('No such document!');
  //   }
  // } catch (error) {
  //   console.error('Error getting document: ', error);
  // }
}
export async function updateAlert(id, data) {
  return new Promise((resolve, reject) => {
    console.log(`***in database updateAlert, id=${id}, data=`, data);
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
  // console.log(`***in database updateAlert, id=${id}, data=`, data);
  // try {
  //    let db = firebase.firestore();
  //    await db
  //        .collection('alerts')
  //        .doc(id)
  //        .set(data);
  // } catch (error) {
  //    console.error('Error updating document: ', error);
  // }
}
export async function deleteAlert(id) {
  return new Promise((resolve, reject) => {
    console.log(`***in database deleteAlert, id=${id}`);
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
  // console.log(`***in database deleteAlert, id=${id}`);
  // let db = firebase.firestore();
  // try {
  //   await db
  //     .collection('alerts')
  //     .doc(id)
  //     .delete();
  // } catch (error) {
  //   console.error('Error removing document: ', error);
  // }
}
