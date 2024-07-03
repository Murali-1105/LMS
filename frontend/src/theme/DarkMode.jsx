import React ,{ useEffect } from "react";
import "./DarkMode.css";

const DarkMode = () => { 
     
    const setDarkMode = () => { 
        document.querySelector("body").setAttribute('data-bs-theme' , 'dark') 
        localStorage.setItem("selectedTheme","dark");
    } 
     
    const setLightMode = () => { 
        document.querySelector("body").setAttribute('data-bs-theme' , 'light') 
        localStorage.setItem("selectedTheme","light");
    } 
     
    const selectedTheme = localStorage.getItem("selectedTheme"); 
     
    useEffect(() => {
        if (selectedTheme === "dark") {
            setDarkMode();
        } else {
            setLightMode();
        }
    }, [selectedTheme]); 
 
    const toggleTheme = (e) => { 
       if(e.target.checked){  
          setDarkMode();  
       }else {  
          setLightMode(); 
       }
    } 

    return (
       <div className='theme-toggle d-flex me-2'> 
         <input type="checkbox" className="checkbox" id="checkbox" onChange={toggleTheme} defaultChecked={selectedTheme === 'dark'} />
           <label for="checkbox" className="checkbox-label">  
               <i className="bi bi-sun-fill"></i>
               <i class="bi bi-moon-stars-fill"></i>
               <span className="ball"></span>
           </label>
       </div> 
    );
};

export default DarkMode;
