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
import EditCurriculum from './pages/Curriculums/Edit';
import Projects from './pages/Projects';
import FormProject from './pages/Projects/Form';
import LaboralExperience from './pages/LaboralExperience';
import FormLaboralExperience from './pages/LaboralExperience/Form';
import AcademicExperience from './pages/AcademicExperience';
import FormAcademicExperience from './pages/AcademicExperience/Form';
import PersonalInfo from './pages/PersonalInfo';
import FormPersonalInfo from './pages/PersonalInfo/Form';
import ProfilePhotos from './pages/ProfilePhotos';

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
          <RouteProtected path="/curriculums/edit/:id" component={EditCurriculum} />
          
          <RouteProtected path="/projects" component={Projects} />
          <RouteProtected path="/projects/create" component={FormProject} />
          <RouteProtected path="/projects/edit/:id" component={FormProject} />

          <RouteProtected path="/laboralexperiences" component={LaboralExperience} />
          <RouteProtected path="/laboralexperiences/create" component={FormLaboralExperience} />
          
          <RouteProtected path="/academicexperiences" component={AcademicExperience} />
          <RouteProtected path="/academicexperiences/create" component={FormAcademicExperience} />
          
          <RouteProtected path="/personalInfo" component={PersonalInfo} />
          <RouteProtected path="/personalInfo/create" component={FormPersonalInfo} />

          <RouteProtected path="/profilePhotos" component={ProfilePhotos} />
          
          {/* <RouteProtected path="/templates" component={Home} /> */}
          <Route><h1>404 - Not found!</h1></Route>
        </Switch>
      </SessionContextProvider>
    </div>
  );
}