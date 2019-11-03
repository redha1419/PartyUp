import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import VerifyHostPage from '../Components/VerifyHostPage';
import HomePage from '../Components/HomePage';
import UserPage from '../Components/UserPage';
//import HelpPage from '../components/HelpPage';
//import NotFoundPage from '../components/NotFoundPage';
//import Header from '../components/Header';
import TokenContextProvider from '../contexts/TokenContext';

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Switch>
      <TokenContextProvider>
        <Route path="/" component={HomePage} exact={true}/>
        <Route path="/verify" component={VerifyHostPage} />
        <Route path="/user" component={UserPage} />
        </TokenContextProvider>
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
