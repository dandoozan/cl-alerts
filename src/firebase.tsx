import firebase from 'firebase/app';
import 'firebase/firestore';
import firebaseConfig from './PRIVATE_firebaseConfig.json';

firebase.initializeApp(firebaseConfig);

export default firebase;
