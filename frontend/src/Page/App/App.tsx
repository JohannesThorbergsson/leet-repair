import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp"
import axios from "axios";
import Cookies from 'js-cookie'
import Dashboard from "../Dashboard/Dashboard";
import BikeGallery from "../BikeGallery/BikeGallery";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import BikeDetailPage from "../BikeDetailPage/BikeDetailPage";
import useFetchData from "../../Hooks/useFetchData";
import EditBikePage from "../EditBikePage/EditBikePage";
import AddBikePage from "../AddBikePage/AddBikePage";

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
const {bikes, orders, updateBikeList} = useFetchData()
  return (
      <div className="App">
        <Routes>
          <Route path={"/login"} element={<Login/>}/>
          <Route path={"/signup"} element={<SignUp/>}/>
          <Route path={"/"} element={<Dashboard orders={orders}/>}/>
          <Route path={"/bikes"} element={<BikeGallery bikes={bikes}/>}/>
          <Route path={"/bikes/add-bike"} element={<AddBikePage bikes={bikes} updateBikeList={updateBikeList}/>}/>
          <Route path={"/bikes/details/:bikeId"} element={<BikeDetailPage bikes={bikes}/>}/>
          <Route path={"/bikes/edit-bike/:bikeId"} element={<EditBikePage bikes={bikes} updateBikeList={updateBikeList}/>}/>
        </Routes>
      </div>
  );
}

export default App;
