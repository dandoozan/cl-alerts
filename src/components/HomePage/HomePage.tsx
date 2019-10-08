import React, { useState } from 'react';
import styles from './HomePage.module.css';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

interface Props {}

export default function HomePage({  }: Props) {
  let [toCreate, setToCreate] = useState(false);

  if (toCreate) {
    return <Redirect to="/create" />;
  } else {
    return (
      <div className={styles.homePage}>
        <h2 className="text-center">Search Craigslist</h2>
        <Form onSubmit={() => setToCreate(true)}>
          <Form.Group as={Row} controlId="searchForm.city">
            <Form.Label column sm="2">
              City
            </Form.Label>
            <Col sm="10">
              <Form.Control as="select">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="searchForm.searchTerm">
            <Form.Label column sm="2">
              Search Term
            </Form.Label>
            <Col sm="10">
              <Form.Control placeholder="(Optional) e.g. dining table" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="searchForm.email">
            <Form.Label column sm="2">
              Email
            </Form.Label>
            <Col sm="10">
              <Form.Control type="email" placeholder="e.g. johndoe@gmail.com" />
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
