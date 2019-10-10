import React from 'react';
import styles from './CreatePage.module.css';
import { Link } from 'react-router-dom';

export default function CreatePage(props) {
  let formItems = props.location.state;
  let { city, searchTerm, email } = formItems;
  return (
    <div className={styles.createPage}>
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
      <Link to="/manage">Edit this alert</Link>
    </div>
  );
}
