import React from 'react';
import styles from './SuccessPage.module.css';
import { Link } from 'react-router-dom';

export default function SuccessPage(props) {
  let otherProps = props.location.state;
  let { city, searchTerm, email, alertId } = otherProps;
  return (
    <div className={styles.successPage}>
      <h2>Success!</h2>
      <h4>
        A new alert has been created for <strong>{email}</strong>.
      </h4>
      <p>
        You will automatically receive new craigslist results according to the
        schedule you specified.
      </p>
      <h4>Alert details</h4>

      {/* TODO: make this a bootstrap table */}
      <table>
        <tbody>
          {/* TODO: create these by mapping over formItems */}
          <tr>
            <td>City</td>
            <td>{city}</td>
          </tr>
          <tr>
            <td>Search term</td>
            <td>{searchTerm}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{email}</td>
          </tr>
        </tbody>
      </table>
      <Link to={`/alert?id=${alertId}`}>Edit this alert</Link>
    </div>
  );
}
