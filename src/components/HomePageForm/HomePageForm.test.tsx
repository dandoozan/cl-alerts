import React from 'react';
import HomePageForm from './HomePageForm';
import { render, fireEvent, prettyDOM } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { defaultValues } from '../../formFields';
import days from '../../data/days.json';

//tests to make:
//  X-should disable button on submit
//  D-should show error if email is missing
//  D-should show error if email is not valid
//  D-should select all day checkboxes when "every day" radio button is checked
//  D-should select the "custom" radio button when any day is de-selected
//  -should

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

    expect(await findByText('Email is required')).toBeInTheDocument();
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

    expect(await findByText('Email must be a valid email')).toBeInTheDocument();
  });
  it('should select all day checkboxes when "every day" radio button is checked', async () => {
    let { getByLabelText } = render(
      <HomePageForm
        {...{
          initialValues: defaultValues,
          onSubmit: () => {},
        }}
      />
    );

    //check the "custom" radio button
    fireEvent.click(getByLabelText('Custom'));

    //uncheck all day checkboxes
    days.forEach(day => {
      //@ts-ignore
      if (getByLabelText(day).checked === true) {
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
  it('should select the "custom" radio button when any day is de-selected', async () => {
    let { getByLabelText } = render(
      <HomePageForm
        {...{
          initialValues: defaultValues,
          onSubmit: () => {},
        }}
      />
    );

    //click the "every day" radio button
    fireEvent.click(getByLabelText('Every day'));

    //uncheck a day checkbox
    fireEvent.click(getByLabelText(days[0]));

    //verify that the "custom" radio button is checked
    //@ts-ignore
    expect(getByLabelText('Custom').checked).toBe(true);
  });
});
