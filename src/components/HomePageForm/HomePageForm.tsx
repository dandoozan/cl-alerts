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
import hours from '../../data/hours.json';
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
enum HOUR_RADIO_OPTIONS {
  everyFourHours,
  twiceADay,
  custom,
}

export default function HomePageForm(props) {
  let { initialValues, onSubmit } = props;
  let [showMoreOptions, setShowMoreOptions] = useState(false);
  let [selectedDays, setSelectedDays] = useState(initialValues.days);
  let [daysOption, setDaysOption] = useState(DAY_RADIO_OPTIONS.everyDay);
  let [selectedHours, setSelectedHours] = useState(initialValues.hours);
  let [hoursOption, setHoursOption] = useState(
    HOUR_RADIO_OPTIONS.everyFourHours
  );

  function handleMoreOptionsClick(e) {
    setShowMoreOptions(!showMoreOptions);
  }

  function handleEveryDayRadioChange(e) {
    setDaysOption(DAY_RADIO_OPTIONS.everyDay);
    setSelectedDays([0, 1, 2, 3, 4, 5, 6]);
  }
  function handleCustomDaysRadioChange(e) {
    setDaysOption(DAY_RADIO_OPTIONS.custom);
  }
  function handleDaysChange(newDays) {
    setDaysOption(DAY_RADIO_OPTIONS.custom);
    setSelectedDays(newDays);
  }

  function handleEveryFourHoursRadioChange(e) {
    setHoursOption(HOUR_RADIO_OPTIONS.everyFourHours);
    setSelectedHours([3, 7, 11, 15, 19, 23]);
  }
  function handleTwiceADayRadioChange(e) {
    setHoursOption(HOUR_RADIO_OPTIONS.twiceADay);
    setSelectedHours([7, 17]);
  }
  function handleCustomHoursRadioChange(e) {
    setHoursOption(HOUR_RADIO_OPTIONS.custom);
  }
  function handleHoursChange(newHours) {
    setHoursOption(HOUR_RADIO_OPTIONS.custom);
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
                <Input
                  {...{
                    label: 'Spam keyword(s)',
                    labelSize: 5,
                    name: 'spamKeywords',
                    value: values.spamKeywords,
                    placeholder: 'e.g. broken, wanted, etc. (comma delimited)',
                    handleChange,
                  }}
                />
                <Checkbox
                  {...{
                    label: 'Only include results with pictures',
                    size: 7,
                    name: 'picOnly',
                    value: values.picOnly,
                    handleChange,
                  }}
                />
              </div>
            )}
          </SlideDown>
          <hr className={styles.hr} />
          <div className={styles.alertSchedule}>
            <h4>Set alert schedule</h4>
            <div className="ml-sm-3">
              <div className={styles.days} data-testid="day-radios">
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
                        handleChange: handleCustomDaysRadioChange,
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
              <div className={styles.hours} data-testid="hour-radios">
                <Radios
                  {...{
                    label: 'Hours:',
                    options: [
                      {
                        label: 'Every 4 hours',
                        handleChange: handleEveryFourHoursRadioChange,
                      },
                      {
                        label: 'Twice a day',
                        handleChange: handleTwiceADayRadioChange,
                      },
                      {
                        label: 'Custom',
                        handleChange: handleCustomHoursRadioChange,
                      },
                    ],
                    name: 'hourRadios',
                    selectedIndex: hoursOption,
                  }}
                />
                <ButtonGroup
                  {...{
                    values: hours,
                    initialValues: selectedHours,
                    handleChange: handleHoursChange,
                    compact: true,
                  }}
                />
              </div>
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
