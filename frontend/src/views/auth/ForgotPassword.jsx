import React,{useState} from 'react'
import {Spinner} from '../../views/components/Spinner'
import { Link } from 'react-router-dom'


function ForgotPassword() { 
  const[email,setEmail]=useState("");
  const [isLoading,setIsLoading]=useState(false);  
   
  const handleRecover= () => { 
    setIsLoading(true)
  }

  return (
    <>

   {/* <section className="container d-flex flex-column vh-100" style={{ marginTop: "150px" }}>
        <div className="row align-items-center justify-content-center g-0 h-lg-100 py-8">
          <div className="col-lg-5 col-md-8 py-8 py-xl-0">
            <div className="card shadow">
              <div className="card-body p-6">
                <div className="mb-4">
                  <h1 className="mb-1 fw-bold">Forgot Password</h1>
                  <span>
                    Let's help you get back into your account
                  </span>
                </div>
                <form className="needs-validation" noValidate="">
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      name="email"
                      placeholder="johndoe@gmail.com"
                      required=""
                    />
                  </div>

                  <div>
                    <div className="d-grid"> 
                    <Link to="/create-new-password">
                      <button type="submit" className="btn btn-primary">
                        Reset Password <i className='fas fa-arrow-right'></i>
                      </button> 
                    </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>    */} 
<section className="auth-section vh-lg-100 mt-5 mt-lg-0 bg-light d-flex justify-content-center align-items-center">
  <div className="container">
    <div className="row justify-content-center form-bg-image">
      <div className="col-12 d-flex align-items-center justify-content-center">
        <div className="auth-card my-3 my-lg-0 rounded-4 p-4 p-md-5 w-100 fmxw-500">
          <h1 className="h3">Forgot your password?</h1>
          <p className="mb-4">Don't fret! Just type in your email and we will send you a code to reset your password!</p>
          <form action="" onSubmit={handleRecover}>
            <div className="mb-4">
              <label className='mb-2' htmlFor="email">Your Email</label>
              <div className="input-group">
                <input type="email" value={email} className="form-control" id="email" placeholder="example@gmail.com" required autofocus onChange={(e)=>setEmail(e.target.value)} />
              </div>  
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary"> 
                {isLoading ? <Spinner/> : 'Recover password'}  
              </button>
            </div>
          </form>
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

export default ForgotPassword