import React, { useState } from 'react';
import styles from './HomePage.module.css';
import { Link } from 'react-router-dom';
import { addAlert } from '../../database';
import HomePageForm from '../HomePageForm';
import SubmitError from '../SubmitError';
import { Modal } from 'react-bootstrap';
import defaultValues from '../../formDefaultValues';

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
      <h2 className="text-center">Search Craigslist</h2>
      <HomePageForm initialValues={defaultValues} onSubmit={onSubmit} />
      {submitError && <SubmitError />}

      <Modal show={showModal} onHide={hideModal}>
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
              inbox according to the schedule you specified.
            </p>
          </div>
          <Link to={`/alert?id=${alertData.id}`}>View/Edit this alert</Link>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
}
