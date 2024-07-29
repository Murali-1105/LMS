import React from 'react';   
import { logout } from "../../../utils/auth.js"; 
import { Link } from "react-router-dom";   
import UserData from '../../../views/plugin/UserData.js'; 
import DarkMode from '../../theme/DarkMode.jsx';

function Header({ toggleSidebar }) {     
  const user = UserData();
    
    return (  
      <> 
      <nav className="navbar navbar-expand px-3 py-1 border-bottom shadow-sm sticky-top"> 
         <button className="btn" id="sidebar-toggle" type="button" onClick={toggleSidebar}>
            <span className="navbar-toggler-icon"></span>
         </button> 
        <div className="navbar-collapse navbar"> 
            <ul className="navbar-nav hstack gap-3">  
              <li><DarkMode/></li>
              {/* <li>   
                <Link to={`/teacher/coming-soon/`} className='position-relative'><i className="bi bi-ticket-detailed fs-5"></i>
                   <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger rounded-circle">
                      <span className="visually-hidden">New alerts</span>
                   </span> 
                </Link>
              </li>   */}
              <li className='nav-notify dropdown position-relative'>   
                <a className="position-relative border-0" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                    <i className="bi bi-bell fs-5"></i>
                  {/* <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger rounded-circle">
                    <span className="visually-hidden">New alerts</span>
                  </span> */}
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
                        <Link to={`/teacher/coming-soon/`} className="dropdown-item"><i className="bi bi-person-fill fs-5 pe-2"></i>Profile</Link>
                        <Link to={`/teacher/`} className="dropdown-item"><i class="bi bi-key-fill fs-5 pe-2"></i>Reset Password</Link> 
                        <hr className='my-2'/>
                        <Link to='#' className="dropdown-item" onClick={logout}><i className="bi bi-box-arrow-right fs-5 pe-2"></i>Logout</Link> 
                    </div> 
                  </div>
                </li> 
            </ul>
        </div>
    </nav>  
        <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
          <div className="offcanvas-header d-flex justify-content-between"> 
            <h5 className="offcanvas-title float-end" id="offcanvasRightLabel">Notification</h5>
            <button type="button" className="btn btn-outline-danger rounded-2" data-bs-dismiss="offcanvas" aria-label="Close"><i className="bi bi-x-lg fw-bolder"></i></button> 
          </div>
          <div className="offcanvas-body"> 
          </div>
        </div> 
    </> 
    );
}

export default Header; 
 