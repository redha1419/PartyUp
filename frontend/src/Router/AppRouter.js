import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import VerifyHostPage from '../Components/VerifyHostPage';
import HomePage from '../Components/HomePage';
import UserPage from '../Components/UserPage';
import DashboardPage from '../Components/Tabs';
import TokenContextProvider from '../contexts/TokenContext';

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Switch>
      <TokenContextProvider>
        <Route path="/" component={HomePage} exact={true}/>
        <Route path="/verify" component={VerifyHostPage} />
        <Route path="/user" component={UserPage} />
        <Route path="/dashboard" component={DashboardPage} />
        </TokenContextProvider>
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
