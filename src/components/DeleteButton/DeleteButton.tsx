import React, { useState } from 'react';
// import styles from './DeleteButton.module.css';
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router';
import { deleteAlert } from '../../database';

export default function DeleteButton(props) {
  let { alertId } = props;
  let [isDeleted, setIsDeleted] = useState(false);

  async function handleClick(e) {
    console.log('delete alert');
    await deleteAlert(alertId);
    setIsDeleted(true);
  }

  if (isDeleted) {
    return <Redirect push to="/" />;
  }
  return (
    <Button variant="danger" onClick={handleClick}>
      Delete
    </Button>
  );
}
