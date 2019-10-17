import React from 'react';
import AlertPage from './AlertPage';
import {
  render,
  fireEvent,
  waitForElementToBeRemoved,
  wait,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import * as db from '../../database';

//tests to make:
//  D-should render alert data
//  D-should redirect to homepage when id is invalid
//  D-should call database.updateAlert on edit submit
//  D-should show message after edit is done
//  D-should show error message if edit failed
//  X-should show successful edit msg even if no changes were made in the form
//  -should call database.delete on delete
//  -should redirect to homepage when delete is successful
//  -should show error message if delete failed
//  -should
//  -

const MOCK_ALERT_ID = 'ALERT_ID';
const MOCK_ALERT_DATA = {
  searchTerm: 'test',
};

jest.mock('../../database');

beforeEach(() => {
  //@ts-ignore
  db.getAlert = jest.fn(() => MOCK_ALERT_DATA);
  //@ts-ignore
  db.updateAlert = jest.fn(() => true);
});

it('should render alert data', async () => {
  let { findByLabelText } = render(
    <MemoryRouter initialEntries={[`/alert?id=${MOCK_ALERT_ID}`]}>
      <AlertPage />
    </MemoryRouter>
  );

  //@ts-ignore
  expect((await findByLabelText('Search Term')).value).toBe(
    MOCK_ALERT_DATA.searchTerm
  );
});

it('should redirect to homepage when id is invalid', async () => {
  //return undefined to mimic that getAlert failed
  //@ts-ignore
  db.getAlert = jest.fn();

  let { getByText } = render(
    <MemoryRouter initialEntries={[`/alert?id=${MOCK_ALERT_ID}`]}>
      <AlertPage />
    </MemoryRouter>
  );

  //first, make sure that "Edit Alert" is in the document as expected
  expect(getByText('Edit Alert')).toBeInTheDocument();

  //now, make sure it's removed, which means the redirect happened
  await waitForElementToBeRemoved(() => getByText('Edit Alert'));
});
it('should call database.updateAlert on edit submit', async () => {
  let { getByText, findByText } = render(
    <MemoryRouter initialEntries={[`/alert?id=${MOCK_ALERT_ID}`]}>
      <AlertPage />
    </MemoryRouter>
  );

  let submitButton = await findByText('Save changes');
  fireEvent.click(submitButton);

  //wait for the submit button to become enabled again
  await wait(() =>
    expect(getByText('Save changes')).not.toHaveAttribute('disabled')
  );

  expect(db.updateAlert).toHaveBeenCalledTimes(1);
  //@ts-ignore (ignore because TS gives error: "Property 'mock' does not exist on type...")
  expect(db.updateAlert.mock.calls[0]).toMatchObject([
    MOCK_ALERT_ID,
    MOCK_ALERT_DATA,
  ]);
});
it('should show message after edit is done', async () => {
  let { findByText } = render(
    <MemoryRouter initialEntries={[`/alert?id=${MOCK_ALERT_ID}`]}>
      <AlertPage />
    </MemoryRouter>
  );

  let submitButton = await findByText('Save changes');
  fireEvent.click(submitButton);

  expect(await findByText('Successfully editted!')).toBeInTheDocument();
});
it('should show error message if edit failed', async () => {
  //@ts-ignore
  db.updateAlert = jest.fn(() => false);

  let { findByText } = render(
    <MemoryRouter initialEntries={[`/alert?id=${MOCK_ALERT_ID}`]}>
      <AlertPage />
    </MemoryRouter>
  );

  let submitButton = await findByText('Save changes');
  fireEvent.click(submitButton);

  expect(await findByText('Oops', { exact: false })).toBeInTheDocument();
});
