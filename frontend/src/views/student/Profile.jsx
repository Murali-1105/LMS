import React, { useState } from 'react'; 
import UserData from '../plugin/UserData.js';

const Profile = () => { 
    const [activeSelect, setActiveSelect] = useState(null);
    const [error, setError] = useState({});
    const user = UserData();  

    const handleChange = () => { 

    }

    const handleSubmit = (e) => {
        e.preventDefault(); 

        if (!validateForm()) { 
            setError((prevError) => ({ ...prevError, form: 'Please correct the errors before submitting.' }));
            return;
        } 

        // Proceed with form submission
        setError({});
    };

    const validateForm = () => {
        let isValid = true;
        let newError = {};

        if (!userData.email.includes('@')) {
            newError.email = 'Invalid email address'; 
            isValid = false;
        }
        if (userData.phone.length < 10) { 
            newError.phone = 'Phone number must be at least 10 digits'; 
            isValid = false;
        }

        setError(newError);
        return isValid;
    };

    const handleSelectClick = (index) => {
        setActiveSelect(index);
    };

    const handleBlur = () => {
        setActiveSelect(null);
    };

    return ( 
    <section className="section px-0 px-sm-2 px-lg-5 py-4">
        <div className="container-fluid">
            <div className="card shadow-sm py-3 px-2 px-lg-5">
                <div className="row card-body media d-flex align-items-center justify-content-between mb-4">  
                  <div className='col'><h1 className='fs-3'>Hi, <br/><span className='fw-bold text-success'>{user.username}</span></h1></div>  
                  <div className='col d-flex align-items-center justify-content-end'>
                    {/* <div className="media-body text-end ml-4">
                        <label className="me-2 btn btn-outline-primary btn-sm">
                            Update<input type="file" className="d-none"/>
                        </label>
                        <div className="small mt-2">Allowed JPG or PNG. Max size of 800K</div>
                    </div>   */}  
                    <div className='position-relative'>
                       <img src={user.user_image} alt="user-img" className="img-fluid rounded-circle shadow-sm avatar-xxl border p-1" />   
                       <div className='position-absolute bottom-0 courser-pointer' style={{ right : '5px'}} onChange={handleChange}>   
                        <label htmlFor="profile-photo"><i class="bi bi-camera-fill fs-4"></i>
                        <input type="file" id="profile-photo" accept="image/*" className='d-none' /></label>
                      </div> 
                    </div>
                  </div>
                </div>
                <hr className="m-0" />
                <div className="card-body mt-3">
                    <h4 className='mb-5'>Personal Details</h4>
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="row">
                            <div className="form-group col-12 col-md-6">
                                <label className="form-label">First Name</label>
                                <input type="text" name="firstName" value={user.firstName} onChange={handleChange} className="form-control mb-3" />
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label className="form-label">Last Name</label>
                                <input type="text" name="lastName" value={user.lastName} onChange={handleChange} className="form-control mb-3" />
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label className="form-label">E-mail</label>
                                <input type="email" name="email" value={user.email} onChange={handleChange} className={`form-control mb-3 ${error.email ? 'is-invalid' : ''}`}/>
                                {error.email && <div className="invalid-feedback">{error.email}</div>}
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label className="form-label">Phone</label>
                                <input type="text" name="phone" value={user.phone} onChange={handleChange} className={`form-control mb-3 ${error.phone ? 'is-invalid' : ''}`} />
                                {error.phone && <div className="invalid-feedback">{error.phone}</div>}
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label className="form-label">Date of Birth</label>
                                <input type="date" name="birthday" value={user.birthday} onChange={handleChange} className="form-control mb-3" />
                            </div> 
                            <div className="form-group col-12 col-md-6">
                                <label className="form-label">Gender</label> 
                                <div className="select-wrapper">
                                <select name="gender" value={user.gender} onChange={handleChange}  onClick={() => handleSelectClick(1)} onBlur={handleBlur} className="form-control mb-3"> <option>Select gender</option> <option>Male</option> <option>Female</option>
                                </select>  
                                <i className={`fas fa-chevron-down select-icon ${activeSelect === 1 ? 'rotate' : ''}`}></i> 
                               </div>
                            </div>
                            <div className="form-group col-12">
                                <label className="form-label">Address</label>
                                 <textarea className="form-control mb-3" rows="5" name='address'  value={user.address} onChange={handleChange}> 
                                 </textarea>
                             </div> 
                             <div className="form-group col-12 col-md-6">
                                <label className="form-label">State</label> 
                                <div className="select-wrapper">
                                <select name="state" value={user.state} onChange={handleChange}   onClick={() => handleSelectClick(2)} onBlur={handleBlur} className="form-control mb-3">
                                    <option>Select state</option>
                                    <option>Tamilnadu</option>
                                    <option>UK</option>
                                    <option>Germany</option>
                                    <option>France</option>
                                </select> 
                                <i className={`fas fa-chevron-down select-icon ${activeSelect === 2 ? 'rotate' : ''}`}></i>  
                                </div>
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label className="form-label">Country</label> 
                                <div className="select-wrapper">
                                <select name="country" value={user.country} onChange={handleChange}  onClick={() => handleSelectClick(3)} onBlur={() => setActiveSelect(false)} className="form-control mb-3" >
                                    <option>Select country</option>
                                    <option>India</option>
                                    <option>UK</option>
                                    <option>Germany</option>
                                    <option>France</option>
                                </select>  
                                <i className={`fas fa-chevron-down select-icon ${activeSelect === 3 ? 'rotate' : ''}`}></i>  
                              </div>
                            </div>
                        </div>
                        <div className="text-end mt-4">
                           <button type="submit" className="btn btn-sm btn-primary me-2">Save changes</button>&nbsp;
                           <button type="button" className="btn btn-sm btn-secondary">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div> 
     </section>
    );
};

export default Profile;
