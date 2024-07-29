import { useState } from "react"; 
import useAxios from "../../utils/useAxios"; 
import {Spinner} from '../components/Spinner'

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false); 
  const [loading,setLoading]=useState(false);
 
  const validateForm = () => {
    if (!currentPassword) {
      setError("Current password is required.");
      return false;
    }
    if (!newPassword) {
      setError("New password is required.");
      return false;
    }
    if (!confirmPassword) {
      setError("Please confirm your new password.");
      return false;
    }
    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return false;
    }
    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters long.");
      return false;
    }
    return true;
  };

  const handleResetPassword = async (e) => {
    e.preventDefault(); 
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("currentPassword", currentPassword);
    formData.append("newPassword", newPassword);
    formData.append("confirmPassword", confirmPassword);

    try {
      const response = await useAxios().post("/user/password-reset", formData);

      if (response.status === 201) {
        setError(""); 
        setLoading(false);
        setSuccess(true); 
        setCurrentPassword(""); 
        setNewPassword(""); 
        setConfirmPassword("");
      } else if (response.status === 400 && response.data.message === "Incorrect current password") {
        setError("The current password you entered is incorrect."); 
        setLoading(false);
      } else {
        setError(response.data.message || "An error occurred."); 
        setLoading(false);
      }
    } catch (error) {
        setError("An error occurred: " + error.message);
    }finally{ 
        setLoading(false);
    }
  };

return (

<section className="mt-5 d-flex justify-content-center align-items-center">
  <div className="container-fluid">
    <div className="row justify-content-center form-bg-image">
      <div className="col-12 d-flex align-items-center justify-content-center">
        <div className="card shadow border rounded-4 px-4 py-5 px-md-5 w-100 fmxw-500"> 
          <div className="mb-4 text-center">
             <h1 className="h4">Reset password</h1> 
             <small className="text-muted fw-lighter">Your new password must be different from previously used passwords.</small>
         </div> 
         <form action="" onSubmit={handleResetPassword}>
            <div className="form-group mb-4">
              <label className="mb-2" htmlFor="password">Your Password</label>
              <div className="input-group">
                <span className="input-group-text">
                     <i class="fa-solid fa-lock"></i> 
                </span>
                <input type="password" value={currentPassword} placeholder="********" className="form-control" id="password" onChange={(e) => setCurrentPassword(e.target.value)} />
              </div>  
            </div> 
            <div className="form-group mb-4">
              <label className="mb-2" htmlFor="new-password">New Password</label>
              <div className="input-group">
                <span className="input-group-text">
                     <i class="fa-solid fa-lock"></i> 
                </span>
                <input type="password" value={newPassword} placeholder="********" className="form-control" id="new-password" onChange={(e) => setNewPassword(e.target.value)} />
              </div>  
            </div>
            <div className="form-group mb-4">
              <label className="mb-2" htmlFor="confirm-password">Confirm New Password</label>
              <div className="input-group">
                <span className="input-group-text">
                     <i class="fa-solid fa-lock"></i> 
                </span>
                <input type="password" value={confirmPassword} placeholder="********" className="form-control" id="confirm-password" onChange={(e) => setConfirmPassword(e.target.value)} />
              </div>  
            </div> 
            {error && <div className="text-danger text-center">{error}</div>}
            <div className="d-grid">
              <button type="submit" className="btn btn-primary mt-3"> 
              {loading ? <Spinner/> : 'Reset password'}  
               </button>
            </div>
          </form>
        </div>  
        </div> 
    </div>

    {success && (
          <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 100 }}>
            <div className="toast show align-items-center text-bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
              <div className="d-flex">
                <div className="toast-body">
                  Password has been successfully changed.
                </div>
                <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={() => setSuccess(false)} aria-label="Close"></button>
              </div>
            </div>
          </div>
        )} 
      </div> 
    </section>
  );
}

export default ChangePassword;
