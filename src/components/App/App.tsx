import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styles from './App.module.css';
import Header from '../Header';
import CreatePage from '../CreatePage';
import HomePage from '../HomePage';

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <section className={styles.main}>
        <Switch>
          <Route path="/create">
            <CreatePage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </section>
    </div>
  );
}

export default App;
