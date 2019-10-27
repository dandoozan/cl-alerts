import React, { useState } from 'react';
// import styles from './HomePageForm.module.css';
import { Formik } from 'formik';
import Select from '../Select';
import Input from '../Input';
import EmailInput from '../EmailInput';
import { Button, Form } from 'react-bootstrap';
import cities from '../../data/cities.json';
import days from '../../data/days.json';
import { schema } from '../../formFields';
import { SlideDown } from 'react-slidedown';
import 'react-slidedown/lib/slidedown.css';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Checkbox from '../Checkbox';
import ButtonGroup from '../ButtonGroup';

export default function HomePageForm(props) {
  let { initialValues, onSubmit } = props;
  let [showMoreOptions, setShowMoreOptions] = useState(true);
  let [selectedDays, setSelectedDays] = useState(initialValues.days);

  function handleMoreOptionsClick(e) {
    setShowMoreOptions(!showMoreOptions);
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
              placeholder: '(Optional) e.g. dining table',
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
          <div className="text-right">
            <Button variant="link" onClick={handleMoreOptionsClick}>
              {showMoreOptions ? 'Less' : 'More search'} options
              {showMoreOptions ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Button>
          </div>
          <SlideDown className={'my-dropdown-slidedown'}>
            {showMoreOptions && (
              <div>
                <Input
                  {...{
                    label: 'Min Price',
                    labelSize: 5,
                    name: 'minPrice',
                    value: values.minPrice,
                    placeholder: 'e.g. 10',
                    handleChange,
                    error: errors.minPrice,
                  }}
                />
              </div>
            )}
          </SlideDown>
          <hr />
          <ButtonGroup
            {...{
              values: days,
              initialValues: selectedDays,
              setValues: setSelectedDays,
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
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}
