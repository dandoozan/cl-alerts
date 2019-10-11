import React, { useEffect, useState } from 'react';
import styles from './EditPage.module.css';
import { useLocation } from 'react-router-dom';
import firebase from '../../firebase';
import { Formik } from 'formik';
import { Form, Row, Col, Button } from 'react-bootstrap';

export default function EditPage(props) {
  let {} = props;
  let tbx: any = null;
  let [alertData, setAlertData] = useState(tbx);

  let query = new URLSearchParams(useLocation().search);
  let alertId = query.get('alertId');
  let email = query.get('u');

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
        if (!ignore) {
          setAlertData(data);
        }
      }
      // setTimeout(() => {
      //   console.log(`***setting alert data`);
      //   setAlertData({
      //     city: 'Phoenix',
      //     searchTerm: 'new search term',
      //     email: 'dandoozan@gmail.com',
      //   });
      // }, 1000);
    })();

    return () => {
      ignore = true;
    };
  }, [alertId]);

  if (!alertData) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className={styles.editPage}>
        <h1>Edit Alert</h1>
        <h4>User: {alertData.email}</h4>
        <Formik
          initialValues={{ ...alertData }}
          onSubmit={async (values, { setSubmitting }) => {
            console.log('​***writing to database, values=', values);
            let db = firebase.firestore();
            //todo: verify that values has the appropriate properties (so i dont
            //write some arbitrary data to my database)
            await db
              .collection('alerts')
              .doc(alertId || '')
              .set(values);
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            status,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group as={Row} controlId="editForm.city">
                <Form.Label column sm="2">
                  City
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    as="select"
                    name="city"
                    value={values.city}
                    onChange={handleChange}
                  >
                    <option>Phoenix</option>
                    <option>Tucson</option>
                  </Form.Control>
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="editForm.searchTerm">
                <Form.Label column sm="2">
                  Search Term
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    name="searchTerm"
                    value={values.searchTerm}
                    onChange={handleChange}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="editForm.email">
                <Form.Label column sm="2">
                  Email
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                  />
                </Col>
              </Form.Group>

              <Button variant="primary" type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}