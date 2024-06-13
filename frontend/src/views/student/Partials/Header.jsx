// import React from 'react'

// function Header() {
//     return ( 
//      <nav className='bg-dark text-white'> 
//         <div className="">
//             <div className="">
//                 <div className="px-3 px-lg-5 py-3 shadow-sm">
//                     <div className="d-flex align-items-center justify-content-between"> 
//                        <div> 
//                           <img src="/public/MH_COCKPIT_LOGO.png" alt="MH" width="180" class="d-inline-block img-fluid"/>
//                        </div>
//                         <div className="d-flex align-items-center"> 
//                             <div className="me-2 position-relative d-flex justify-content-end align-items-end mt-n5">
//                                 <img src="/public/student.jpg" className="avatar-xl rounded-circle border border-2 border-white" alt="avatar" style={{ width: "55px", height: "55px", borderRadius: "50%", objectFit: "cover" }} />
//                             </div>
//                             <div className="lh-1">
//                                 <h5 className="mb-1"> student name</h5>
//                                 <p className="mb-0 d-block">@desphixs</p>
//                             </div>
//                         </div>
//                         {/* <div>
//                             <a href="profile-edit.html" className="btn btn-primary btn-sm d-none d-md-block" >
//                                 Account Setting <i className='fas fa-gear fa-spin'></i>
//                             </a>
//                         </div> */}
//                     </div>
//                 </div>
//             </div>
//         </div> 
//       </nav>
//     )
// }

// export default Header 
 

import React, { useState, useEffect } from 'react';   
import Cookie from "js-cookie"  
import { logout } from "../../../utils/auth.js"; 
import { Link } from "react-router-dom";   
import jwt_decode from 'jwt-decode'


function Header({ toggleSidebar }) {    
    
  const accessToken=Cookie.get("access_token")  
  const decodedToken =jwt_decode(accessToken) ?? null

  const [isLight, setIsLight] = useState(() => { 
       const storedTheme = localStorage.getItem('light');
       return storedTheme === null ? true : storedTheme === 'set';
     });
  
  const toggleTheme = () => {
    setIsLight(prevIsLight => {
      const newIsLight = !prevIsLight;
      if (newIsLight) {
        localStorage.setItem('light', 'set');
      } else {
        localStorage.removeItem('light');
      }
      return newIsLight;
    });
  };
  
    useEffect(() => {
      const currentTheme = isLight ? 'light' : 'dark';
      document.documentElement.setAttribute('data-bs-theme', currentTheme);
    }, [isLight]); 

    return (
        <nav className="navbar navbar-expand px-3 border-bottom">
        <button className="btn" id="sidebar-toggle" type="button" onClick={toggleSidebar}>
            <span className="navbar-toggler-icon"></span>
        </button> 
        <div className="navbar-collapse navbar"> 
            <ul className="navbar-nav d-flex justify-content-center align-items-center"> 
               <li className='theme-toggle d-flex me-2'> 
                    <input type="checkbox" className="checkbox" id="checkbox" onClick={toggleTheme} />
                      <label for="checkbox" className="checkbox-label">  
                          <i className="bi bi-sun-fill"></i>
                          <i className="bi bi-moon-fill"></i>
                          <span className="ball"></span>
                      </label>
               </li>    
               <li className='position-relative border border-light rounded-3 me-4'> 
                     <a href=""><i class="bi bi-ticket-detailed p-1"></i></a>
                 </li>
               <li >  
                  {/* <a href=''> 
                      <i className="bi bi-bell-fill fs-6 p-1"></i> 
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-danger p-1"><span className="visually-hidden">messages</span></span>
                   </a>      */}
                   <div class="dropdown me-3 d-none d-sm-block">
                    <div class="cursor-pointer dropdown-toggle navbar-link" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <i className="bi bi-bell-fill fs-6 p-1"></i> 
                    </div>
                    <div class="dropdown-menu fx-dropdown-menu">
                        <h5 class="p-3 bg-primary text-light">Notification</h5>
                        <div class="list-group list-group-flush">
                            <a href="#"
                                class="list-group-item list-group-item-action d-flex justify-content-between align-items-start">
                                <div class="me-auto">
                                    <div class="fw-semibold">Subheading</div>
                                    <span class="fs-7">Content for list item</span>
                                </div>
                                <span class="badge bg-primary rounded-pill">14</span>
                            </a>
                        </div>
                    </div>
                </div>
                </li> 
                <li className="nav-item nav-profile">  
                  <div className='dropdown'>
                    <div data-bs-toggle="dropdown" className=" d-flex justify-content-center align-items-center">  
                       <a href="" className='nav-icon'> 
                          <img src={decodedToken?.user_image} className="avatar img-fluid rounded-5" alt="" />  
                          <span className='d-none d-md-inline ms-2'>Welcome, {decodedToken?.username}!<i className="bi bi-chevron-down ps-1"></i></span>  
                        </a>     
                    </div>
                   <div className="dropdown-menu dropdown-menu-end mt-2 px-2">
                        <Link href="#" className="dropdown-item" to={`/student/profile/`}><i className="bi bi-person-bounding-box pe-2"></i>Profile</Link>
                        <Link href="#" className="dropdown-item" to={`/student/change-password/`} ><i className="bi bi-gear-fill pe-2"></i>Setting</Link>
                        <Link to="#" className="dropdown-item" onClick={logout} ><i className="bi bi-box-arrow-right pe-2"></i>Logout</Link> 
                    </div> 
                  </div>
                </li>
            </ul>
        </div>
    </nav>
    );
}

export default Header;
