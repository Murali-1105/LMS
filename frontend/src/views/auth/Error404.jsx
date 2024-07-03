import React from 'react' 
import { Link } from 'react-router-dom'

const Error404 = () => {
  return (
  <section className="vh-100 d-flex align-items-center justify-content-center">
  <div className="container">
    <div className="row">
      <div className="col-12 text-center d-flex align-items-center justify-content-center">
        <div>
          <img className="img-fluid w-75" src="/illustrations/404.svg" alt="404 not found" />
          <h1 className="mt-5">Page not <span className="fw-bolder text-primary">found</span></h1>
          <p className="lead my-4">Oops! Looks like you followed a bad link. If you think this is a problem with us, please tell us.</p>
          <Link to={'/student/dashboard'} className="btn btn-gray-800 d-inline-flex align-items-center justify-content-center mb-4">
            <i class="bi bi-arrow-left me-2"></i>
             Back to homepage
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>

  )
}

export default Error404