import React, { useEffect, useState } from 'react';
import './App.css';
import { Link, Outlet, Router } from "react-router-dom";
import { ResponseLogin } from "../helpers/types";
import axios, { AxiosResponse } from 'axios';
import { HTTPS_REACT_APP_API_URL, HTTP_REACT_APP_API_URL } from "../react-app-env.d";
import Popup from './Popup';

import { createContext, useContext } from 'react';
import AppRoutes from './AppRoutes';


export type ContextProps = {
  showPopup: boolean;
  setShowPopup: (show: boolean) => void;
  loggedUser: ResponseLogin | null;
  setLoggedUser: (user: ResponseLogin) => void,
  setTimeStamp: (data: Date) => void,
}

export const LoginContext = createContext<ContextProps | null>(null);

function App() {

  const initLocal = localStorage.getItem("loggedUser") || '';
  const initTimeStamp = localStorage.getItem("timeStamp") || '1999-01-01';
  const [loggedUser, setLoggedUser] = useState<ResponseLogin | null>(initLocal ? JSON.parse(initLocal) : '');

  const [showPopup, setShowPopup] = useState(false)

  const [timeStamp, setTimeStamp] = useState<Date>(new Date(initTimeStamp));


  axios.defaults.headers.common['Authorization'] = "Bearer " + (loggedUser?.jwt_token ? loggedUser?.jwt_token : '');


  const handleLogout = (): void => {
    axios.post(`${HTTP_REACT_APP_API_URL}/user/logout`)
      .then((res: AxiosResponse) => {
        setLoggedUser(null);
        localStorage.removeItem("loggedUser");
        setTimeStamp(new Date('1999-01-01'));
        localStorage.removeItem("timeStamp");
        setShowPopup(false)
      })
      .catch((error) => {
        console.log(error);

      });
  }


  useEffect(() => {
    const PopUpStatusChange = () => {
      setShowPopup(true)
    }

    const timeId = setTimeout(() => {
      PopUpStatusChange()
    }, 5000)

    return () => {
      clearTimeout(timeId)
    }
  }, [])



  return (
    <div className="App">
      {showPopup && <div className="popupBgd"></div>}
      <LoginContext.Provider value={{ showPopup, setShowPopup, loggedUser, setLoggedUser, setTimeStamp }}>
        <header className="App-header">
          <h1>Social App</h1>
        </header>


        {showPopup && !loggedUser &&
          <Popup />
        }



        <nav className='AppNavbar'>
          <ul>
            <li>
              <Link to={"/social-app-type-script"}>HOME</Link>
            </li>
            {!loggedUser &&
              <li>
                <Link to={"/social-app-type-script/login"}>LOG IN</Link>
              </li>
            }
            {!loggedUser &&
              <li>
                <Link to={"/social-app-type-script/signup"}>SIGN UP</Link>
              </li>
            }
            {loggedUser &&
              <li>
                <Link to={"/social-app-type-script"} onClick={handleLogout}>LOGOUT</Link>
              </li>
            }
          </ul>
        </nav>



        <AppRoutes />
      </LoginContext.Provider>
      {/* <Outlet context={{ loggedUser, setLoggedUser, timeStamp, setTimeStamp }} /> */}

    </div >
  );
}

export default App;


