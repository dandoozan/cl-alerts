import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styles from './App.module.css';
import Header from '../Header';
import EditPage from '../EditPage';
import HomePage from '../HomePage';
import CreatePage from '../CreatePage';

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <section className={styles.main}>
        <Switch>
          <Route path="/create" component={CreatePage} />
          <Route path="/edit" component={EditPage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </section>
    </div>
  );
}

export default App;
