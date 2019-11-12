import React from 'react';
import styles from './ButtonGroup.module.css';
import {
  Form,
  Row,
  Col,
  ToggleButtonGroup,
  ToggleButton,
} from 'react-bootstrap';
import Label from '../Label';

export default function ButtonGroup(props) {
  let {
    values,
    initialValues,
    handleChange,
    label,
    labelSize,
    labelAlign,
    compact,
  } = props;
  labelSize = labelSize || 0;
  return (
    <Form.Group as={Row}>
      {label && <Label size={labelSize} text={label} align={labelAlign} />}
      <Col sm={12 - labelSize}>
        <ToggleButtonGroup
          type="checkbox"
          className="d-block" //add "d-block" (display: block) so that the ToggleButtons wrap correctly
          value={initialValues}
          onChange={handleChange}
        >
          {values.map((value, i) => (
            <ToggleButton
              className={compact && styles.compact}
              variant="secondary"
              key={i}
              value={i}
            >
              {value}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Col>
    </Form.Group>
  );
}
