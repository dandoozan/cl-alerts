import React from 'react';
import styles from './Input.module.css';
import { Form, Col, Row } from 'react-bootstrap';

export default function Input(props) {
  let { label, name, value, handleChange } = props;
  return (
    <Form.Group as={Row} controlId={name}>
      <Form.Label column sm="2">
        {label}
      </Form.Label>
      <Col sm="10">
        <Form.Control name={name} value={value} onChange={handleChange} />
      </Col>
    </Form.Group>
  );
}
