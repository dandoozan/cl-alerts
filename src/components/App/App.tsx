import React from 'react';
import styles from './App.module.css';
import Header from '../Header';
import Form from '../Form';

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <Form />
    </div>
  );
}

export default App;
