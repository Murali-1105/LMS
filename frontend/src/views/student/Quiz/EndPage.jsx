import React, { useRef, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import "../Css/Quiz.css"; 

const EndPage = ({ percentage, handleNavigate }) => {
  const progressBarRef = useRef(null); 
  const navigate = useNavigate()

  useEffect(() => {
    if (progressBarRef.current) {
      const progressValue = percentage;
      const progressLeft = progressBarRef.current.querySelector('.progress-left .progress-bar');
      const progressRight = progressBarRef.current.querySelector('.progress-right .progress-bar');
      const keyframesStyle = document.createElement('style');

      if (progressValue > 0) {
        if (progressValue <= 50) {
          keyframesStyle.innerHTML = `
            @keyframes loadingRight {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(${(progressValue / 100) * 360}deg);
              }
            }
          `;
          progressRight.style.animation = `loadingRight 1.5s linear forwards`;
          progressLeft.style.transform = 'rotate(0deg)';
        } else {
          keyframesStyle.innerHTML = `
            @keyframes loadingRight {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(180deg);
              }
            }
            @keyframes loadingLeft {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(${((progressValue - 50) / 100) * 360}deg);
              }
            }
          `;
          progressRight.style.animation = `loadingRight 1.5s linear forwards`;
          progressLeft.style.animation = `loadingLeft 1.5s linear forwards 1.5s`;
        }
      } else {
        progressRight.style.transform = 'rotate(0deg)';
        progressLeft.style.transform = 'rotate(0deg)';
      }

      document.head.appendChild(keyframesStyle);
      return () => {
        document.head.removeChild(keyframesStyle);
      };
    }
  }, [percentage]); 
   
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{fontFamily: 'Roboto'}} >
      <div className='my-5 text-center'>
        <div className="">  
          <div className='d-flex align-items-center justify-content-center py-3'>
            <h2 className="fs-3 fw-semibold">Congratulations, Test Completed!</h2>  
          </div>
          <p className="fs-6">Your Score</p>
        </div>
        <div className="circle-progress mt-3">
          <div className="progress" ref={progressBarRef} data-value={percentage}>
            <span className="progress-left">
              <span className="progress-bar"></span>
            </span>
            <span className="progress-right">
              <span className="progress-bar"></span>
            </span>
            <div className="progress-value">{Math.floor(percentage)}%</div>
          </div>
        </div>
        <div className="mt-5 align-cneter d-block place-center">
          <button className="btn btn-secondary me-3" onClick={handleBack}><i class="bi bi-arrow-left fs-6 pe-1"></i>Back</button>
          <button className="btn btn-primary" onClick={handleNavigate}><i class="bi bi-journal-text"></i> Result</button> 
        </div>
      </div>
    </div>
  );
};

export default EndPage;
