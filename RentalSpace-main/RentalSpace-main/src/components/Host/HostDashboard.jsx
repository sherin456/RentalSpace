import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HostDashboard.css";
import Navbar from "./Navbar";
import { acceptBooking, addSpace, getUid, getUser, getUserRequest, getUserSpace, rejectBooking } from "../../api/Api";
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import UserDash from "./DashComp/UserDash";
import MyBooks from "./DashComp/MyBooks";
import Requests from "./DashComp/Requests";
import SpaceComp from "./DashComp/SpaceComp";
import Map from '../User/Map'
import StorageForm from "../Storage/StorageForm";
import MySpaces from "./MySpaces";
import MySpaceForm from "./MySpaceForm";
import Notifications from "./DashComp/Notifications";
import { useNavigate, useParams } from "react-router-dom";


const HostDashboard = () => {

  const [formShow, setFormShow] = useState(false);
  const [formShowStorage, setFormShowStorage] = useState(false);
  const [NoticeShow,setNoticeShow]=useState(false)
  const handleShow = () => setFormShow(true);
  const handleShowStorage = () => setFormShowStorage(true);
  const handleNotifies=()=>setNoticeShow(true)
  // const {id} = useParams();
  
  const navigator= useNavigate()
  const [currentUser, setCurrentUser] = useState({});
  const [unview,setUnview]=React.useState(0);

  useEffect(() => {
    if(!localStorage.getItem("key")){
      navigator("/login")
      return
    }
    getUser(localStorage.getItem("user")).then(res =>{ setCurrentUser(res.data); return res})
    .then(dat=>dat.data.inbox)
    .then(arr=>arr.filter((p)=>!p.viewed))
    .then(filtered=>setUnview(filtered.length))
    
  }, []);
  
  console.log(currentUser)
  console.log("Userrrr")
  return (
    <div className="dashboard-container">
      <div className="host-left">
        <div className="top d-md-flex align-items-center mb-4 py-4 px-2 px-md-0 mb-md-0 justify-content-between ">
          <UserDash currentUser={currentUser} />
          <div className=" row gap-3 px-4">
            <div className="">
              <button onClick={handleNotifies} className="btn notify btn-outline-primary">🔔</button>
              <p className="counter bg-danger text-center rounded-5 d-inline text-light py-1 px-2">{unview}</p>
            </div>
            <button onClick={handleShow} className="btn  btn-sm rounded-5 btn-primary">Add Space</button>
            <button onClick={handleShowStorage} className="btn  btn-sm rounded-5 btn-primary">Add Storage</button>
          </div>
        </div>
        {
          NoticeShow&&(
            <Notifications off={setNoticeShow} />
          )
        }
        {formShow &&(
              <MySpaceForm  storage={false} setFormShow={setFormShow} />
            )}
        {formShowStorage &&(
              <MySpaceForm storage={true} setFormShow={setFormShowStorage} />
            )}
        <hr />
        <div className="p-4">
            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
              <li className="nav-item" role="presentation">
                <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" >My Parkings</button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" >Bookings</button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" >Requests</button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-space" type="button" role="tab" >My Spaces</button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-space-books" type="button" role="tab" >Space Bookings</button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-space-rqst" type="button" role="tab" >Space Request</button>
              </li>
            </ul>
            <div className="tab-content" id="pills-tabContent">
              <div className="tab-pane fade show active" id="pills-home" role="tabpanel" >
                <MySpaces storage={false}/>
              </div>
              <div className="tab-pane fade" id="pills-profile" role="tabpanel" >
                <MyBooks/>
              </div>
              <div className="tab-pane fade" id="pills-contact" role="tabpanel">
                <Requests/>
              </div>
              <div className="tab-pane fade" id="pills-space" role="tabpanel">
                <MySpaces storage={true} />
              </div>
              <div className="tab-pane fade" id="pills-space-books" role="tabpanel">
                <MyBooks storage={true} />
              </div>
              <div className="tab-pane fade" id="pills-space-rqst" role="tabpanel">
                <Requests storage={true}/>
              </div>
            </div>
            </div>
      </div>
    </div>
  );
};
export default HostDashboard;
