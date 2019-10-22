import React from 'react';
// import styles from './HomePageForm.module.css';
import { Formik } from 'formik';
import Select from '../Select';
import Input from '../Input';
import EmailInput from '../EmailInput';
import { Button, Form } from 'react-bootstrap';
import cities from '../../data/cities.json';
import schema from '../../formSchema';

export default function HomePageForm(props) {
  let { initialValues, onSubmit } = props;
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={onSubmit}
    >
      {({ values, handleChange, handleSubmit, errors, isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          <Select
            {...{
              label: 'City',
              name: 'city',
              options: cities,
              value: values.city,
              handleChange,
            }}
          />
          <Input
            {...{
              label: 'Search Term',
              name: 'searchTerm',
              value: values.searchTerm,
              placeholder: '(Optional) e.g. dining table',
              handleChange,
            }}
          />
          <EmailInput
            {...{
              label: 'Email',
              name: 'email',
              value: values.email,
              handleChange,
              error: errors.email,
            }}
          />
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}
