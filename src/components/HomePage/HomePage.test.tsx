import React from 'react';
import HomePage from './HomePage';
import {
  render,
  fireEvent,
  wait,
  waitForElement,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import * as db from '../../database';
import { BrowserRouter } from 'react-router-dom';

//tests to make:
//  D-should call database.addAlert on submit
//  X-should disable button on submit
//  D-should show modal after submit
//  D-should show error message if addAlert failed
//  X-should re-enable submit button if addAlert failed
//  X-should hide error message when clicking submit after a failed submit
//  -should not submit if email is not valid
//  -should
//  -should
//  -should

beforeEach(() => {
  //@ts-ignore
  db.addAlert = jest.fn();
});

it('should call database.addAlert on submit', async () => {
  let { getByText } = render(
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  );

  let submitButton = getByText('Submit');
  fireEvent.click(submitButton);

  //wait for the submit button to become enabled again
  await wait(() => expect(getByText('Submit')).not.toHaveAttribute('disabled'));

  expect(db.addAlert).toHaveBeenCalledTimes(1);
  //@ts-ignore (ignore because TS gives error: "Property 'mock' does not exist on type...")
  expect(db.addAlert.mock.calls[0]).toMatchSnapshot();
});
it('should show modal after submit', async () => {
  //@ts-ignore
  db.addAlert = jest.fn(() => 'ALERT_ID');

  let { getByText } = render(
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  );

  let submitButton = getByText('Submit');
  fireEvent.click(submitButton);

  //wait for the success modal
  await waitForElement(() => getByText('Success!'));
});
it('should show error message if addAlert failed', async () => {
  let { getByText } = render(
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  );

  let submitButton = getByText('Submit');
  fireEvent.click(submitButton);

  //wait for the submit button to become enabled again
  await wait(() => expect(getByText('Submit')).not.toHaveAttribute('disabled'));

  expect(getByText('Oops', { exact: false })).toBeInTheDocument();
});
