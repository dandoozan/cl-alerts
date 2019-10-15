import React, { useState, useEffect } from 'react';
import styles from './HomePage.module.css';
import { Redirect } from 'react-router-dom';
import { addAlert } from '../../database';
import cities from '../../data/cities.json';
import HomePageForm from '../HomePageForm';

const initialFormValues = {
  city: cities[0],
  searchTerm: '',
  email: '',
};

export default function HomePage(props) {
  let [alertData, setAlertData] = useState<any>(null);
  let [submitError, setSubmitError] = useState(false);

  async function onSubmit(formValues, { setSubmitting }) {
    setSubmitError(false);
    let id = await addAlert(formValues);
    if (id) {
      setAlertData({ id, ...formValues });
    } else {
      setSubmitError(true);
    }
    setSubmitting(false);
  }

  //go to success page after the alert has been created
  if (alertData) {
    return (
      <Redirect
        push
        to={{
          pathname: '/create',
          state: alertData,
        }}
      />
    );
  } else {
    return (
      <div className={styles.homePage}>
        <h2 className="text-center">Search Craigslist</h2>
        <HomePageForm initialValues={initialFormValues} onSubmit={onSubmit} />
        {submitError && (
          <div>
            Oops, there was a problem creating the alert. Please try submitting
            again.
          </div>
        )}
      </div>
    );
  }
}
