import React, { useEffect } from 'react';
import './App.css';
import { Switch, Route, Redirect } from "react-router-dom";
import { LoginContainer as Login } from './containers/Auth';
import { Layout } from './components/Layout/Layout';
import { Container } from 'react-bootstrap';



function App() {

  return (
    <Container fluid>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/main/dashboard" />} />
        <Route exact path="/main" render={() => <Redirect to="/main/dashboard" />} />
        <Route path="/main" component={Layout} />
        <Route path="/login" component={Login} />
      </Switch>
    </Container>

  );
}

export default App;
