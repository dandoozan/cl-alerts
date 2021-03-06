import React, { useEffect, useState } from 'react';
// import styles from './AlertPage.module.css';
import { useLocation, Redirect } from 'react-router-dom';
import { updateAlert, getAlert, deleteAlert } from '../../../database';
import EditForm from './EditForm';
import SubmitError from '../../other/SubmitError';
import { Button, Modal, Spinner, Fade } from 'react-bootstrap';
import { defaultValues } from '../../../formFields';

export default function AlertPage(props) {
  let [alertData, setAlertData] = useState<any>(null);
  let [isEditted, setIsEditted] = useState(false);
  let [editError, setEditError] = useState(false);
  let [isDeleted, setIsDeleted] = useState(false);
  let [deleteError, setDeleteError] = useState(false);
  let [invalidAlertId, setInvalidAlertId] = useState(false);
  let [showModal, setShowModal] = useState(false);

  let query = new URLSearchParams(useLocation().search);
  let alertId = query.get('id');

  async function onSubmit(formValues, { setSubmitting }) {
    setEditError(false);
    if (await updateAlert(alertId, formValues)) {
      setAlertData(formValues);
      setIsEditted(true);
    } else {
      setEditError(true);
    }
    setSubmitting(false);
  }

  async function handleDeleteClick() {
    setDeleteError(false);
    setShowModal(true);
  }

  async function handleModalAccept() {
    setShowModal(false);
    if (await deleteAlert(alertId)) {
      setIsDeleted(true);
    } else {
      setDeleteError(true);
    }
  }

  function handleModalReject() {
    setShowModal(false);
  }

  //fetch the alert from the database
  useEffect(() => {
    let ignore = false;

    (async () => {
      if (alertId) {
        let data = await getAlert(alertId);
        if (data) {
          if (!ignore) {
            setAlertData({ ...defaultValues, ...data });
          }
        } else {
          setInvalidAlertId(true);
        }
      } else {
        setInvalidAlertId(true);
      }
    })();

    return () => {
      ignore = true;
    };
  }, [alertId]);

  //Make the successful edit message hide after some time
  useEffect(() => {
    let ignore = false;

    if (isEditted) {
      setTimeout(() => {
        if (!ignore) {
          setIsEditted(false);
        }
      }, 5000);
    }
    return () => {
      ignore = true;
    };
  }, [isEditted]);

  if (invalidAlertId || isDeleted) {
    return <Redirect push to="/" />;
  } else {
    return (
      <div>
        <h2>Manage Alert</h2>
        <div className="mb-4">
          {alertData ? (
            <>
              <p className="mb-5 h4 font-weight-normal">
                User: <span>{alertData.email}</span>
              </p>
              <h3 className="mb-3">Edit</h3>
              <div className="ml-sm-3">
                <EditForm initialValues={alertData} onSubmit={onSubmit} />
                {editError && <SubmitError />}
                <Fade in={isEditted}>
                  <p className="mt-1">Successfully editted!</p>
                </Fade>
              </div>

              <h3 className="mt-4 mb-4">Delete</h3>
              <div className="ml-sm-3">
                <Button variant="danger" size="lg" onClick={handleDeleteClick}>
                  Delete Alert
                </Button>
                {deleteError && <SubmitError />}
              </div>

              <Modal show={showModal} onHide={handleModalReject}>
                <Modal.Header closeButton>
                  <Modal.Title>Delete Alert</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Are you sure you want to delete this alert?
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleModalReject}>
                    No, cancel
                  </Button>
                  <Button variant="primary" onClick={handleModalAccept}>
                    Yes, delete it
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          ) : (
            <div className="text-center m-5">
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
          )}
        </div>
      </div>
    );
  }
}
