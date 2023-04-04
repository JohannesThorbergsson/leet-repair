import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Login from "../Page/Login/Login";
import SignUp from "../Page/SignUp/SignUp"
import axios from "axios";
import Cookies from 'js-cookie'
import Dashboard from "../Page/Dashboard/Dashboard";
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
import WorkshopDashboard from "../Page/WorkshopDashboard/WorkshopDashboard";

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
    const {bikes, orders, workshops, updateBikeList, updateOrderList} = useFetchData()
    const user = useAuth(false)
  return (
      <div className="App">
        <Toaster/>
        <Routes>
          <Route path={"/login"} element={<Login/>}/>
          <Route path={"/signup"} element={<SignUp/>}/>
          <Route path={"/"} element={ user?.role==="WORKSHOP"?
              <WorkshopDashboard/>:
              <Dashboard orders={orders}
                         workshops={workshops}
                         updateOrderList={updateOrderList}
                         bikes={bikes}
                         updateBikeList={updateBikeList}/>}/>
          <Route path={"/bikes"} element={<BikeGallery bikes={bikes}/>}/>
          <Route path={"/bikes/add-bike"} element={<AddBikePage bikes={bikes} updateBikeList={updateBikeList}/>}/>
          <Route path={"/bikes/details/:bikeId"} element={<BikeDetailPage bikes={bikes}/>}/>
          <Route path={"/bikes/edit-bike/:bikeId"} element={
              <EditBikePage bikes={bikes} updateBikeList={updateBikeList}/>}/>
          <Route path={"/workshops/orders/:workshopId"} element={
              <BookOrderPage workshops={workshops} bikes={bikes} orders={orders} updateOrderList={updateOrderList}/>}/>
          <Route path={"/orders/:orderId"} element={
              <EditOrderPage orders={orders} updateOrderList={updateOrderList} bikes={bikes} workshops={workshops}/>}/>
          <Route path={"/orders/archive"} element={<OrderArchive orders={orders}/>}/>
        </Routes>
      </div>
  );
}

export default App;
