import 'fontsource-roboto';
import './App.css';
import React from 'react';
import {Route, Switch} from 'wouter';
import RouteProtected from './components/RouteProtected';
import Home from './pages/Home';
import Auth from './pages/Auth';
import {SessionContextProvider} from './context/SessionContext';
import Welcome from './pages/Welcome';
import MyProfile from './pages/MyProfile';
import Curriculums from './pages/Curriculums';
import CreateCurriculum from './pages/Curriculums/Create';
import Projects from './pages/Projects';
import FormProject from './pages/Projects/Form';

export default function App() {
  return (
    <div className="App">
      <SessionContextProvider>
        <Switch>
          <Route path="/" component={Welcome} />
          <Route path="/auth" component={Auth} />
          <Route path="/login" component={Auth} />
          <Route path="/register" component={Auth} />
          <RouteProtected path="/profile" component={MyProfile} />
          <RouteProtected path="/home" component={Home} />
          
          <RouteProtected path="/curriculums" component={Curriculums} />
          <RouteProtected path="/curriculums/create" component={CreateCurriculum} />
          
          <RouteProtected path="/projects" component={Projects} />
          <RouteProtected path="/projects/create" component={FormProject} />
          <RouteProtected path="/projects/edit/:id" component={FormProject} />

          <RouteProtected path="/personalInfo" component={Home} />
          <RouteProtected path="/profilePhotos" component={Home} />
          <RouteProtected path="/laboralExperience" component={Home} />
          <RouteProtected path="/academicExperience" component={Home} />
          
          <RouteProtected path="/templates" component={Home} />
          
          <Route><h1>404 - Not found!</h1></Route>
        </Switch>
      </SessionContextProvider>
    </div>
  );
}