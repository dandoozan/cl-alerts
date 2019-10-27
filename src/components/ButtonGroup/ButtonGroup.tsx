import React from 'react';
import {
  Form,
  Row,
  Col,
  ToggleButtonGroup,
  ToggleButton,
} from 'react-bootstrap';
import Label from '../Label';

export default function ButtonGroup(props) {
  let { values, initialValues, setValues, label, labelSize } = props;
  labelSize = labelSize || 0;
  return (
    <Form.Group as={Row}>
      {label && <Label size={labelSize} text={label} />}
      <Col sm={12 - labelSize}>
        <ToggleButtonGroup
          type="checkbox"
          value={initialValues}
          onChange={vals => setValues(vals)}
        >
          {values.map(value => (
            <ToggleButton key={value} value={value}>
              {value}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Col>
    </Form.Group>
  );
}
