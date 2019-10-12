import React from 'react';
import styles from './Select.module.css';
import { Form, Col, Row } from 'react-bootstrap';

export default function Select(props) {
  let { label, name, options, value, handleChange } = props;
  return (
    <Form.Group as={Row} controlId={name}>
      <Form.Label column sm="2">
        {label}
      </Form.Label>
      <Col sm="10">
        <Form.Control
          as="select"
          name={name}
          value={value}
          onChange={handleChange}
        >
          {options.map(option => (
            <option key={option}>{option}</option>
          ))}
        </Form.Control>
      </Col>
    </Form.Group>
  );
}
