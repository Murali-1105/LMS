import React, { useState, useEffect } from 'react';
import useAxios from '../../../utils/useAxios'; 
import "../Css/Quiz.css"  
import { MainSpinner } from '../../components/Spinner'; 
import { useNavigate } from 'react-router-dom';  
import { formatTime } from "../../../assets/Helper";

const QuestionPage = ({ quizid, handleFinalSubmit}) => {
  const [selectedOptions, setSelectedOptions] = useState(Array(quizid.length).fill("")); 
  const [markedQuestions, setMarkedQuestions] = useState(Array(quizid.length).fill(false));
  const [index, setIndex] = useState(0);
  const [error, setError] = useState(''); 
  const [loading, setLoading] = useState(false); 
  const [time, setTime] = useState(120 * quizid.length);
  const [question, setQuestion] = useState(""); 
  const [image, setImage] = useState("");
  const [choiceA, setChoiceA] = useState("");
  const [choiceB, setChoiceB] = useState("");
  const [choiceC, setChoiceC] = useState("");
  const [choiceD, setChoiceD] = useState("");   
  const navigate = useNavigate(); 
  
  useEffect(() => {
    const handleBeforeUnload = (e) => { 
      e.preventDefault();
      e.returnValue = 'Sorry, you cannot reattempt the exam.';  
      navigate(-1);
    }; 

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [navigate]);     

  useEffect(() => {
    if (index < quizid.length && time > 0) {
      const interval = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else if (time === 0) {
      handleFinalSubmit();
    }
  }, [time, index, quizid.length, handleFinalSubmit]);

  useEffect(() => { 
    const getQuiz = async () => { 
      setLoading(true);
      try {
        const response = await useAxios().get(`user/subject/quiz/${quizid[index]}`);
        if (response) {  
          setQuestion(response.data.question); 
          setImage(response.data.question_image);
          setChoiceA(response.data.choice_a);
          setChoiceB(response.data.choice_b);
          setChoiceC(response.data.choice_c);
          setChoiceD(response.data.choice_d);  
        } else {
          console.error(response);
        }
      } catch (error) {
        console.error(error);
      } finally{ 
        setLoading(false)
      }
    };

    getQuiz();
  }, [index, quizid]); 
   
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (time <= 0) {
      setError('Time is up!');
      return;
    }

    const formData = new FormData();
    formData.append('selected_option', selectedOptions[index]);

    try {
      const response = await useAxios().post(`user/subject/quiz/evaluate/${quizid[index]}`, formData);

      if (response.status === 201) {
        if (index < quizid.length - 1) {
          setIndex((prevIndex) => prevIndex + 1);
        } else {   
          let allSelected = true;
          selectedOptions.forEach((option, idx) => {
            if (option === '') { 
              setError("Please select an option for each question");
              allSelected = false;
            }
          })  
          
          if (allSelected) {  
            setError('')
            handleFinalSubmit(); 
          } 
        }
      } else {
        console.error('Error evaluating quiz:', response);
      }
    } catch (error) {
      console.error(error);
    }
  };   
   
  const handleQuestionChange = async (newIndex) => {
    if (selectedOptions[index] !== '' && index < quizid.length - 1) {
      await handleSubmit();
    }
    setIndex(newIndex);
  };
   
  const handleOptionChange = (option) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[index] = option;
    setSelectedOptions(updatedOptions);   
  };

  const handleBack = () => {  
    if (index > 0) {   
      setIndex((prevIndex) => prevIndex - 1);
    }
  }

  const toggleMarkQuestion = (idx) => {
    const updatedMarkedQuestions = [...markedQuestions];
    updatedMarkedQuestions[idx] = !updatedMarkedQuestions[idx];
    setMarkedQuestions(updatedMarkedQuestions);
  };
   
  return (
    <> 
    <div className='row my-4'> 
      <div className='col-12 col-lg-8'>
        <div className="card question-box rounded-3 shadow-sm">
          <div className="timer">
            <div className="progress rounded-top-5" style={{ height: '5px' }}>
              <div
                className="progress-bar bg-danger"
                role="progressbar"
                style={{ width: `${(time / (120 * quizid.length)) * 100}%` }}
                aria-valuenow={time}
                aria-valuemin="0"
                aria-valuemax={120 * quizid.length}
              >
              </div>
            </div>
          </div>
          <div className="mx-3 m-md-4">
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="fs-6 fw-bold">{index + 1} of {quizid.length} Question</h2>
              <p className='fs-6 d-inline' style={{minWidth:'80px'}}>
                <i className="bi bi-clock-history me-2"></i>
                <span className='fw-semibold'>   
                 {formatTime(time)} 
                  {/* {Math.floor(time / 3600)}:{String(Math.floor((time % 3600) / 60)).padStart(2, '0')}:{String(time % 60).padStart(2, '0')} */}
                </span>
              </p>
            </div> 
            <div className="card-body position-relative px-1 px-lg-3"> 
              {loading ? (  
                <div className='my-5'>
                  <MainSpinner/> 
                </div>
              ) : (
                <form>
                  <div className="form-group">
                    <h6 htmlFor="question1" className="fs-6 mb-4">{question}</h6> 
                    {image && <img src={image} className='my-2 quiz-img' alt="img" />}
                  </div> 
                  <div className="form-check m-3">
                    <input
                      type="radio"
                      id="option1"
                      name="options"
                      className="form-check-input border border-2 border-secondary"
                      checked={selectedOptions[index] === 'A'}
                      onChange={() => handleOptionChange("A")}
                    />
                    <label htmlFor="option1" className="form-check-label">A) {choiceA}</label>
                  </div>
                  <div className="form-check m-3">
                    <input
                      type="radio"
                      id="option2"
                      name="options"
                      className="form-check-input border border-2 border-secondary"
                      checked={selectedOptions[index] === 'B'}
                      onChange={() => handleOptionChange("B")}
                    />
                    <label htmlFor="option2" className="form-check-label">B) {choiceB}</label>
                  </div>
                  <div className="form-check m-3">
                    <input
                      type="radio"
                      id="option3"
                      name="options"
                      className="form-check-input border border-2 border-secondary"
                      checked={selectedOptions[index] === 'C'}
                      onChange={() => handleOptionChange("C")}
                    />
                    <label htmlFor="option3" className="form-check-label">C) {choiceC}</label>
                  </div>
                  <div className="form-check m-3">
                    <input
                      type="radio"
                      id="option4"
                      name="options"
                      className="form-check-input border border-2 border-secondary"
                      checked={selectedOptions[index] === 'D'}
                      onChange={() => handleOptionChange("D")}
                    />
                    <label htmlFor="option4" className="form-check-label">D) {choiceD}</label>
                  </div> 
              </form>   
              )} 
            </div> 
               <div className='position-absolute' style={{right:'1rem',bottom:'10px'}}>
                 <button type="button" className="btn border-0 ms-3" onClick={() => toggleMarkQuestion(index)}>
                  {markedQuestions[index] ? <i class="bi bi-bookmarks-fill fs-5"></i> : <i class="bi bi-bookmarks fs-5"></i>}
                 </button> 
               </div> 
            <div className="fixed-bottom clear-fix p-3 p-sm-4 p-lg-5 primary-subtle border-top" style={{backgroundColor: 'var(--bs-light)'}}>
              <div className='float-start error-text'>{error && <small className="text-danger">{error}</small>}</div>  
              <div className='float-end my-2 mx-4 m-sm-0'> 
                {index > 0 && <button type="button" className="btn btn-sm btn-secondary px-3 px-md-4 me-3" onClick={handleBack}>Back</button>}  
                {index < quizid.length -1 ? (
                  <button type="submit" className="btn btn-sm btn-primary px-3 px-md-4" onClick={handleSubmit}>Next</button> 
                ) : (
                  <button type="submit" className="btn btn-sm btn-success px-2 px-md-3" onClick={handleSubmit}>Submit</button>  
                )}
              </div>
            </div>
          </div>    
        </div>
      </div>   
      <div className='col-12 col-lg-4 mb-3 mb-sm-5'>
        <div className='card rounded-3 shadow-sm'>  
          <div className='card-body quiz-index-body px-2'> 
            {[...Array(quizid.length).keys()].map((num) => (
              <div 
                className={`quiz-index-box rounded-1 ${selectedOptions[num] ? 'selected' : ''} ${error && selectedOptions[num] === '' ? 'unselected' : ''} ${markedQuestions[num] ? 'marked' : ''}`} 
                key={num} 
                onClick={() => handleQuestionChange(num)}
              > 
                {num + 1} 
              </div>
            ))} 
          </div> 
        </div> 
      </div> 
    </div>
    </>
  );
};

export default QuestionPage;
