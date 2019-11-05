import React from 'react';
import styles from './Radios.module.css';
import { Form } from 'react-bootstrap';

export default function Radios(props) {
  let { label, options, name, selectedIndex } = props;

  return (
    <div className={styles.radios}>
      <div className={styles.label}>{label}</div>
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
