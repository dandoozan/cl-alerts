import React from 'react';
import HomePageForm from './HomePageForm';
import { render, fireEvent, prettyDOM } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { defaultValues } from '../../formFields';

//tests to make:
//  X-should disable button on submit
//  D-should show error if email is missing
//  D-should show error if email is not valid
//  -should select all day checkboxes when "every day" radio button is checked
//  -should check the "custom" radio button when any day is de-selected
//  -should have "every day" radio button initially checked
//  -should have all day checkboxes initially checked
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
});
