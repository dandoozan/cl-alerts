import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styles from './App.module.css';
import Header from '../Header';
import AlertPage from '../AlertPage';
import HomePage from '../HomePage';
import SuccessPage from '../SuccessPage';

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <section className={styles.main}>
        <Switch>
          <Route path="/success" component={SuccessPage} />
          <Route path="/alert" component={AlertPage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </section>
    </div>
  );
}

export default App;
