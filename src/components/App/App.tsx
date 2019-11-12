import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styles from './App.module.css';
import Header from '../other/Header';
import AlertPage from '../pages/AlertPage';
import HomePage from '../pages/HomePage';

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <section className={styles.main}>
        <div className={styles.inner}>
          <Switch>
            <Route path="/alert" component={AlertPage} />
            <Route path="/" component={HomePage} />
          </Switch>
        </div>
      </section>
    </div>
  );
}

export default App;
