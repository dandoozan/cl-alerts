import React, { useEffect, useState } from 'react';
import styles from './AlertPage.module.css';
import { useLocation } from 'react-router-dom';
import DeleteButton from '../DeleteButton';
import { updateAlert, getAlert } from '../../database';
import EditForm from '../EditForm';
import SubmitError from '../SubmitError';

export default function AlertPage(props) {
  let [alertData, setAlertData] = useState<any>(null);
  let [isEditted, setIsEditted] = useState(false);
  let [submitError, setSubmitError] = useState(false);

  let query = new URLSearchParams(useLocation().search);
  let alertId = query.get('id');

  async function onSubmit(formValues, { setSubmitting }) {
    setSubmitError(false);
    if (await updateAlert(alertId, formValues)) {
      setIsEditted(true);
    } else {
      setSubmitError(true);
    }
    setSubmitting(false);
  }

  //fetch the alert from the database
  useEffect(() => {
    console.log('In fetching data effect');
    let ignore = false;

    (async () => {
      if (alertId) {
        let data = await getAlert(alertId);
        if (data) {
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
      {alertData ? (
        <>
          <EditForm initialValues={alertData} onSubmit={onSubmit} />
          {isEditted && <div>Successfully editted!</div>}
          {submitError && <SubmitError />}
          <DeleteButton {...{ alertId }} />
        </>
      ) : (
        'Fetching alert data...'
      )}
    </div>
  );
}
