import React from 'react';
import AlertPage from './AlertPage';
import {
  render,
  fireEvent,
  waitForElementToBeRemoved,
  wait,
  waitForElement,
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
//  D-should call database.delete on delete
//  D-should redirect to homepage when delete is successful
//  D-should show error message if delete failed
//  D-should show error if email is missing
//  D-should show error if email is not valid
//  -should

describe('AlertPage', () => {
  const MOCK_ALERT_ID = 'ALERT_ID';
  const MOCK_ALERT_DATA = {
    city: 'Phoenix',
    email: 'test@example.com',
  };

  jest.mock('../../database');

  beforeEach(() => {
    //@ts-ignore
    db.getAlert = jest.fn(() => MOCK_ALERT_DATA);
    //@ts-ignore
    db.updateAlert = jest.fn(() => true);
    //@ts-ignore
    db.deleteAlert = jest.fn(() => true);
  });

  it('should render alert data', async () => {
    let { findByLabelText } = render(
      <MemoryRouter initialEntries={[`/alert?id=${MOCK_ALERT_ID}`]}>
        <AlertPage />
      </MemoryRouter>
    );

    //@ts-ignore
    expect((await findByLabelText('Email')).value).toBe(MOCK_ALERT_DATA.email);
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
    let { findByText } = render(
      <MemoryRouter initialEntries={[`/alert?id=${MOCK_ALERT_ID}`]}>
        <AlertPage />
      </MemoryRouter>
    );

    let submitButton = await findByText('Save changes');
    fireEvent.click(submitButton);

    //wait for the submit button to become enabled again
    await wait(() => expect(submitButton).not.toHaveAttribute('disabled'));

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

    fireEvent.click(await findByText('Save changes'));

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

    fireEvent.click(await findByText('Save changes'));

    expect(await findByText('Oops', { exact: false })).toBeInTheDocument();
  });

  it('should call database.delete on delete', async () => {
    let { findByText, getByText } = render(
      <MemoryRouter initialEntries={[`/alert?id=${MOCK_ALERT_ID}`]}>
        <AlertPage />
      </MemoryRouter>
    );

    fireEvent.click(await findByText('Delete'));

    //wait for the modal to show up
    await waitForElement(() =>
      getByText('Are you sure you want to delete this alert?')
    );
    fireEvent.click(getByText('Yes, delete it'));

    //wait for the redirect to homepage
    await waitForElementToBeRemoved(() => getByText('Delete'));

    expect(db.deleteAlert).toHaveBeenCalledTimes(1);
    //@ts-ignore (ignore because TS gives error: "Property 'mock' does not exist on type...")
    expect(db.deleteAlert.mock.calls[0][0]).toBe(MOCK_ALERT_ID);
  });
  it('should redirect to homepage when delete is successful', async () => {
    let { findByText, getByText } = render(
      <MemoryRouter initialEntries={[`/alert?id=${MOCK_ALERT_ID}`]}>
        <AlertPage />
      </MemoryRouter>
    );

    fireEvent.click(await findByText('Delete'));

    //wait for the modal to show up
    await waitForElement(() =>
      getByText('Are you sure you want to delete this alert?')
    );
    fireEvent.click(getByText('Yes, delete it'));

    //wait for the redirect to homepage
    await waitForElementToBeRemoved(() => getByText('Delete'));
  });
  it('should show error message if delete failed', async () => {
    //@ts-ignore
    db.deleteAlert = jest.fn(() => false);

    let { findByText, getByText } = render(
      <MemoryRouter initialEntries={[`/alert?id=${MOCK_ALERT_ID}`]}>
        <AlertPage />
      </MemoryRouter>
    );

    fireEvent.click(await findByText('Delete'));

    //wait for the modal to show up
    await waitForElement(() =>
      getByText('Are you sure you want to delete this alert?')
    );
    fireEvent.click(getByText('Yes, delete it'));

    expect(await findByText('Oops', { exact: false })).toBeInTheDocument();
  });

  it('should show error if email is missing', async () => {
    let { findByLabelText, findByText } = render(
      <MemoryRouter initialEntries={[`/alert?id=${MOCK_ALERT_ID}`]}>
        <AlertPage />
      </MemoryRouter>
    );

    //remove email
    //@ts-ignore
    fireEvent.change(await findByLabelText('Email'), {
      target: { value: '' },
    });

    //click submit
    fireEvent.click(await findByText('Save changes'));

    expect(await findByText('Please enter a valid email')).toBeInTheDocument();
  });
  it('should show error if email is not valid', async () => {
    let { findByLabelText, findByText } = render(
      <MemoryRouter initialEntries={[`/alert?id=${MOCK_ALERT_ID}`]}>
        <AlertPage />
      </MemoryRouter>
    );

    //set email to an invalid email address
    //@ts-ignore
    fireEvent.change(await findByLabelText('Email'), {
      target: { value: 'invalidEmailAddress' },
    });

    //click submit
    fireEvent.click(await findByText('Save changes'));

    expect(await findByText('Please enter a valid email')).toBeInTheDocument();
  });
});
