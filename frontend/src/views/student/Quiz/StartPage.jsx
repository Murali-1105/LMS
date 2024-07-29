import React, { useState, useEffect } from "react"; 
import { formatTimeQuiz  } from "../../../assets/Helper";

const QuizInstructions = ({ quizidLength, onQuizStart, handleBack }) => {
  const [isStartDisabled, setIsStartDisabled] = useState(false);
  const [counter, setCounter] = useState(10);
  const [countdownStarted, setCountdownStarted] = useState(false);

  useEffect(() => {
    if (countdownStarted) {
      const timer = setInterval(() => {
        setCounter((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsStartDisabled(false);
            onQuizStart();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [countdownStarted, onQuizStart]);

  const startCountdown = () => {
    setCountdownStarted(true);
    setIsStartDisabled(true);
  };

  return (
    <div className="d-flex align-items-center justify-content-center my-5" style={{ fontFamily: "Roboto" }}>
      {countdownStarted ? (
        <div>
          <div className="text-primary fs-5 fw-semibold">Test starts in : {counter}</div>
          <div class="hourglassBackground">
            <div class="hourglassContainer">
              <div class="hourglassCurves"></div>
              <div class="hourglassCapTop"></div>
              <div class="hourglassGlassTop"></div>
              <div class="hourglassSand"></div>
              <div class="hourglassSandStream"></div>
              <div class="hourglassCapBottom"></div>
              <div class="hourglassGlass"></div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="text-center">
            <img
              src="/wings-red.png"
              alt="Red wings logo"
              className="img-fluid mb-5"
              style={{ width: "150px" }}
            />
          </div>
          <div>
            <h5 className="fw-semibold">Instructions:</h5>
            <ul className="mt-3">
              <li>1. You will have only  {formatTimeQuiz (120 * quizidLength)} for the entire quiz.</li>
              <li>2. Do not open a new tab or window during the test.</li>
              <li>3. You can't select any option once time goes off.</li>
              <li>4. All questions consist of 1 mark.</li>
            </ul>
            <div className="mt-4">
              <div className="float-end ">
                <button
                  className="btn btn-sm btn-primary px-4"
                  onClick={startCountdown}
                  disabled={isStartDisabled}
                >
                  Start
                </button>
                <button
                  className="btn btn-sm btn-danger px-3 ms-3"
                  onClick={handleBack}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizInstructions;
