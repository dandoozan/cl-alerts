import React from 'react';
import { Form } from 'react-bootstrap';

export default function Label(props) {
  let { text, size } = props;
  return (
    <Form.Label className="text-right" column sm={size}>
      {text}
    </Form.Label>
  );
}
