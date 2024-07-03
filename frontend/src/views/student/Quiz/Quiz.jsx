import React, { useState, useEffect } from "react";
import useAxios from "../../../utils/useAxios";
import { useParams, useNavigate } from "react-router-dom";

import StartPage from './StartPage';
import EndPage from './EndPage';
import QuestionPage from './QuestionPage';
import { MainSpinner } from "../../components/Spinner";

const Quiz = () => {
  const [step, setStep] = useState(1);
  const [quizid, setQuizId] = useState([]);
  const [percentage, setPercentage] = useState(0); 
  const [quizLocked, setQuizLocked] = useState(false); 
  const [tabSwitchCount, setTabSwitchCount] = useState(0); 
  const [loading, setLoading] = useState(false); 
  const param = useParams();
  const navigate = useNavigate();

  const quizStartHandler = () => {
    setStep(2);
  };

  const getQuizIds = async () => { 
    setLoading(true);
    try {
      const response = await useAxios().get(`user/subject/chapterid/${param.chapterid}`);
      if (response) {
        setQuizId(response.data.chapterquizid);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error(error);
    }finally{ 
      setLoading(false);
    }
  };

  useEffect(() => {
    getQuizIds(); 
    getQuizLockUpdate();
  }, []);

  const handleFinalSubmit = async () => { 
    setLoading(true); 
    const formData = new FormData();
    formData.append('chapter_id', param.chapterid);

    try {
      const response = await useAxios().post("user/subject/quiz/evaluate_progress/", formData);
      if (response.status === 201) {
        setPercentage(response.data.progress);
        setStep(3);   
        lockStudentQuiz(true);
      } else {
        console.error('Error submitting final progress:', response);
      }
    } catch (error) {
      console.error(error);
    }finally{ 
      setLoading(false);
    }
  };

  const handleNavigate = () => {
    navigate(`/student/quiz-result/${param.chapterid}`);
  };

  const getQuizLockUpdate = async () => { 
    setLoading(true);
    try {
      const response = await useAxios().get(`user/subject/student_quiz_status/${param.chapterid}`);
      setQuizLocked(response?.data?.is_blocked); 
      console.log(response)
    } catch (error) {
      console.error(error);
    }finally{ 
      setLoading(false);
    }
  };

  const lockStudentQuiz = async (stateAttended) => { 
    setLoading(true);  

    try {
      await useAxios().post(`user/subject/student_quiz_status/${param.chapterid}`,{'attended': stateAttended}); 
    } catch (error) {
      console.error(error);
    }finally{ 
      setLoading(false);
    }
  };

  const handleVisibilityChange = () => {
    if (document.hidden && step === 2) {
      if (tabSwitchCount < 2) {
        setTabSwitchCount(prevCount => prevCount + 1);
        alert(`Warning: You have switched tabs ${tabSwitchCount + 1} times. After 2 warnings, the quiz will be locked.`);
      } else {
        lockStudentQuiz(false);
        setQuizLocked(true);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [step, tabSwitchCount]); 
   


  return (
    <section className="section px-2 px-lg-5 py-4">
      <div className='container-fluid'>
        {step === 1 && <StartPage onQuizStart={quizStartHandler} />}

        {quizLocked && step === 2  ? (
              <div className="d-flex align-items-center justify-content-center my-5">
                <div className="text-center">
                  <h2 className="mb-4 fs-4 fw-bold">Quiz Locked</h2>
                  <p>Sorry, You have navigated away from the quiz more then 2 times. Please contact your admin</p> 
                  <span><i className="bi bi-file-earmark-lock fs-1 text-danger"></i></span>
                </div> 
              </div>
        ) : (
          step === 2 && (
            <QuestionPage
              quizidLength={quizid.length}
              quizid={quizid}
              handleFinalSubmit={handleFinalSubmit}
            />
          )
        )}

        {step === 3 && (
          <EndPage
            percentage={percentage}
            handleNavigate={handleNavigate}
          />
        )} 
         {loading && <MainSpinner/> }
      </div>
    </section>
  );
};

export default Quiz;
