import firebase from './firebase';

export async function addAlert(data) {
  try {
    let db = firebase.firestore();
    let docRef = await db.collection('alerts').add(data);
    return docRef.id;
  } catch (error) {
    console.error('Error adding document: ', error);
  }
}
export async function getAlert(id) {
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
  try {
    let db = firebase.firestore();
    await db
      .collection('alerts')
      .doc(id)
      .set(data);
    return true;
  } catch (error) {
    console.error('Error updating document: ', error);
  }
}
export async function deleteAlert(id) {
  let db = firebase.firestore();
  try {
    await db
      .collection('alerts')
      .doc(id)
      .delete();
    return true;
  } catch (error) {
    console.error('Error removing document: ', error);
  }
}
