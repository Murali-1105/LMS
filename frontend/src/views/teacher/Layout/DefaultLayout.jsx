import React, { useState } from 'react';
import { Outlet } from 'react-router-dom'; 
import Sidebar from "../Partials/Sidebar";
import Header from "../Partials/Header";

const DefaultLayout = () => {    

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
         <div className="main">
             <Header toggleSidebar={toggleSidebar}  /> 
             <main className='content'>  
               <Outlet/>  
             </main>  
         </div> 
      </div>
    </>
  )
}

export default DefaultLayout