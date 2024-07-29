import React from 'react' 
import "./Css/Spinner.css"

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
    <div className="d-flex justify-content-center aligan-items-center">
      <svg viewBox="25 25 50 50">
        <circle r="20" cy="50" cx="50"></circle>
      </svg>
    </div>
  )
}
