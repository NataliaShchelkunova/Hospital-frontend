import React from "react";
import { Redirect, Route, Switch } from "react-router";
import RegistrationFormComponent from "./components/RegistrationComponent/RegistrationComponent";

import "./App.css";

const App = () => {
  return (
    <div>
      <Switch>
        <Route path="/registration">
          <RegistrationFormComponent />
        </Route>
   
        <Redirect from="/" to="/registration"></Redirect>
      </Switch>
    </div>
  );
};

export default App;
