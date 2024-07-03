import React from 'react' 
import "./Spinner.css"

export const Spinner = () => {
  return (
 <div className="d-flex justify-content-center">
    <div className="spinner-border" role="status" style={{ width: '1.5rem', height: '1.5rem' }}>
      <span className="visually-hidden">Loading...</span>
    </div>
 </div> 
  )
}

export const MainSpinner = () => { 

  return (
    <div className="d-flex justify-content-center aligan-items-center mt-5">
     <span className="main-spinner"></span>
    </div>
  )
}
