import React from 'react';
import HomePageForm from './HomePageForm';
import { render, fireEvent, within, prettyDOM } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { defaultValues } from '../../../../formFields';
import days from '../../../../data/days.json';
import hours from '../../../../data/hours.json';

//tests to make:
//  X-should disable button on submit
//  D-should show error if email is missing
//  D-should show error if email is not valid
//  D-should select all day checkboxes when "Every day" radio button is selected
//  D-should select the "Custom" radio button when any day is selected
//  D-should select the "Custom" radio button when any day is de-selected
//  D-should select every fourth hour when "Every 4 hours" radio button is selected
//  D-should select two hours when "Twice a day" radio button is selected
//  D-should select the "Custom" radio button when any hour is selected
//  D-should select the "Custom" radio button when any hour is de-selected

describe('HomePageForm', () => {
  it('should show error if email is missing', async () => {
    let { getByText, findByText } = render(
      <HomePageForm
        {...{
          initialValues: defaultValues,
          onSubmit: () => {},
        }}
      />
    );

    //click submit
    fireEvent.click(getByText('Submit'));

    expect(await findByText('Please enter a valid email')).toBeInTheDocument();
  });
  it('should show error if email is not valid', async () => {
    let { getByLabelText, getByText, findByText } = render(
      <HomePageForm
        {...{
          initialValues: defaultValues,
          onSubmit: () => {},
        }}
      />
    );

    //@ts-ignore
    fireEvent.change(getByLabelText('Email'), {
      target: { value: 'invalidEmailAddress' },
    });

    //click submit
    fireEvent.click(getByText('Submit'));

    expect(await findByText('Please enter a valid email')).toBeInTheDocument();
  });
  it('should select all day checkboxes when "Every day" radio button is selected', async () => {
    let { getByLabelText, getByTestId } = render(
      <HomePageForm
        {...{
          initialValues: defaultValues,
          onSubmit: () => {},
        }}
      />
    );

    let withinDayRadios = within(getByTestId('day-radios'));

    //select the "custom" radio button
    fireEvent.click(withinDayRadios.getByLabelText('Custom'));

    //uncheck all day checkboxes
    days.forEach(day => {
      //@ts-ignore
      if (getByLabelText(day).checked) {
        fireEvent.click(getByLabelText(day));
      }
    });

    //click the "every day" radio button
    fireEvent.click(getByLabelText('Every day'));

    //verify that all day checkboxes became checked
    days.forEach(day => {
      //@ts-ignore
      expect(getByLabelText(day).checked).toBe(true);
    });
  });
  it('should select the "Custom" radio button when any day is selected', async () => {
    let { getByLabelText, getByTestId } = render(
      <HomePageForm
        {...{
          initialValues: { ...defaultValues, days: [] },
          onSubmit: () => {},
        }}
      />
    );

    let withinDayRadios = within(getByTestId('day-radios'));

    //verify that all day checkboxes are unchecked
    days.forEach(day => {
      //@ts-ignore
      expect(getByLabelText(day).checked).toBe(false);
    });

    //select a day checkbox
    fireEvent.click(getByLabelText(days[0]));

    //verify that the "custom" radio button is selected
    expect(
      //@ts-ignore
      withinDayRadios.getByLabelText('Custom').checked
    ).toBe(true);
  });
  it('should select the "Custom" radio button when any day is de-selected', async () => {
    let { getByLabelText, getByTestId } = render(
      <HomePageForm
        {...{
          initialValues: defaultValues,
          onSubmit: () => {},
        }}
      />
    );

    let withinDayRadios = within(getByTestId('day-radios'));

    //click the "every day" radio button
    fireEvent.click(getByLabelText('Every day'));

    //uncheck a day checkbox
    fireEvent.click(getByLabelText(days[0]));

    //verify that the "custom" radio button is checked
    expect(
      //@ts-ignore
      withinDayRadios.getByLabelText('Custom').checked
    ).toBe(true);
  });

  it('should select every fourth hour when "Every 4 hours" radio button is selected', async () => {
    let { getByLabelText, getByTestId } = render(
      <HomePageForm
        {...{
          initialValues: { ...defaultValues, hours: [] },
          onSubmit: () => {},
        }}
      />
    );

    let withinHourRadios = within(getByTestId('hour-radios'));

    //select the "Custom" radio button
    fireEvent.click(withinHourRadios.getByLabelText('Custom'));

    //verify that all hour checkboxes are unchecked
    hours.forEach((hour, i) => {
      //@ts-ignore
      expect(withinHourRadios.getByDisplayValue(`${i}`).checked).toBe(false);
    });

    //click the "Every 4 hours" radio button
    fireEvent.click(getByLabelText('Every 4 hours'));

    //verify that every fourth hour checkbox became checked
    hours.forEach((hour, i) => {
      //@ts-ignore
      expect(withinHourRadios.getByDisplayValue(`${i}`).checked).toBe(
        (i + 1) % 4 === 0
      );
    });
  });
  it('should select two hours when "Twice a day" radio button is selected', async () => {
    let { getByLabelText, getByTestId } = render(
      <HomePageForm
        {...{
          initialValues: { ...defaultValues, hours: [] },
          onSubmit: () => {},
        }}
      />
    );

    let withinHourRadios = within(getByTestId('hour-radios'));

    //select the "custom" radio button
    fireEvent.click(withinHourRadios.getByLabelText('Custom'));

    //verify all checkboxes are unchecked
    hours.forEach((hour, i) => {
      //@ts-ignore
      expect(withinHourRadios.getByDisplayValue(`${i}`).checked).toBe(false);
    });

    //click the "Twice a day" radio button
    fireEvent.click(getByLabelText('Twice a day'));

    //verify that two checkboxes became selected
    let numHoursSelected = hours.reduce(
      (count, hour, i) =>
        //@ts-ignore
        count + (withinHourRadios.getByDisplayValue(`${i}`).checked ? 1 : 0),
      0
    );
    expect(numHoursSelected).toBe(2);
  });
  it('should select the "Custom" radio button when any hour is selected', async () => {
    let { getByLabelText, getByTestId } = render(
      <HomePageForm
        {...{
          initialValues: defaultValues,
          onSubmit: () => {},
        }}
      />
    );

    let withinHourRadios = within(getByTestId('hour-radios'));

    //select "Every 4 hours" radio button (to make sure "Custom" is not already selected)
    fireEvent.click(getByLabelText('Every 4 hours'));

    //select an hour checkbox
    for (let i = 0; i < hours.length; i++) {
      let radio = withinHourRadios.getByDisplayValue(`${i}`);
      //@ts-ignore
      if (!radio.checked) {
        fireEvent.click(radio);
        break;
      }
    }

    //verify that the "custom" radio button is selected
    expect(
      //@ts-ignore
      withinHourRadios.getByLabelText('Custom').checked
    ).toBe(true);
  });
  it('should select the "Custom" radio button when any hour is de-selected', async () => {
    let { getByLabelText, getByTestId } = render(
      <HomePageForm
        {...{
          initialValues: defaultValues,
          onSubmit: () => {},
        }}
      />
    );

    let withinHourRadios = within(getByTestId('hour-radios'));

    //select "Every 4 hours" radio button (to make sure "Custom" is not already selected)
    fireEvent.click(getByLabelText('Every 4 hours'));

    //uncheck an hour checkbox
    for (let i = 0; i < hours.length; i++) {
      let radio = withinHourRadios.getByDisplayValue(`${i}`);
      //@ts-ignore
      if (radio.checked) {
        fireEvent.click(radio);
        break;
      }
    }

    //verify that the "custom" radio button is selected
    expect(
      //@ts-ignore
      withinHourRadios.getByLabelText('Custom').checked
    ).toBe(true);
  });
});
