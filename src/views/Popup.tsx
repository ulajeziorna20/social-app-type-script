import { Link, useOutletContext } from "react-router-dom"
import React, { useState, useContext } from "react";

import "./Popup.css"
import LoginForm from "./LoginForm"
import { ObjectContext, ResponseLogin, User } from "../helpers/types"
import { LoginContext } from "./App";





const Popup = () => {
  const context = useContext(LoginContext);

  const closePopup = () => {
    context?.setShowPopup(false)
  }

  return (
    <div className="popup">
      <div className="closePopup" onClick={() => closePopup()}>
        X
      </div>
      <h2>Already have an account?</h2>
      <LoginForm />

      <span>No? Create account! <Link to="/signup">SignUp</Link></span>


    </div>
  )
}

export default Popup
