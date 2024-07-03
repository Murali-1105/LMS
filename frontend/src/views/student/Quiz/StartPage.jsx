import React from 'react'

const StartPage = ({ onQuizStart }) => {
  return (
    <> 
      <div className="d-flex align-items-center justify-content-center my-5">   
         <div className="">   
            <div className="text-center"> 
             <img src="/wings-red.png" alt="" className="img-fluid mb-5" style={{width :'180px'}} />
           </div>
         <div>
         <span className="fw-bold ">Instructions:</span>
            <ul className="mt-3"> 
             <li>1. You will have only 120 seconds per each question.</li> 
             <li>2. Do not open a new tab or window during the test.</li>
             <li>3. You can't select any option once time goes off.</li>
             <li>4. All questions consist of 1 mark.</li></ul> 
            <button className="btn btn-primary mt-3 px-4 float-end" onClick={onQuizStart}>Start</button>  
            </div> 
          </div> 
      </div>  
    </>
  )
}

export default StartPage