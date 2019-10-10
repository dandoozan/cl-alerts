import firebase from 'firebase/app';
import 'firebase/firestore';
import firebaseConfig from './PRIVATE_firebaseConfig.json';

console.log(`***initializing firebase app`)
firebase.initializeApp(firebaseConfig);

export default firebase;
