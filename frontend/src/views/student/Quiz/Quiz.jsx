import React, { useState, useEffect } from "react";
import useAxios from "../../../utils/useAxios";
import { useParams, useNavigate } from "react-router-dom"; 
import UserData from '../../../views/plugin/UserData.js'; 

import StartPage from './StartPage';
import EndPage from './EndPage';
import QuestionPage from './QuestionPage';
import { MainSpinner } from "../../components/Spinner"; 
import Sidebar from "../Partials/Sidebar";
import Header from "../Partials/Header";

const Quiz = () => { 
  const user = UserData();
  const param = useParams(); 
  
  const navigate = useNavigate();  
  const handleBack = () => navigate(-1); 
  const handleNavigate = () => navigate(`/student/quiz-result/${param.chapterid}`);

  const [step, setStep] = useState(0);
  const [quizid, setQuizId] = useState([]); 
  const [percentage, setPercentage] = useState(0); 
  const [quizLocked, setQuizLocked] = useState(false); 
  const [tabSwitchCount, setTabSwitchCount] = useState(0); 
  const [loading, setLoading] = useState(false); 
  
  const [collapsed, setCollapsed] = useState(false); 
  const toggleSidebar = () => setCollapsed(!collapsed);  
  const closeSidebar = () => setCollapsed(false); 


  const quizStartHandler = () => { 
    setStep(2)    
 }; 
  
  const getQuizIds = async () => { 
    setLoading(true);
    try {
      const response = await useAxios().get(`user/subject/chapterid/${param.chapterid}`); 
      if (response) {
        setQuizId(response.data.chapterquizid);
      } else {
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    } finally { 
      setLoading(false);
    }
  };

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
    }finally { 
      setLoading(false);
    }
  };


  const getQuizLockUpdate = async () => { 
    try {
      const response = await useAxios().get(`user/subject/student_quiz_status/${param.chapterid}`); 
       
      if (!response?.data?.is_blocked ) {
        setStep(1);
      }else{  
        setQuizLocked(response?.data?.is_blocked);   
      }
    } catch (error) {
      console.error(error);
    } 
  };

  const lockStudentQuiz = async (stateAttended) => { 
    setLoading(true);  
    try {
      await useAxios().post(`user/subject/student_quiz_status/${param.chapterid}`, {'attended': stateAttended}); 
    } catch (error) {
      console.error(error);
    } finally { 
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
    getQuizIds(); 
    getQuizLockUpdate();
  }, []);

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [step, tabSwitchCount]); 

  const renderContent = () => {

    if(quizid.length < 5 && !loading ){ 
      return( 
        <div className="text-center my-5" style={{ fontFamily: 'Roboto' }}>  
          <div className='mb-5'>
            <h2 className='mb-4 fs-4 fw-bold'>Sorry, Quiz Not Available</h2> 
            <img src="/file-denied.svg" alt="block-icon" style={{ width: '100px'}} />
          </div>  
          <button className="btn btn-primary" onClick={handleBack}><i class="bi bi-arrow-left"></i> Back</button> 
        </div>
      );
    }

    if (quizLocked) {
      return (
        <div className="d-flex align-items-center justify-content-center my-5" style={{ fontFamily: 'Roboto' }}>
          <div className="text-center">  
            <div className="mb-5">
             <h2 className="mb-4 fs-4 fw-bold">Quiz Locked</h2>
             <p>Sorry, You have navigated away from the quiz more than 2 times. Please contact your admin</p> 
             <img src="/padlock.svg" alt="Lock" style={{width:'150px'}} /> 
           </div>
            <button className="btn btn-primary" onClick={handleBack}><i class="bi bi-arrow-left"></i> Back</button> 
          </div> 
        </div>
      );
    }

    if (step === 1) {
      return <StartPage quizidLength={quizid.length} onQuizStart={quizStartHandler} handleBack={handleBack} />;
    }

    if (step === 3) {
      return <EndPage percentage={percentage} handleNavigate={handleNavigate} />;
    }

    return null;
  };

  return (
    <> 
      {step === 2 && !quizLocked ? (
        <section className="section px-1 px-lg-5 py-4 py-lg-5">
          <div className='container'>   
            <div className="d-flex align-items-top justify-content-between mb-2">   
              <div className="d-block d-sm-flex align-items-center"> 
              <img src="/wings-red.png" alt="wings-red" style={{ width: '50px', height: '50px' }}/> 
              <div className="mt-3 mt-sm-0 ms-2">
                <div><small className="fw-semibold pe-2">SUBJECT:</small><small>{param.title}</small></div>
                <div><small className="fw-semibold pe-2">CHAPTER:</small><small>{param.chapterName}</small></div>  
              </div>
             </div>
             <img src={user.user_image} className="img avatar-md rounded-circle" alt="user-img"/>  
            </div> 
            <QuestionPage quizid={quizid} handleFinalSubmit={handleFinalSubmit} /> 
          </div>
        </section> 
      ) : ( 
        <div className='warpper d-flex'>
          <Sidebar collapsed={collapsed} closeSidebar={closeSidebar} />
          <div className="main">
            <Header toggleSidebar={toggleSidebar} /> 
            <main className='content'> 
              <section className="section px-2 px-lg-5 py-4">
                <div className="container">    
                 {loading ? (<div className="my-5"><MainSpinner /></div>):(renderContent())}
                </div>  
              </section>     
            </main>  
          </div> 
        </div>  
      )}
    </>
  );
};

export default Quiz;
