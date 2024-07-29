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
<section className="auth-section vh-lg-100 mt-lg-0 bg-light d-flex justify-content-center align-items-center">
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
              <button type="submit" className="btn btn-primary py-2 border border-1"> 
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