import React from 'react';
import { Form, Col, Row } from 'react-bootstrap';

export default function Input(props) {
  let { label, name, value, type, placeholder, handleChange } = props;
  return (
    <Form.Group as={Row} controlId={name}>
      <Form.Label column sm="2">
        {label}
      </Form.Label>
      <Col sm="10">
        <Form.Control
          {...{ name, value, type, placeholder, onChange: handleChange }}
        />
      </Col>
    </Form.Group>
  );
}
