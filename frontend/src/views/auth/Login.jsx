import { login } from '../../utils/auth'  
import { useState } from 'react'    
import { Link,useNavigate } from 'react-router-dom'  
import {Spinner} from '../../views/components/Spinner'
import "./Css/Auth.css" 
import { userType } from '../../utils/constants'  
import { useAuthStore } from '../../store/auth'
 

function Login() {
  const[username,setUsername]=useState("");
  const[password,setPassword]=useState("");
  const [isLoading,setIsLoading]=useState(false);


  const setUser = useAuthStore(state => state.setUser);
  // const usertype = useAuthStore(state => state.user().usertype);
 


  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { data, error } = await login(username, password);
    const usertype = data?.user_type;
    if (error) {
      setIsLoading(false);
      alert(error);
    } else {
      setUser(data);
        if (usertype === 'student') {
          navigate('/student/dashboard/');
        } else if (usertype === 'teacher') {
          navigate('/teacher/dashboard/');
        }
      setIsLoading(false);
    }
  };

  console.log(userType)
  return (
    <>   
<section className="auth-section bg-dark vh-lg-100 d-flex align-items-center">
  <div className="container-fluid">
    <div className="row justify-content-center ">
      <div className="col-12 d-flex align-items-center justify-content-center">
        <div className="auth-card rounded-4 px-4 py-5 px-md-5 w-100 fmxw-500">
          <div className="text-center text-md-center mb-4 mt-md-0">
            <div className="mb-0 h3"><img src="/MH_COCKPIT_LOGO.png" alt="MH_COCKPIT" className='img-fluid w-100 fmxw-200'/></div>
          </div>
          <form action="#" className="mt-4" onSubmit={handleSubmit}>
            <div className="form-group mb-4">
              <label className='mb-2' htmlFor="email">Username</label>
              <div className="input-group">
                <span className="input-group-text" id="basic-addon1"> 
                  <i class="fa-solid fa-user"></i>
                 </span>
                <input type="text" className="form-control" value={username} placeholder="Enter Your Username" id="email"  onChange={(e) => setUsername(e.target.value)} autofocus required />
              </div>  
            </div>
              <div className="form-group mb-4">
                <label className='mb-2' htmlFor="password">Password</label>
                <div className="input-group">
                  <span className="input-group-text" id="basic-addon2">
                    <i class="fa-solid fa-lock"></i> 
                  </span>
                  <input type="password" className="form-control" placeholder="Enter Your Password" value={password}  id="password" onChange={(e) => setPassword(e.target.value)} required />
                </div>  
              </div>
              <div className="d-flex justify-content-between align-items-top mb-4">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" defaultValue id="remember" />
                  <label className="form-check-label mb-0" htmlFor="remember">
                    Remember me
                  </label>
                </div>
                <div><Link to="/forgot-password" className="small text-right text-light">Lost password?</Link></div>
              </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary py-2 border border-1" disabled={isLoading}>  
                {isLoading ? <Spinner/> : 'Sign in'} 
              </button> 
              <small className='text-center mt-4'>Copyright © MH Cockpit Pvt. Ltd. 2024</small>
            </div> 
          </form>
        </div>
      </div>
    </div>
  </div>
</section>

    </>
  )
}

export default Login