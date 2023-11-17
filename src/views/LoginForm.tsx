import React, { FormEvent, useContext, useState } from "react";
import './LoginForm.css';
import { FormDataLogin, ObjectContext, ResponseLogin } from "../helpers/types";
import axios, { AxiosResponse } from "axios";
import { useNavigate, useOutletContext } from "react-router-dom";
import { HTTPS_REACT_APP_API_URL, HTTP_REACT_APP_API_URL } from "../react-app-env.d";
import { ContextProps, LoginContext } from "./App";



const LoginForm = () => {

  const context = useContext<ContextProps | null>(LoginContext);

  console.log(context);

  const navigate = useNavigate();
  const errorMessage = "Incorrect username or password";

  const [formData, setFormData] = useState<FormDataLogin>({
    username: "",
    password: ""
  });





  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios.post(`${HTTP_REACT_APP_API_URL}/user/login`, {
      username: formData.username,
      password: formData.password
    }).then((response: AxiosResponse<ResponseLogin>) => {
      console.log('response', response);

      if (response.status === 200) {


        console.log('fail');

        localStorage.setItem("loggedUser", JSON.stringify(response.data));
        localStorage.setItem("timeStamp", new Date().toDateString());
        context?.setLoggedUser(response.data);
        context?.setTimeStamp(new Date());
        navigate('/social-app-type-script');
        context?.setShowPopup(false)
      }
      else {
        setShowErrorMessage(true);
      }
    })
      .catch((error) => console.error("An error has occurred during logging in:", error));

  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const name = target.name;
    setFormData({
      ...formData,
      [name]: target.value
    });

    setShowErrorMessage(false);
  }

  return (
    <div className="FormContainer">
      <form className="FormBody" onSubmit={handleSubmit}>
        <label form={formData.username}>Username:</label>
        <input type="text"
          name="username"
          placeholder="Enter username"
          onChange={handleInputChange} />
        <label form={formData.password}>Password:</label>
        <input type="password" placeholder="Enter password"
          name="password" onChange={handleInputChange} />
        <button type="submit" className="Button PrimaryButton">Login</button>
      </form>
      {showErrorMessage && <p className="FontItalic FontRed">{errorMessage}</p>}
    </div>
  )
}

export default LoginForm;