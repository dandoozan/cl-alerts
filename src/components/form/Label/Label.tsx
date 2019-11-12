import React from 'react';
import { Form } from 'react-bootstrap';

export default function Label(props) {
  let { text, size, align } = props;
  return (
    <Form.Label
      className={align === 'right' ? 'text-sm-right' : ''}
      column
      sm={size}
    >
      {text}
    </Form.Label>
  );
}
