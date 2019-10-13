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

  async function onSubmit(formValues) {
    let id = await addAlert(formValues);
    setAlertData({ id, ...formValues });
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
        <HomePageForm initialValues={initialFormValues} onSubmit={onSubmit}/>
      </div>
    );
  }
}
