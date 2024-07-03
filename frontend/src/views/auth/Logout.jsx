import React from 'react'  
import { Link } from "react-router-dom";   
import "./Css/Auth.css"

function Logout() {
  return (
    <>
<section className="auth-section vh-lg-100 mt-lg-0 bg-light d-flex justify-content-center align-items-center">
  <div className="container">
    <div className="row justify-content-center form-bg-image">
      <div className="col-12 d-flex align-items-center justify-content-center">
        <div className="auth-card text-center my-3 my-lg-0 rounded-4 p-4 p-md-5 w-100 fmxw-500">
          <div className="mb-4 h3"><img src="/MH_COCKPIT_LOGO.png" alt="MH_COCKPIT" className='img-fluid w-100 fmxw-300' /></div>
          <p className="mb-2">You have been logged out!</p> 
          <span className='fs-3'>😔</span>
        </div>
      </div> 
      <p className="text-center mt-4"><Link to="/" className="d-flex align-items-center justify-content-center"> 
        <i class="bi bi-arrow-left me-2"></i>
           Back to log in
        </Link>
      </p>
    </div>
  </div>
</section>
    </>
  )
}

export default Logout