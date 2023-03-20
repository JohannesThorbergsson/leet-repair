import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp"
import axios from "axios";
import Cookies from 'js-cookie'
import Dashboard from "../Dashboard/Dashboard";
import BikeGallery from "../BikeGallery/BikeGallery";


axios.interceptors.request.use(
    function (config) {
        return fetch('/api/csrf').then(() => {
            config.headers['X-XSRF-TOKEN'] = Cookies.get('XSRF-TOKEN')
            return config
        })
    },
    function (error) {
        return Promise.reject(error)
    }
)
function App() {
  return (
      <div className="App">
        <Routes>
          <Route path={"/login"} element={<Login/>}/>
          <Route path={"/signup"} element={<SignUp/>}/>
          <Route path={"/"} element={<Dashboard/>}/>
          <Route path={"/bikes"} element={<BikeGallery/>}/>
        </Routes>
      </div>
  );
}

export default App;
