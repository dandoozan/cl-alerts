import React, { useState } from 'react';
import styles from './HomePageForm.module.css';
import { Formik } from 'formik';
import Select from '../Select';
import Input from '../Input';
import EmailInput from '../EmailInput';
import { Button, Form } from 'react-bootstrap';
import cities from '../../data/cities.json';
import categories from '../../data/categories.json';
import days from '../../data/days.json';
import { schema } from '../../formFields';
import { SlideDown } from 'react-slidedown';
import 'react-slidedown/lib/slidedown.css';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Checkbox from '../Checkbox';
import ButtonGroup from '../ButtonGroup';
import Radios from '../Radios';

enum DAY_RADIO_OPTIONS {
  everyDay,
  custom,
}

export default function HomePageForm(props) {
  let { initialValues, onSubmit } = props;
  let [showMoreOptions, setShowMoreOptions] = useState(true);
  let [selectedDays, setSelectedDays] = useState(initialValues.days);
  let [daysOption, setDaysOption] = useState(DAY_RADIO_OPTIONS.everyDay);

  function handleMoreOptionsClick(e) {
    setShowMoreOptions(!showMoreOptions);
  }

  function handleEveryDayRadioChange(e) {
    setDaysOption(DAY_RADIO_OPTIONS.everyDay);
    setSelectedDays(days);
  }
  function handleCustomRadioChange(e) {
    setDaysOption(DAY_RADIO_OPTIONS.custom);
  }
  function handleDaysChange(newDays) {
    setDaysOption(DAY_RADIO_OPTIONS.custom);
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
              placeholder: '(Optional) e.g. dining table',
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
                <Input
                  {...{
                    label: 'Max Price',
                    labelSize: 5,
                    name: 'maxPrice',
                    value: values.maxPrice,
                    placeholder: 'e.g. 1500',
                    handleChange,
                    error: errors.maxPrice,
                  }}
                />
              </div>
            )}
          </SlideDown>
          <hr className={styles.hr} />
          <div className={styles.alertSchedule}>
            <h4>Set alert schedule</h4>
            <div className={styles.innerAlertSchedule}>
              <Radios
                {...{
                  label: 'Days:',
                  options: [
                    {
                      label: 'Every day',
                      handleChange: handleEveryDayRadioChange,
                    },
                    {
                      label: 'Custom',
                      handleChange: handleCustomRadioChange,
                    },
                  ],
                  name: 'dayRadios',
                  selectedIndex: daysOption,
                }}
              />
              <ButtonGroup
                {...{
                  values: days,
                  initialValues: selectedDays,
                  handleChange: handleDaysChange,
                }}
              />
            </div>
          </div>
          <div className={styles.sendResultsTo}>
            <h4>Send results to...</h4>
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
          </div>
          <div className={styles.submit}>
            <Button
              variant="primary"
              size="lg"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
