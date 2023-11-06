import { Routes, Route } from "react-router-dom"
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import SignOut from "./SignOut";
import Registered from "./Registered";
import ErrorPage from "./ErrorPage";


const AppRoutes = () => {
  return (


    <Routes >

      <Route
        path="social-app-type-script"
        element={
          <Home />
        }
      />
      <Route
        path="social-app-type-script/login"
        element={<Login />}
      />
      <Route path="social-app-type-script/signup" element={<SignUp />} />
      {/* <Route path="social-app-type-script/signout" element={<SignOut />} /> */}
      <Route path="social-app-type-script/registered" element={<Registered />} />
      <Route path="social-app-type-script/error" element={<ErrorPage />} />


    </Routes>


  );
}

export default AppRoutes;