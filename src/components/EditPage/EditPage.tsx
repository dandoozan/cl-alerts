import React, { useEffect, useState } from 'react';
import styles from './EditPage.module.css';
import { useLocation } from 'react-router-dom';
import firebase from '../../firebase';

export default function EditPage(props) {
  let {} = props;
  let [alertData, setAlertData] = useState({});

  let query = new URLSearchParams(useLocation().search);
  let alertId = query.get('alertId');
  let email = query.get('u');

  //fetch the alerts for this user from the database
  useEffect(() => {
    let ignore = false;

    (async () => {
      try {
        let db = firebase.firestore();
        let docRef = db.collection('alerts').doc(alertId || '');
        let doc = await docRef.get();
        if (doc.exists) {
          console.log('Document data:', doc.data());
          if (!ignore) {
            // setAlertDetails(doc.data());
          }
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      } catch (error) {
        console.log('Error getting document:', error);
      }
    })();

    return () => {
      ignore = true;
    };
  });

  return (
    <div className={styles.editPage}>
      <h1>Edit Alert</h1>
      <h4>User: {email}</h4>
      {/* todo: insert form here */}
    </div>
  );
}
