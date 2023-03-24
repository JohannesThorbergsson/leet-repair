import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Login from "../../Page/Login/Login";
import SignUp from "../../Page/SignUp/SignUp"
import axios from "axios";
import Cookies from 'js-cookie'
import Dashboard from "../../Page/Dashboard/Dashboard";
import BikeGallery from "../../Page/BikeGallery/BikeGallery";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import BikeDetailPage from "../../Page/BikeDetailPage/BikeDetailPage";
import useBikes from "../../Hooks/useBikes";
import EditBikePage from "../../Page/EditBikePage/EditBikePage";
import AddBikePage from "../../Page/AddBikePage/AddBikePage";

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
const {bikes} = useBikes()
  return (
      <div className="App">
        <Routes>
          <Route path={"/login"} element={<Login/>}/>
          <Route path={"/signup"} element={<SignUp/>}/>
          <Route path={"/"} element={<Dashboard/>}/>
          <Route path={"/bikes"} element={<BikeGallery bikes={bikes}/>}/>
          <Route path={"/bikes/add-bike"} element={<AddBikePage/>}/>
          <Route path={"/bikes/details/:bikeId"} element={<BikeDetailPage bikes={bikes}/>}/>
          <Route path={"/bikes/edit-bike/:bikeId"} element={<EditBikePage bikes={bikes}/>}/>
        </Routes>
      </div>
  );
}

export default App;
