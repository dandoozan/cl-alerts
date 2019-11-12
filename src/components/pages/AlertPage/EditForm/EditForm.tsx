import React, { useState } from 'react';
// import styles from './EditForm.module.css';
import { Formik } from 'formik';
import Select from '../../../form/Select';
import Input from '../../../form/Input';
import EmailInput from '../../../form/EmailInput';
import { Button, Form } from 'react-bootstrap';
import cities from '../../../../data/cities.json';
import categories from '../../../../data/categories.json';
import days from '../../../../data/days.json';
import hours from '../../../../data/hours.json';
import { schema } from '../../../../formFields';
import Checkbox from '../../../form/Checkbox';
import ButtonGroup from '../../../form/ButtonGroup';

export default function EditForm(props) {
  let { initialValues, onSubmit } = props;
  let [selectedDays, setSelectedDays] = useState(initialValues.days);
  let [selectedHours, setSelectedHours] = useState(initialValues.hours);

  function handleDaysChange(newDays) {
    setSelectedDays(newDays);
  }
  function handleHoursChange(newHours) {
    setSelectedHours(newHours);
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      validateOnChange={false}
      onSubmit={(formValues, ...rest) => {
        onSubmit(
          { ...formValues, days: selectedDays, hours: selectedHours },
          ...rest
        );
      }}
    >
      {({ values, handleChange, handleSubmit, errors, isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          <Select
            {...{
              label: 'City',
              labelSize: 3,
              name: 'city',
              options: cities,
              value: values.city,
              handleChange,
            }}
          />
          <Select
            {...{
              label: 'Category',
              labelSize: 3,
              name: 'category',
              options: categories,
              value: values.category,
              handleChange,
            }}
          />
          <Input
            {...{
              label: 'Search Term',
              labelSize: 3,
              name: 'searchTerm',
              value: values.searchTerm,
              handleChange,
            }}
          />
          <Checkbox
            {...{
              label: 'Search title only',
              size: 9,
              name: 'titleOnly',
              value: values.titleOnly,
              handleChange,
            }}
          />
          <br />
          <Input
            {...{
              label: 'Min Price',
              labelSize: 3,
              name: 'minPrice',
              value: values.minPrice,
              handleChange,
              error: errors.minPrice,
            }}
          />
          <Input
            {...{
              label: 'Max Price',
              labelSize: 3,
              name: 'maxPrice',
              value: values.maxPrice,
              handleChange,
              error: errors.maxPrice,
            }}
          />
          <Input
            {...{
              label: 'Spam keyword(s)',
              labelSize: 3,
              name: 'spamKeywords',
              value: values.spamKeywords,
              handleChange,
            }}
          />
          <Checkbox
            {...{
              label: 'Only include results with pictures',
              size: 9,
              name: 'picOnly',
              value: values.picOnly,
              handleChange,
            }}
          />
          <br />
          <br />
          <ButtonGroup
            {...{
              values: days,
              initialValues: selectedDays,
              handleChange: handleDaysChange,
              label: 'Days',
              labelSize: 3,
            }}
          />
          <ButtonGroup
            {...{
              values: hours,
              initialValues: selectedHours,
              handleChange: handleHoursChange,
              label: 'Hours',
              labelSize: 3,
              compact: true,
            }}
          />
          <EmailInput
            {...{
              label: 'Email',
              labelSize: 3,
              name: 'email',
              value: values.email,
              handleChange,
              error: errors.email,
            }}
          />
          <Button
            variant="primary"
            size="lg"
            className="mt-3"
            type="submit"
            disabled={isSubmitting}
          >
            Submit Edit
          </Button>
        </Form>
      )}
    </Formik>
  );
}
