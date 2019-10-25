import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

export default function Checkbox(props) {
  let { label, name, value, handleChange, size } = props;
  return (
    <Form.Group as={Row} controlId={name}>
      <Col sm={{ span: size, offset: 12 - size }}>
        <Form.Check label={label} checked={value} onChange={handleChange} />
      </Col>
    </Form.Group>
  );
}
