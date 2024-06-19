import React, { useState } from 'react';
import { Outlet } from 'react-router-dom'; 
import Sidebar from "./Partials/Sidebar";
import Header from "./Partials/Header";

const StudentLayout = () => {    

  const [collapsed, setCollapsed] = useState(false); 

  const toggleSidebar = () => {
        setCollapsed(!collapsed);
      };   
     
  const closeSidebar = () => {
    setCollapsed(false);
  };

  return (
    <> 
      <div className='warpper d-flex'>
         <Sidebar collapsed={collapsed} closeSidebar={closeSidebar}/>
         <div className="main-container">
             <Header toggleSidebar={toggleSidebar}  /> 
             <section className='content'>  
               <Outlet /> 
             </section>  
         </div> 
      </div>
    </>
  )
}

export default StudentLayout