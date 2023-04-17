import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Login from "../Page/Login/Login";
import SignUp from "../Page/SignUp/SignUp"
import axios from "axios";
import Cookies from 'js-cookie'
import BikeGallery from "../Page/BikeGallery/BikeGallery";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import BikeDetailPage from "../Page/BikeDetailPage/BikeDetailPage";
import useFetchData from "../Hooks/useFetchData";
import EditBikePage from "../Page/EditBikePage/EditBikePage";
import AddBikePage from "../Page/AddBikePage/AddBikePage";
import BookOrderPage from "../Page/BookOrderPage/BookOrderPage";
import EditOrderPage from "../Page/EditOrderPage/EditOrderPage";
import OrderArchive from "../Page/OrderArchieve/OrderArchive";
import {Toaster} from 'react-hot-toast';
import useAuth from "../Hooks/useAuth";
import SetUpWorkshop from "../Page/SetUpWorkshop/SetUpWorkshop";
import EditWorkshopPage from "../Page/EditWorkshopPage/EditWorkshopPage";
import Dashboard from "../Page/Dashboard/Dashboard";
import "mapbox-gl/dist/mapbox-gl.css";

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
    const {
        bikes,
        orders,
        workshops,
        isFetching,
        mapApiKey,
        updateBikeList,
        updateOrderList,
        updateWorkshopList
    } = useFetchData()
    const user = useAuth(false)
  return (
      <div className="App">
        <Toaster/>
        <Routes>
          <Route path={"/login"} element={<Login/>}/>
          <Route path={"/signup"} element={<SignUp/>}/>
          <Route path={"/"} element={
              <Dashboard bikes={bikes}
                         isFetching={isFetching}
                         orders={orders}
                         updateBikeList={updateBikeList}
                         updateOrderList={updateOrderList}
                         workshops={workshops}
                         mapApiKey={mapApiKey}/>}/>
          <Route path={"/bikes"} element={<BikeGallery bikes={bikes}/>}/>
          <Route path={"/bikes/add-bike"} element={<AddBikePage bikes={bikes} updateBikeList={updateBikeList}/>}/>
          <Route path={"/bikes/details/:bikeId"} element={<BikeDetailPage bikes={bikes}/>}/>
          <Route path={"/bikes/edit-bike/:bikeId"} element={
              <EditBikePage bikes={bikes} updateBikeList={updateBikeList}/>}/>
          <Route path={"/workshops/orders/"} element={
              <BookOrderPage bikes={bikes}
                             orders={orders}
                             updateOrderList={updateOrderList}
                             mapApiKey={mapApiKey}
                             isFetching={isFetching}/>}/>
          <Route path={"/orders/:orderId"} element={
              <EditOrderPage orders={orders}
                             updateOrderList={updateOrderList}
                             bikes={bikes}
                             mapApiKey={mapApiKey}
                             isFetching={isFetching}/>}/>
          <Route path={"/orders/archive"} element={<OrderArchive orders={orders}/>}/>
          <Route path={"/workshops/setup"} element={
              <SetUpWorkshop workshops={workshops} updateWorkshopList={updateWorkshopList} mapApiKey={mapApiKey}/>}/>
          <Route path={"/workshops/edit/:workshopId"} element={
              <EditWorkshopPage updateWorkshopList={updateWorkshopList}
                                user={user}
                                workshops={workshops}
                                isFetching={isFetching}
                                mapApiKey={mapApiKey}/>}/>
        </Routes>
      </div>
  );
}

export default App;
