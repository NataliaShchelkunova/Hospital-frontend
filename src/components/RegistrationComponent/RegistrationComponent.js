import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import logo from "../../icons/Vector.svg";
import image from "../../icons/image.svg";
import "./RegistrationComponent.scss";

const RegistrationFormComponent = () => {
  const history = useHistory();
  const regExLogin = /(\w+).{6}/;
  const regExPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{1,}$/;
  const [open, setOpen] = useState({ stateSnackbar: false, message: "" });
  const { stateSnackbar, message } = open;

  const checkPass = "Check password";
  const checkLogin = "Check login";
  const checkPasswords = "Check passwords";

  const booleanLoginFunction = () => {
    setOpen({
      stateSnackbar: true,
      message: checkLogin,
    });
  };

  const booleanPasswordFunction = () => {
    setOpen({
      stateSnackbar: true,
      message: checkPass,
    });
  };

  const checkPasswordFunction = () => {
    setOpen({
      stateSnackbar: true,
      message: checkPasswords,
    });
  };

  const errorRegistration = () => {
    setOpen({
      stateSnackbar: true,
      message: "user registration error",
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const registrationPage = () => {
    history.push("/autorisation");
  };

  const getDataForms = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formLogin = formData.get("login").trim();
    const formPassword = formData.get("password");
    const formPasswordRepeat = formData.get("passwordRepeat");
    if (regExLogin.test(formLogin)) {
      if (regExPassword.test(formPassword)) {
        if (formPassword === formPasswordRepeat) {
          try {
            await axios
              .post("http://localhost:9000/registration", {
                username: formLogin,
                password: formPassword,
              })
              .then((res) => {
                registrationPage();
              });
          } catch (error) {
            errorRegistration(error);
          }
        } else {
          checkPasswordFunction();
        }
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
        <h1 className="header-text"> Зарегистрироваться в системе </h1>
      </header>
      <div className="body">
        <div className="image-conainer">
          <img alt="" src={image} />
        </div>
        <div className="container-for-registration">
          <div className="registration-conainer">
            <h1>Регистрация </h1>
            <div className="form-container">
              <form onSubmit={getDataForms}>
                <label>Login: </label>
                <input type="text" placeholder="login" name="login" />
                <label>Password: </label>
                <input type="password" placeholder="password" name="password" />
                <label>Repeat Password:</label>
                <input
                  type="password"
                  placeholder="Password"
                  name="passwordRepeat"
                />
                <div className="button-and-text-conainer">
                  <button>Зарегистрироваться</button>
                  <h4>Авторизоваться</h4>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Snackbar
        open={stateSnackbar}
        autoHideDuration={3000}
        onClose={() => handleClose()}
        message={message}
      />
    </div>
  );
};

export default RegistrationFormComponent;
