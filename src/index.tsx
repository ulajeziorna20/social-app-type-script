import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './views/App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./views/Home";
import ErrorPage from "./views/ErrorPage";
import Login from "./views/Login";
import SignUp from "./views/SignUp";

export const API_URL = "https://akademia108.pl/api/social-app";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "home", element: <Home />
      },
      {
        path: "login", element: <Login />
      },
      {
        path: "signup", element: <SignUp />
      }
    ],
    errorElement: <ErrorPage />
  }
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
