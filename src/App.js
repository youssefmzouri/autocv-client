import 'fontsource-roboto';
import './App.css';
import React from 'react';
import {Route} from 'wouter';
import RouteProtected from './components/RouteProtected';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Header from './components/Header';
import {SessionContextProvider} from './context/SessionContext';
import Welcome from './pages/Welcome';


export default function App() {
  // const user = JSON.parse(window.localStorage.getItem('loggedAutoCvAppUser')) || null;
  
  return (
    <div className="App">
      <SessionContextProvider>
        <Header/>
        <Route path="/" component={Welcome} />
        <Route path="/auth" component={Auth} />
        <Route path="/login" component={Auth} />
        <Route path="/register" component={Auth} />
        <RouteProtected path="/home" component={Home} />
        <Route>404 - Not found!</Route>
      </SessionContextProvider>
    </div>
  );
}