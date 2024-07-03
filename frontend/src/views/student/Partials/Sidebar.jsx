import React from "react";
import { NavLink } from "react-router-dom"; 

 
function Sidebar({ collapsed, closeSidebar }) {

    return (  
        <aside id="sidebar" className={collapsed ? "collapsed" : ""}> 
            <div className="sidebar-logo m-4">
                <a href="#"><img src="/MH_COCKPIT_LOGO.png" alt="img" className='img-fluid' /></a>
            </div> 
            <ul className="sidebar-nav" onClick={closeSidebar}>
                    <li className="sidebar-item">
                        <NavLink className="sidebar-link" to={`/student/dashboard/`} >
                         <i className="bi bi-grid-1x2-fill pe-2"></i>Dashboard</NavLink>
                    </li>
                    <li className="sidebar-item" >
                        <NavLink className="sidebar-link" to={`/student/subjects/`}> 
                        <i className="bi bi-book-half pe-2"></i>MySubjects</NavLink>
                    </li> 
                    <li className="sidebar-item">
                        <NavLink className="sidebar-link" to={`/student/calender/`}>
                        <i className="bi bi-calendar-week pe-2"></i>Calender</NavLink>
                    </li>  
                    <li className="sidebar-item">
                        <NavLink className="sidebar-link" to={`/student/interview-questions/`}>
                        <i className="bi bi-question-circle-fill pe-2"></i>Interview Question</NavLink>
                    </li>  
                    <li className="sidebar-item">
                        <NavLink className="sidebar-link" to={`/student/leadership-board/`}>
                        <i className="bi bi-trophy pe-2"></i>Leadership Board</NavLink>
                    </li> 
                </ul> 
        </aside> 
    );
}

export default Sidebar;

