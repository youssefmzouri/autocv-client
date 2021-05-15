import 'fontsource-roboto';
import './App.css';
import React from 'react';
import {Route, Switch} from 'wouter';
import RouteProtected from './components/RouteProtected';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Header from './components/Header';
import {SessionContextProvider} from './context/SessionContext';
import Welcome from './pages/Welcome';
import MyProfile from './pages/MyProfile';


export default function App() {
  return (
    <div className="App">
      <SessionContextProvider>
        <Header/>
        <Switch>
          <Route path="/" component={Welcome} />
          <Route path="/auth" component={Auth} />
          <Route path="/login" component={Auth} />
          <Route path="/register" component={Auth} />
          <RouteProtected path="/profile" component={MyProfile} />
          <RouteProtected path="/home" component={Home} />
          <Route><h1>404 - Not found!</h1></Route>
        </Switch>
      </SessionContextProvider>
    </div>
  );
}