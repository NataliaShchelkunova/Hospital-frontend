import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import logo from "../../icons/Vector.svg";
import image from "../../icons/image.svg";
import "./autorisationComponent.scss";

const AutorisationFormComponent = () => {
  let history = useHistory();
  const regExLogin = /(\w+).{6}/;
  const regExPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{1,}$/;
  const [open, setOpen] = useState(false);
  const [messages, setMessage] = useState("");

  const checkPass = "Check password";
  const checkLogin = "Check login";

  const booleanLoginFunction = () => {
    setOpen(true);
    setMessage(checkLogin);
  };
  const booleanPasswordFunction = () => {
    setOpen(true);
    setMessage(checkPass);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getDataForms = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    const formLogin = formData.get("Login").trim();
    const formPassword = formData.get("password");

    if (regExLogin.test(formLogin)) {
      if (regExPassword.test(formPassword)) {
        // axios
        //   .post("http://localhost:8000/createUser", {
        //     formData,
        //   })
        //   .then((res) => {
        //     formData = new FormData("");
        //     registrationPage();
        //   });
        console.log("okey");
      } else {
        booleanPasswordFunction();
      }
    } else {
      booleanLoginFunction();
    }
  };

  return (
    <div>
      <header>
        <img alt="" src={logo} />
        <h1 className="header-text">Войти в систему </h1>
      </header>
      <div className="body">
        <div className="image-conainer">
          <img alt="" src={image} />
        </div>
        <div className="container-for-autorisation">
          <div className="autorisation-conainer">
            <h1>Войти в систему </h1>
            <div className="form-container">
              <form onSubmit={getDataForms}>
                <label>Login: </label>
                <input type="text" placeholder="Login" name="Login" />
                <label>Password: </label>
                <input type="password" placeholder="Password" name="password" />
                <label>Repeat Password:</label>
                <div className="button-and-text-conainer">
                  <button>Войти</button>
                  <h4>Зарегистрироваться</h4>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => handleClose()}
        message={messages}
      />
    </div>
  );
};

export default AutorisationFormComponent;
