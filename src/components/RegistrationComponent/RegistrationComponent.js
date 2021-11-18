import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import logo from "../../icons/Vector.svg";
import image from "../../icons/image.svg";
import "./RegistrationComponent.scss";

const RegistrationFormComponent = () => {
  let history = useHistory();
  const regExLogin = /(\w+).{6}/;
  const regExPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{1,}$/;
  const [open, setOpen] = useState(false);
  const [messages, setMessage] = useState("");

  const checkPass = "Check password";
  const checkLogin = "Check login";
  const checkPasswords = "Check passwords";

  const booleanLoginFunction = () => {
    setOpen(true);
    setMessage(checkLogin);
  };
  const booleanPasswordFunction = () => {
    setOpen(true);
    setMessage(checkPass);
  };
  const checkPasswordFunction = () => {
    setOpen(true);
    setMessage(checkPasswords);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const registrationPage = () => {
    history.push("/registration");
  };

  const getDataForms = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    const formLogin = formData.get("Login").trim();
    const formPassword = formData.get("password");
    const formPasswordRepeat = formData.get("passwordRepeat");
    regExLogin.test(formLogin)
      ? console.log("Login okey")
      : booleanLoginFunction();
    formPassword === formPasswordRepeat
      ? console.log("Password okey")
      : checkPasswordFunction();
    regExPassword.test(formPassword)
      ? console.log("Password okey")
      : booleanPasswordFunction();

    if (
      regExLogin.test(formLogin) &&
      formPassword === formPasswordRepeat &&
      regExPassword.test(formPassword)
    ) {
      axios
        .post("http://localhost:8000/createUser", {
          formData,
        })
        .then((res) => {
          formData = new FormData("");
          registrationPage();
        });
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
        <div className="registration-conainer">
          <h1>Регистрация </h1>

          <div className="form-container">
            <form onSubmit={getDataForms}>
              <label>Login: </label>
              <input type="text" placeholder="Login" name="Login" />
              <label>Password: </label>
              <input type="password" placeholder="Password" name="password" />
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
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => handleClose()}
        message={messages}
      />
    </div>
  );
};

export default RegistrationFormComponent;
