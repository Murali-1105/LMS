import React, { useState, useEffect } from 'react';   
import { logout } from "../../../utils/auth.js"; 
import { Link } from "react-router-dom";   
import UserData from '../../../views/plugin/UserData.js'; 
import DarkMode from '../../theme/DarkMode.jsx'; 
import { Toast, ToastContainer, Button, Badge } from 'react-bootstrap';

function Header({ toggleSidebar }) {   
  const user = UserData();
  // const [notify, setNotify] = useState([
  //   { id: 1, title: "Notification 1", content: "This is the first notification.",time:'3 days ago', read: false },
  //   { id: 2, title: "Notification 2", content: "This is the second notification.",time:'3 days ago', read: false },
  //   { id: 3, title: "Notification 3", content: "This is the third notification.",time:'3 days ago', read: false },
  //   { id: 4, title: "Notification 1", content: "This is the first notification.",time:'3 days ago', read: false },
  //   { id: 5, title: "Notification 2", content: "This is the second notification.",time:'3 days ago', read: false },
  // ]);
  
  // const handleClearAll = () => { setNotify([]); };

  // const markAsRead = (id) => {
  //   setNotify(prevNotify => 
  //     prevNotify.map(notification =>
  //       notification.id === id ? { ...notification, read: true, isExiting: true } : notification
  //     )
  //   );  
  // }; 

  // const unreadCount = notify.filter(notification => !notification.read).length; 
   
  const unreadCount =0;

  return (  
    <> 
      <nav className="navbar navbar-expand px-3 py-1 border-bottom shadow-sm sticky-top"> 
        <button className="btn" id="sidebar-toggle" type="button" onClick={toggleSidebar}>
          <span className="navbar-toggler-icon"></span>
        </button> 
        <div className="navbar-collapse navbar"> 
          <ul className="navbar-nav hstack gap-3">  
            <li><DarkMode/></li>
            <li>   
              <Link to={`/student/coming-soon/`} className='position-relative'> 
                <i className="bi bi-ticket-detailed fs-5"></i> 
                {unreadCount > 0 && (
                  <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle p-1">
                    <span className="visually-hidden">New alerts</span>
                  </Badge>
                )}
              </Link>
            </li>  
            <li className='nav-notify dropdown position-relative'>   
              <a className="position-relative border-0" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"> 
                <i className="bi bi-bell fs-5"></i>
                {unreadCount > 0 && (
                  <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle p-1">
                    <span className="visually-hidden">New alerts</span>
                  </Badge>
                )}
              </a>
            </li>  
            <div className="vr" style={{width:'1px'}}></div> 
            <li className="nav-profile">  
              <div className='dropdown'>
                <div data-bs-toggle="dropdown" className="d-flex justify-content-center align-items-center">  
                  <a href="" className='nav-icon'> 
                    <img src={user.user_image} className="img-fluid avatar rounded-circle" alt="user-img" style={{objectFit:'cover'}} />  
                    <span className='d-none d-md-inline ms-2'>Welcome, {user.username}!<i className="bi bi-chevron-down ps-1" style={{fontSize : '10px'}}></i></span>  
                  </a>     
                </div>
                <div className="dropdown-menu dropdown-menu-end mt-4 p-3 border">
                  <Link to={`/student/coming-soon/`} className="dropdown-item"><i className="bi bi-person-fill fs-5 pe-2"></i>Profile</Link>
                  <Link to={`/student/change-password/`} className="dropdown-item"><i className="bi bi-key-fill fs-5 pe-2"></i>Reset Password</Link> 
                  <hr className='my-2'/>
                  <Link to='#' className="dropdown-item" onClick={logout}><i className="bi bi-box-arrow-right fs-5 pe-2"></i>Logout</Link> 
                </div> 
              </div>
            </li> 
          </ul>
        </div>
      </nav>  

      <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
        <div className="offcanvas-header d-flex justify-content-between pb-0"> 
          <h5 className="offcanvas-title" id="offcanvasRightLabel">Notification</h5>
          <button type="button" className="btn btn-sm btn-outline-danger rounded-2" data-bs-dismiss="offcanvas" aria-label="Close"><i className="bi bi-x-lg fw-bolder"></i></button> 
        </div>
        <div className="offcanvas-body mt-3">   

          {/* <ToastContainer position="static" className="position-static">
            {notify.map((message) => (
              <Toast key={message.id} className={`notify-box shadow-sm mb-3 ${message.isExiting ? 'fade-out' : ''}`} >
                <Toast.Header closeButton={false}> 
                  <img src="/block-icon.svg" className="rounded me-2 avatar-sm" alt="..."/>
                  <strong className="me-auto">{message.title}</strong>
                  <small className="text-muted me-1">{message.time}</small>
                  <button type="button" className="btn p-0 border-0" data-bs-dismiss="toast" aria-label="Close" onClick={() => markAsRead(message.id)}><i className="bi bi-x text-secondary fs-5"></i></button>
                </Toast.Header>
                <Toast.Body>{message.content}</Toast.Body>
              </Toast>
            ))}
          </ToastContainer>   */}
        </div>
        {/* <div className='offcanvas-footer p-2'>
          {unreadCount > 1 && (
            <button className="btn btn-link text-danger float-end" onClick={handleClearAll}>Clear All</button> 
          )}  
        </div>  */}
      </div>  
    </> 
  );
}

export default Header;
