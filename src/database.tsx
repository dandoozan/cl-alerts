import firebase from './firebase';

//tbx
function sleep(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

export async function addAlert(data) {
  console.log(`***in database addAlert, data=`, data);
  await sleep(1000);
  return '';
  // try {
  //   let db = firebase.firestore();
  //   let docRef = await db.collection('alerts').add(data);
  //   return docRef.id;
  // } catch (error) {
  //   console.error('Error adding document: ', error);
  // }
}
export async function getAlert(id) {
  console.log(`***in database getAlert, id=${id}`);
  await sleep(1000);
  try {
    let db = firebase.firestore();
    let doc = await db
      .collection('alerts')
      .doc(id)
      .get();
    if (doc.exists) {
      return doc.data();
    }
  } catch (error) {
    // console.error('Error getting document: ', error);
  }
  return null;
}
export async function updateAlert(id, data) {
  console.log(`***in database updateAlert, id=${id}, data=`, data);
  await sleep(1000);
  return false;
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
  console.log(`***in database deleteAlert, id=${id}`);
  await sleep(1000);
  return true;
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
