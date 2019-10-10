import React, { useState } from 'react';
import styles from './HomePage.module.css';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import firebase from '../../firebase';

interface Props {}

export default function HomePage({  }: Props) {
  let [toCreate, setToCreate] = useState(false);
  let [city, setCity] = useState('Phoenix');
  let [searchTerm, setSearchTerm] = useState('');
  let [email, setEmail] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log(`***onsubmit`);
    console.log('​city=', city);
    console.log('​searchTerm=', searchTerm);
    console.log('​email=', email);

    //store these in firebase
    try {
      let docRef = await firebase.firestore().collection('alerts').add({
        city,
        searchTerm,
        email,
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
    //setToCreate(true)
  }

  if (toCreate) {
    return <Redirect to="/create" />;
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
