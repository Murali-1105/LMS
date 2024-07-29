import React from "react";
import { NavLink, Link } from "react-router-dom"; 

 
function Sidebar({ collapsed, closeSidebar }) {

    return (  
        <aside id="sidebar" className={collapsed ? "collapsed" : ""}> 
            <div className="sidebar-header">
                <Link to="/teacher/dashboard/"> 
                    <div className="logo-sm">  
                      <img src= "/wings-red.png" alt="img-wings" className="w-75 mx-2 my-4" /> 
                    </div> 
                    <div className="logo-lg">
                      <img src="/MH_COCKPIT_LOGO.png" alt="img-mhcockpit" /> 
                   </div>
                </Link> 
             <button style={{marginTop:'-5px'}} className="btn btn-sm btn-outline-primary d-md-none me-3" onClick={closeSidebar}><i className="bi bi-x-lg"></i></button>
            </div>  
            <div>
            <ul className="sidebar-nav">
                <li className="sidebar-item">
                    <NavLink className="sidebar-link" to={`/teacher/dashboard/`} >
                     <span><i className="bi bi-grid-1x2-fill fs-5"></i></span> 
                     <p className="mb-0">Dashboard </p> 
                    </NavLink>
                </li>
                <li className="sidebar-item">
                    <NavLink className="sidebar-link" to={`/teacher/calender/`}>
                     <span><i className="bi bi-calendar-week fs-5"></i> </span> 
                     <p className="mb-0">Calender </p> 
                     </NavLink>
                </li>  
                </ul>  
            </div>
        </aside> 
    );
}

export default Sidebar;

