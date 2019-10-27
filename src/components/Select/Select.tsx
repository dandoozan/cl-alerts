import React from 'react';
import { Form, Col, Row } from 'react-bootstrap';
import Label from '../Label';

export default function Select(props) {
  let { label, name, options, value, handleChange, labelSize } = props;
  return (
    <Form.Group as={Row} controlId={name}>
      <Label size={labelSize} text={label} />
      <Col sm={12 - labelSize}>
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
