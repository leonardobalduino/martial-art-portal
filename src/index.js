import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.10.0";

// pages for this product
import Components from "views/Components/Components.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import MainPage from "views/MainPage/MainPage.js";
import GraduationPage from "views/GraduationPage/GraduationPage.js";

// pages for manager
import ManagerPage from "views/Manager/MainPage/MainPages.js";
import PersonListSection from "views/Manager/Sections/PersonListSection.js";
import PersonFormSection from "views/Manager/Sections/PersonFormSection.js";
import GraduationListSection from "views/Manager/Sections/GraduationListSection.js";
import GraduationFormSection from "views/Manager/Sections/GraduationFormSection.js";

var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/landing-page" component={LandingPage} />
      <Route path="/profile-page" component={ProfilePage} />
      <Route path="/login-page" component={LoginPage} />
      <Route path="/graduation-page" component={GraduationPage} />
      <Route path="/component" component={Components} />

      <Route
        path="/manager/personList"
        render={(props) => (
          <ManagerPage {...props} content={<PersonListSection />} />
        )}
      />

      <Route
        path="/manager/personForm/:id"
        render={(props) => (
          <ManagerPage {...props} content={<PersonFormSection />} />
        )}
      />

      <Route
        path="/manager/personForm"
        render={(props) => (
          <ManagerPage {...props} content={<PersonFormSection />} />
        )}
      />

      <Route
        path="/manager/graduationList"
        render={(props) => (
          <ManagerPage {...props} content={<GraduationListSection />} />
        )}
      />

      <Route
        path="/manager/graduationForm/:id"
        render={(props) => (
          <ManagerPage {...props} content={<GraduationFormSection />} />
        )}
      />

      <Route
        path="/manager/graduationForm"
        render={(props) => (
          <ManagerPage {...props} content={<GraduationFormSection />} />
        )}
      />

      <Route path="/manager" component={ManagerPage} />
      <Route path="/" component={MainPage} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
