import React, { useEffect } from "react";
import { ObjectContext } from "../helpers/types";
import { useOutletContext } from "react-router-dom";
import "./SignOut.css";

export default function SignOut() {

  return <div className="Container">
    <h2>Sign Out</h2>
    <p>You have been successfully signed out.</p>
  </div>
}