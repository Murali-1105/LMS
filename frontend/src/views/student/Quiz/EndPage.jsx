import React, { useRef, useEffect } from 'react'; 
import "../Css/Quiz.css"  
 
const EndPage = ({ percentage, handleNavigate }) => {
  const progressBarRef = useRef(null);

  useEffect(() => {
    const progressElement = progressBarRef.current;
    if (!progressElement) return;

    const value = parseInt(percentage, 10);
    const rightBar = progressElement.querySelector('.progress-right .progress-bar');
    const leftBar = progressElement.querySelector('.progress-left .progress-bar');

    if (value > 0) {
      if (value <= 50) {
        rightBar.style.transform = `rotate(${percentageToDegrees(value)}deg)`;
      } else {
        rightBar.style.transform = 'rotate(180deg)';
        leftBar.style.transform = `rotate(${percentageToDegrees(value - 50)}deg)`;
      }
    }
  }, [percentage]);

  const percentageToDegrees = (percentage) => {
    return (percentage / 100) * 360;
  }; 
 

  return (
    <>
      <div className="d-flex align-items-center justify-content-center my-5">
        <div className="">
          <div className="text-center mt-5">
            <h2 className="fs-4 fw-semibold pb-4">Quiz Completed</h2>
            <p className="fs-6">Your Score</p>
          </div>
          <div className="circle-progress my-4">
            <div className="progress blue" ref={progressBarRef} data-value={percentage}>
              <span className="progress-left">
                <span className="progress-bar"></span>
              </span>
              <span className="progress-right">
                <span className="progress-bar"></span>
              </span>
              <div className="progress-value">{Math.floor(percentage)}%</div>
            </div>
          </div>
          <div className="pt-2">
            <button className="btn btn-primary" onClick={handleNavigate}>Check your Answers</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EndPage;
