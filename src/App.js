import React from "react";
import { Redirect, Route, Switch } from "react-router";
import RegistrationFormComponent from "./components/RegistrationComponent/RegistrationComponent";
import AutorisationFormComponent from "./components/autorisationComponent/autorisationComponent";
import "./App.css";

const App = () => {
  return (
    <div>
      <Switch>
        <Route path="/registration">
          <RegistrationFormComponent />
        </Route>
        <Route path="/autorisation">
          {" "}
          <AutorisationFormComponent />{" "}
        </Route>
        <Redirect from="/" to="/registration"></Redirect>
      </Switch>
    </div>
  );
};

export default App;
