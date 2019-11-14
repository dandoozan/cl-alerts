import React from 'react';
import styles from './Header.module.css';

export default function Header(props) {
  return (
    <header className={styles.header}>
      <div className={styles.title}>Craigslist Alerts</div>
      <div className={styles.subtitle}>
        Automatically receive Craigslist results via email.
      </div>
    </header>
  );
}
