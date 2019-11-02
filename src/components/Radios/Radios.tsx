import React from 'react';
import { Form } from 'react-bootstrap';

export default function Radios(props) {
  let { options, name, selectedIndex } = props;

  return (
    <div>
      {options.map(({ label, handleChange }, i) => (
        <Form.Check
          inline
          {...{
            key: label,
            label,
            type: 'radio',
            name,
            id: `${name}-${i}`,
            onChange: handleChange,
            checked: selectedIndex === i,
          }}
        />
      ))}
    </div>
  );
}
