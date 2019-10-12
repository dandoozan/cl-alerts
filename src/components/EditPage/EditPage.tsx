import React, { useEffect, useState } from 'react';
import styles from './EditPage.module.css';
import { useLocation } from 'react-router-dom';
import firebase from '../../firebase';
import { Formik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import Select from '../Select';
import Input from '../Input';
import EmailInput from '../EmailInput';

export default function EditPage(props) {
  let {} = props;
  let tbx: any = null;
  let [alertData, setAlertData] = useState(tbx);

  let query = new URLSearchParams(useLocation().search);
  let alertId = query.get('alertId');

  //fetch the alerts for this user from the database
  useEffect(() => {
    let ignore = false;

    (async () => {
      let db = firebase.firestore();
      let docRef = db.collection('alerts').doc(alertId || '');
      let doc = await docRef.get();
      if (doc.exists) {
        let data = doc.data();
        console.log('Setting alertData:', data);

        //tbx (the timeout)
        setTimeout(() => {
          if (!ignore) {
            setAlertData(data);
          }
        }, 500);
      }
    })();

    return () => {
      ignore = true;
    };
  }, [alertId]);

  return (
    <div className={styles.editPage}>
      <h1>Edit Alert</h1>
      {alertData && (
        <Formik
          initialValues={alertData}
          onSubmit={async (values, { setSubmitting }) => {
            console.log('​***writing to database, values=', values);
            let db = firebase.firestore();
            await db
              .collection('alerts')
              .doc(alertId || '')
              .set(values);
            setSubmitting(false);
          }}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            isSubmitting,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Select
                {...{
                  label: 'City',
                  name: 'city',
                  options: ['Phoenix', 'Tucson'],
                  value: values.city,
                  handleChange,
                }}
              />
              <Input
                {...{
                  label: 'Search Term',
                  name: 'searchTerm',
                  value: values.searchTerm,
                  handleChange,
                }}
              />
              <EmailInput
                {...{
                  label: 'Email',
                  name: 'email',
                  value: values.email,
                  handleChange,
                }}
              />
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}
