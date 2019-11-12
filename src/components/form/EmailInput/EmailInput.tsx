import React from 'react';
import Input from '../Input';

export default function EmailInput(props) {
  return (
    <Input
      {...{
        ...props,
        type: 'email',
        placeholder: 'e.g. joe@example.com',
      }}
    />
  );
}
