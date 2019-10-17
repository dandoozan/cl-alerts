import React, { useEffect, useState } from 'react';
import styles from './AlertPage.module.css';
import { useLocation, Redirect } from 'react-router-dom';
import DeleteButton from '../DeleteButton';
import { updateAlert, getAlert } from '../../database';
import EditForm from '../EditForm';
import SubmitError from '../SubmitError';

export default function AlertPage(props) {
  let [alertData, setAlertData] = useState<any>(null);
  let [isEditted, setIsEditted] = useState(false);
  let [submitError, setSubmitError] = useState(false);
  let [invalidAlertId, setInvalidAlertId] = useState(false);

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
    let ignore = false;

    (async () => {
      if (alertId) {
        let data = await getAlert(alertId);
        if (data) {
          if (!ignore) {
            setAlertData(data);
          }
        } else {
          setInvalidAlertId(true);
        }
      } else {
        setInvalidAlertId(true);
      }
    })();

    return () => {
      ignore = true;
    };
  }, [alertId]);

  //Make the successful edit message hide after some time
  useEffect(() => {
    if (isEditted) {
      setTimeout(() => {
        setIsEditted(false);
      }, 1000);
    }
  }, [isEditted]);

  if (invalidAlertId) {
    return <Redirect push to="/" />;
  } else {
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
}
