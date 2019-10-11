import React, { useState } from 'react';
import styles from './HomePage.module.css';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import firebase from '../../firebase';

const TBX_SHOULD_USE_REAL_DB = false;
const TBX_TEST_ALERT_ID = 'pNx6dGqLmEfXaOmyLkBN';

export default function HomePage(props) {
  let [isSubmitted, setIsSubmitted] = useState(false);
  let [alertId, setAlertId] = useState(TBX_TEST_ALERT_ID);

  let [city, setCity] = useState('Phoenix');
  let [searchTerm, setSearchTerm] = useState('test search term');
  let [email, setEmail] = useState('test@email.com');

  async function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log(`***onsubmit`);

    //store these in firebase
    try {
      let docRef;
      if (TBX_SHOULD_USE_REAL_DB) {
        let db = firebase.firestore();
        docRef = await db.collection('alerts').add({
          city,
          searchTerm,
          email,
        });
        console.log('Document written with ID: ', docRef.id);
      } else {
        docRef = { id: TBX_TEST_ALERT_ID };
      }

      setAlertId(docRef.id);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  }

  if (isSubmitted) {
    return (
      <Redirect
        push
        to={{
          pathname: '/create',
          state: { city, searchTerm, email, alertId },
        }}
      />
    );
  } else {
    return (
      <div className={styles.homePage}>
        <h2 className="text-center">Search Craigslist</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} controlId="searchForm.city">
            <Form.Label column sm="2">
              City
            </Form.Label>
            <Col sm="10">
              <Form.Control
                as="select"
                value={city}
                //@ts-ignore (ignore because typescript complains about "value")
                onChange={e => setCity(e.target.value)}
              >
                <option>Phoenix</option>
                <option>Tucson</option>
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="searchForm.searchTerm">
            <Form.Label column sm="2">
              Search Term
            </Form.Label>
            <Col sm="10">
              <Form.Control
                placeholder="(Optional) e.g. dining table"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="searchForm.email">
            <Form.Label column sm="2">
              Email
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="email"
                placeholder="e.g. johndoe@gmail.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}
