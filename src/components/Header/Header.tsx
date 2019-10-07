import React from 'react';
import styles from './Header.module.css';

interface Props {}

export default function Header({  }: Props) {
  return (
    <header className={styles.header}>
      <div className={styles.title}>Craigslist Alerts</div>
      <div className={styles.subtitle}>
        Automatically receive craigslist results via email.
      </div>
    </header>
  );
}
