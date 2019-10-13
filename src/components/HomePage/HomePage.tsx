import React, { useState, useEffect } from 'react';
import styles from './HomePage.module.css';
import { Form, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import firebase from '../../firebase';
import { Formik } from 'formik';
import Select from '../Select';
import Input from '../Input';
import EmailInput from '../EmailInput';
import { isEmpty } from 'lodash';

//todo: put this in a separate file (cities.json?)
const cities = ['Phoenix', 'Tucson'];

const initialFormValues = {
  city: cities[0],
  searchTerm: '',
  email: '',
};

export default function HomePage(props) {
  let [alertId, setAlertId] = useState('');
  let [formValues, setFormValues] = useState<any>(null);

  //write form values to database
  useEffect(() => {
    if (formValues) {
      console.log('writing to db, formValues=', formValues);

      // let db = firebase.firestore();
      // let docRef = await db.collection('alerts').add(values);
      // setAlertId(docRef.id);
    }
  }, [formValues]);

  //go to success page after the alert has been created
  if (alertId) {
    return (
      <Redirect
        push
        to={{
          pathname: '/create',
          state: { ...formValues, alertId },
        }}
      />
    );
  } else {
    return (
      <div className={styles.homePage}>
        <h2 className="text-center">Search Craigslist</h2>

        <Formik
          initialValues={initialFormValues}
          onSubmit={setFormValues}
        >
          {({ values, handleChange, handleSubmit }) => (
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
                  placeholder: '(Optional) e.g. dining table',
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
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}
