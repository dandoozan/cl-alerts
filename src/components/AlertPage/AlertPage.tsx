import React, { useEffect, useState } from 'react';
import styles from './AlertPage.module.css';
import { useLocation } from 'react-router-dom';
import { Formik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import Select from '../Select';
import Input from '../Input';
import EmailInput from '../EmailInput';
import DeleteButton from '../DeleteButton';
import { updateAlert, getAlert } from '../../database';
import cities from '../../data/cities.json';

export default function AlertPage(props) {
  let {} = props;
  let [alertData, setAlertData] = useState<any>(null);
  let [formValues, setFormValues] = useState<any>(null);
  let [isEditted, setIsEditted] = useState(false);

  let query = new URLSearchParams(useLocation().search);
  let alertId = query.get('id');

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

  //update database when form is submitted
  useEffect(() => {
    console.log('In update database effect');
    if (alertId && formValues) {
      console.log('​***writing to database, formValues=', formValues);
      (async () => {
        await updateAlert(alertId, formValues);
      })();
    }
  }, [alertId, formValues]);

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
        <>
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
          <DeleteButton {...{ alertId }} />
        </>
      )}
    </div>
  );
}
