import React from 'react'  
import { Link } from 'react-router-dom'


const Error500 = () => {
  return (
    <section className="vh-100 d-flex align-items-center justify-content-center">
  <div className="container">
    <div className="row align-items-center ">
      <div className="col-12 col-lg-5 order-2 order-lg-1 text-center text-lg-left">
        <h1 className="mt-5">Something has gone <span className="text-primary">seriously</span> wrong</h1>
        <p className="lead my-4">It's always time for a coffee break. We should be back by the time you finish your coffee.</p>
        <Link to={'/student/dashboard'} className="btn btn-gray-800 d-inline-flex align-items-center justify-content-center mb-4">
          <i class="bi bi-arrow-left me-2"></i>
          Back to homepage
        </Link>
      </div>
      <div className="col-12 col-lg-7 order-1 order-lg-2 text-center d-flex align-items-center justify-content-center">
        <img className="img-fluid w-75" src="/illustrations/500.svg" alt="500 Server Error" />
      </div>
    </div>
  </div>
</section>

  )
}

export default Error500