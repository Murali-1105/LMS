import React, { useState, useEffect } from 'react';
import { Alert} from 'react-bootstrap';  
import "./Css/Alerts.css" 
 
 
const iconMap = {
    success: 'bi-check-circle-fill',
    danger: 'bi-exclamation-circle-fill',
    info: 'bi-info-circle-fill',
    warning: 'bi-exclamation-triangle-fill',
  };
  


const Alerts = ({ message, variant, onClose, duration = 5000 }) => {   
    const [progress, setProgress] = useState(100); 

    useEffect(() => {
        const timer = setTimeout(onClose, duration); 
        const interval = setInterval(() => {
            setProgress((prev) => (prev > 0 ? prev - 100 / (duration / 100) : 0));
          }, 100);

        return () => { 
           clearTimeout(timer); 
           clearInterval(interval); 
        };
    }, [onClose, duration]); 
     

    return ( 
     <div className="alert-container">
       <div className={`alert-box alert-${variant}`}> 
         <div className='px-4 pt-1 pb-2'>
           <i className={`bi ${iconMap[variant]} text-white me-2`}></i>
           {message}
           <span className="closebtn" onClick={onClose}>&times;</span> 
        </div>
        <div className={`progress bg-${variant}-subtle m-0`}>
          <div
            className={`progress-bar alert-${variant}`}
            role="progressbar"
            style={{ width: `${progress}%` }}
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
          />
        </div>
      </div> 
     </div>
      
    );
}; 
 
export default Alerts;
