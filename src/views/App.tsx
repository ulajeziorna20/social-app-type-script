import React, { useEffect, useState } from 'react';
import './App.css';
import { Link, Outlet } from "react-router-dom";
import { ResponseLogin } from "../helpers/types";
import axios from 'axios';
import { HTTPS_REACT_APP_API_URL, HTTP_REACT_APP_API_URL } from "../react-app-env.d";


function App() {

  const initLocal = localStorage.getItem("loggedUser") || '';
  const initTimeStamp = localStorage.getItem("timeStamp") || '1999-01-01';
  const [loggedUser, setLoggedUser] = useState<ResponseLogin>(initLocal.length > 0 ? JSON.parse(initLocal) : { jwt_token: '' });


  const [timeStamp, setTimeStamp] = useState<Date>(new Date(initTimeStamp));

  // useEffect(() => {
  //   if (new Date().getTime() - timeStamp.getTime() > 7200000) {

  //   }
  // }, []);






  const handleLogout = () => {
    axios.post(`${HTTP_REACT_APP_API_URL}/user/logout`)
      .then((res) => {
        setLoggedUser({ jwt_token: '' });
        localStorage.removeItem("loggedUser");
        setTimeStamp(new Date('1999-01-01'));
        localStorage.removeItem("timeStamp");
      })
      .catch((error) => {
        console.log(error);

      });
  }


  return (
    <div className="App">
      <header className="App-header">
        <h1>Social App</h1>
      </header>
      <nav>
        <ul>
          <li>
            <Link to={"/"}>HOME</Link>
          </li>
          {loggedUser.jwt_token.length === 0 &&
            <li>
              <Link to={"/login"}>LOG IN</Link>
            </li>
          }
          {loggedUser.jwt_token.length === 0 &&
            <li>
              <Link to={"/signup"}>SIGN UP</Link>
            </li>
          }
          {loggedUser.jwt_token.length > 0 &&
            <li>
              <Link to={"/signout"} onClick={handleLogout}>LOGOUT</Link>
            </li>
          }
        </ul>
      </nav>
      <Outlet context={{ loggedUser, setLoggedUser, timeStamp, setTimeStamp }} />
    </div>
  );
}

export default App;


