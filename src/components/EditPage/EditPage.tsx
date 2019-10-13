import React, { useEffect, useState } from 'react';
import styles from './EditPage.module.css';
import { useLocation } from 'react-router-dom';
import firebase from '../../firebase';
import { Formik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import Select from '../Select';
import Input from '../Input';
import EmailInput from '../EmailInput';

//todo: put this in a separate file (cities.json?)
const cities = ['Phoenix', 'Tucson'];

export default function EditPage(props) {
  let { } = props;
  let [alertData, setAlertData] = useState<any>(null);
  let [formValues, setFormValues] = useState<any>(null);
  let [isEditted, setIsEditted] = useState(false);

  let query = new URLSearchParams(useLocation().search);
  let alertId = query.get('alertId');

  //fetch the alert from the database
  useEffect(() => {
    console.log('In fetching data effect');
    let ignore = false;

    (async () => {
      if (alertId) {
        let db = firebase.firestore();
        let docRef = db.collection('alerts').doc(alertId);
        let doc = await docRef.get();
        let data = doc.data();
        if (data) {
          console.log('Setting alertData:', data);

          if (!ignore) {
            setAlertData(data);
          }
        }
      }
    })();

    return () => {
      ignore = true;
    };
  }, [alertId]);

  //update database when form is submitted
  useEffect(() => {
    console.log('In update database effect');
    if (formValues && alertId) {
      console.log('​***writing to database, formValues=', formValues);
      (async () => {
        // let db = firebase.firestore();
        // await db
        //   .collection('alerts')
        //   .doc(alertId)
        //   .set(formValues);
      })();
    }
  }, [formValues]);

  //Make the successful edit message hide after some time
  useEffect(() => {
    console.log('In hide edit msg effect');
    if (isEditted) {
      setTimeout(() => {
        setIsEditted(false);
      }, 1000);
    }
  }, [isEditted]);

  return (
    <div className={styles.editPage}>
      <h1>Edit Alert</h1>
      {alertData && (
        <Formik
          initialValues={alertData}
          onSubmit={(values, { setSubmitting }) => {
            console.log('In submit');

            setFormValues(values);

            //todo: I want to wait for the above command before firing
            //these so figure out how to await the command above
            setIsEditted(true);
            setSubmitting(false);
          }}
        >
          {({ values, handleChange, handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <Select
                {...{
                  label: 'City',
                  name: 'city',
                  options: cities,
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
              {isEditted && <div>Successfully editted!</div>}
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}
