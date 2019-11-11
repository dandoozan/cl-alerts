import React, { useState } from 'react';
import styles from './HomePage.module.css';
import { Link } from 'react-router-dom';
import { addAlert } from '../../database';
import HomePageForm from '../HomePageForm';
import SubmitError from '../SubmitError';
import { Modal, Button } from 'react-bootstrap';
import { defaultValues } from '../../formFields';

export default function HomePage(props) {
  let [alertData, setAlertData] = useState<any>({});
  let [submitError, setSubmitError] = useState(false);
  let [showModal, setShowModal] = useState(false);

  async function onSubmit(formValues, { setSubmitting }) {
    setSubmitError(false);
    let id = await addAlert(formValues);
    if (id) {
      setAlertData({ id, ...formValues });
      setShowModal(true);
    } else {
      setSubmitError(true);
    }
    setSubmitting(false);
  }

  function hideModal() {
    setShowModal(false);
  }

  return (
    <div className={styles.homePage}>
      <h2 className={styles.header}>Search Craigslist</h2>
      <HomePageForm initialValues={defaultValues} onSubmit={onSubmit} />
      {submitError && (
        <div className="text-sm-right">
          <SubmitError />
        </div>
      )}

      <Modal centered={true} show={showModal} onHide={hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Success!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p>
              An alert has been created for <strong>{alertData.email}.</strong>
            </p>
            <p>
              You will automatically receive new craigslist results in your
              inbox according to the specified schedule.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Link to={`/alert?id=${alertData.id}`}>
            <Button variant="secondary">View/Edit this alert</Button>
          </Link>
          <Button variant="primary" onClick={hideModal}>
            Done
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
