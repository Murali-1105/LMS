import React from 'react'  
import UserData from '../../views/plugin/UserData.js';
import { MainSpinner } from '../components/Spinner.jsx';

const Dashboard = () => {
  const user =UserData();  

  return (
    <section className="section px-2 px-lg-5 py-4">
    <div className="container-fluid">  
         <h4 className="my-4"><i className="bi bi-grid-1x2-fill fs-5 pe-2"></i>Dashboard</h4>  
                 <div className="row">
                     <div className="col-12 col-sm-6 col-xl-4 d-flex">
                         <div className="card flex-fill border shadow-sm" style={{background:'rgba(5, 111, 146,0.5)', borderColor:'rgb(5, 111, 146)',color:'#fff'}}>
                             <div className="row g-0">
                                 <div className="col-8 d-flex align-items-center">
                                     <div className="card-body flex-grow-1">
                                         <div className="p-2">
                                             <h6 className="">Welcome Back, {user.username}</h6>
                                             <p className="mb-0 text-muted fw-semibold">{user.college}</p>
                                         </div>
                                     </div> 
                                    </div>
                                     <div className="col-4">
                                         <img src={user.user_image} className="img-fluid avatar-profile rounded-end-2" alt="user-img" />
                                     </div>
                             </div>
                         </div>
                     </div>
                     <div className="col-12 col-sm-6 col-xl-4 d-flex">
                         <div className="card flex-fill border shadow-sm">
                             <div className="card-body">
                                 <div className="d-flex align-items-center justify-content-between">
                                     <div className="p-3 flex-grow-1">
                                         <h4 className="mb-1">0</h4>
                                         <p className="mb-0 text-muted fw-semibold">Total Subjects</p>
                                         {/* <div className="mb-0">
                                             <span className="text-muted">
                                              Since Last Month
                                             </span>
                                         </div>  */}
                                     </div>  
                                        <div className="">
                                          <img src="/books-svgrepo-com.svg" alt="subject-svg" className="img-fluid avatar-lg" />
                                        </div>
                                    </div>
                                 </div>
                            </div> 
                         </div>  
                     <div className="col-12 col-sm-6 col-xl-4  d-flex">
                         <div className="card flex-fill border shadow-sm">
                             <div className="card-body">
                                 <div className="d-flex align-items-center justify-content-between">
                                     <div className="p-3 flex-grow-1">
                                         <h4 className="mb-1">0</h4>
                                         <p className="mb-0 text-muted fw-semibold">Total Students</p>
                                         {/* <div className="mb-0">
                                             <span className="text-muted">
                                                 Since Last Month
                                             </span>
                                         </div> */}
                                    </div>
                                    <div className="">
                                       <img src="/graduation-student.svg" alt="subject-svg" className="img-fluid avatar-lg" />
                                    </div>
                                </div>
                             </div>
                         </div>  
                       </div>
                   </div>  
         </div> 
    </section>
  )
}

export default Dashboard