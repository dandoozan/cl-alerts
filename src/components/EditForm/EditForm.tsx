import React, { useState } from 'react';
// import styles from './EditForm.module.css';
import { Formik } from 'formik';
import Select from '../Select';
import Input from '../Input';
import EmailInput from '../EmailInput';
import { Button, Form } from 'react-bootstrap';
import cities from '../../data/cities.json';
import days from '../../data/days.json';
import { schema } from '../../formFields';
import Checkbox from '../Checkbox';
import ButtonGroup from '../ButtonGroup';

export default function EditForm(props) {
  let { initialValues, onSubmit } = props;
  let [selectedDays, setSelectedDays] = useState(initialValues.days);

  function handleDaysChange(newDays) {
    setSelectedDays(newDays);
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      validateOnChange={false}
      onSubmit={(formValues, ...rest) => {
        onSubmit({ ...formValues, days: selectedDays }, ...rest);
      }}
    >
      {({ values, handleChange, handleSubmit, errors, isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          <Select
            {...{
              label: 'City',
              labelSize: 2,
              name: 'city',
              options: cities,
              value: values.city,
              handleChange,
            }}
          />
          <Input
            {...{
              label: 'Search Term',
              labelSize: 2,
              name: 'searchTerm',
              value: values.searchTerm,
              handleChange,
            }}
          />
          <Checkbox
            {...{
              label: 'Search title only',
              size: 10,
              name: 'titleOnly',
              value: values.titleOnly,
              handleChange,
            }}
          />
          <br />
          <Input
            {...{
              label: 'Min Price',
              labelSize: 2,
              name: 'minPrice',
              value: values.minPrice,
              handleChange,
              error: errors.minPrice,
            }}
          />
          <ButtonGroup
            {...{
              values: days,
              initialValues: selectedDays,
              handleChange: handleDaysChange,
              label: 'Days',
              labelSize: 2,
            }}
          />
          <EmailInput
            {...{
              label: 'Email',
              labelSize: 2,
              name: 'email',
              value: values.email,
              handleChange,
              error: errors.email,
            }}
          />
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            Save changes
          </Button>
        </Form>
      )}
    </Formik>
  );
}
