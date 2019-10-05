import React from 'react';
import styles from './App.module.css';
import Header from '../Header';
import SearchForm from '../SearchForm';

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <SearchForm />
    </div>
  );
}

export default App;
