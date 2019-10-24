import React from 'react';
import { Form, Col, Row } from 'react-bootstrap';

export default function Input(props) {
  let {
    label,
    name,
    value,
    type,
    placeholder,
    handleChange,
    error,
    labelSize,
  } = props;
  return (
    <Form.Group as={Row} controlId={name}>
      <Form.Label className="text-right" column sm={labelSize}>
        {label}
      </Form.Label>
      <Col sm={12 - labelSize}>
        <Form.Control
          {...{
            name,
            value,
            type,
            placeholder,
            onChange: handleChange,
            isInvalid: !!error,
          }}
        />
        {error && (
          <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        )}
      </Col>
    </Form.Group>
  );
}
