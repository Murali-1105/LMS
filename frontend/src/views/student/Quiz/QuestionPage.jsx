import React, { useState, useEffect } from 'react';
import useAxios from '../../../utils/useAxios'; 
import "../Css/Quiz.css"  
import { MainSpinner } from '../../components/Spinner';

const QuestionPage = ({ quizidLength, quizid, handleFinalSubmit}) => {
  const [selectedOption, setSelectedOption] = useState(""); 
  const [index, setIndex] = useState(0);
  const [error, setError] = useState(''); 
  const [loading, setLoading] = useState(false); 
  const [time, setTime] = useState(120*quizidLength);
  const [question, setQuestion] = useState("");
  const [choiceA, setChoiceA] = useState("");
  const [choiceB, setChoiceB] = useState("");
  const [choiceC, setChoiceC] = useState("");
  const [choiceD, setChoiceD] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [correctAnswerExp, setCorrectAnswerExp] = useState("");

  useEffect(() => {
    if (index < quizidLength && time > 0) {
      const interval = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else if (time === 0) {
      handleFinalSubmit();
    }
  }, [time, index, quizidLength, handleFinalSubmit]);

  useEffect(() => { 
    const getQuiz = async () => { 
      setLoading(true);
      try {
        const response = await useAxios().get(`user/subject/quiz/${quizid[index]}`);
        if (response) {
          setQuestion(response.data.question);
          setChoiceA(response.data.choice_a);
          setChoiceB(response.data.choice_b);
          setChoiceC(response.data.choice_c);
          setChoiceD(response.data.choice_d); 
          setSelectedOption(response.data.selected_Option || "");
          setCorrectAnswer(response.data.correct_answer);
          setCorrectAnswerExp(response.data.correct_answerExp);
        } else {
          console.log(response);
        }
      } catch (error) {
        console.error(error);
      }finally{ 
        setLoading(false);
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

    if (selectedOption === '') {
      setError('Please select an option!');
      return;
    }

    const formData = new FormData();
    formData.append('selected_option', selectedOption);

    try {
      const response = await useAxios().post(`user/subject/quiz/evaluate/${quizid[index]}`, formData);

      if (response.status === 201) {
        setSelectedOption("");
        setError('');

        if (index < quizidLength - 1) {
          setIndex((prevIndex) => prevIndex + 1);
        } else {
          handleFinalSubmit(); 
        }
      } else {
        console.error('Error evaluating quiz:', response);
      }
    } catch (error) {
      console.error(error);
    }
  }; 

  const handleBack = () => {  
    if (index > 0) { 
      setIndex((prevIndex) => prevIndex - 1);
    }
  }

  return (
    <>
      <div className="card my-5 rounded-3 shadow h-100">
        <div className="timer">
          <div className="progress rounded-top-5" style={{ height: '5px' }}>
            <div
              className="progress-bar bg-danger"
              role="progressbar"
              style={{ width: `${(time / (120 * quizidLength)) * 100}%` }}
              aria-valuenow={time}
              aria-valuemin="0"
              aria-valuemax={120 * quizidLength}
            >
            </div>
          </div>
        </div>
        <div className="m-3 m-sm-4">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex">
              <img src="/wings-red.png" alt="" style={{ width: '50px', height: '50px' }} />
              <h2 className="fs-6 fw-bold mt-3 ps-2">{index + 1} of {quizidLength} Question</h2>
            </div>
            <p className='fs-6 mt-3'><i className="bi bi-clock-history"></i>&nbsp; <span className='text-danger fw-bold time-display'>{Math.floor(time / 60)}:{String(time % 60).padStart(2, '0')}</span></p>
          </div>
          <div className="card-body mt-2"> 
            {loading && <MainSpinner/>}
            <form>
              <div className="form-group">
                <label htmlFor="question1" className="fs-6 mb-2">{index + 1}. {question}</label>
              </div>
              <div className="form-check m-3 ">
                <input
                  type="radio"
                  id="option1"
                  name="options"
                  className="form-check-input border border-2 border-secondary"
                  checked={selectedOption === 'A'}
                  onChange={() => setSelectedOption("A")}
                />
                <label htmlFor="option1" className="form-check-label">A) {choiceA}</label>
              </div>
              <div className="form-check m-3 ">
                <input
                  type="radio"
                  id="option2"
                  name="options"
                  className="form-check-input border border-2 border-secondary"
                  checked={selectedOption === 'B'}
                  onChange={() => setSelectedOption("B")}
                />
                <label htmlFor="option2" className="form-check-label">B) {choiceB}</label>
              </div>
              <div className="form-check m-3 ">
                <input
                  type="radio"
                  id="option3"
                  name="options"
                  className="form-check-input border border-2 border-secondary"
                  checked={selectedOption === 'C'}
                  onChange={() => setSelectedOption("C")}
                />
                <label htmlFor="option3" className="form-check-label">C) {choiceC}</label>
              </div>
              <div className="form-check m-3 ">
                <input
                  type="radio"
                  id="option4"
                  name="options"
                  className="form-check-input border border-2 border-secondary"
                  checked={selectedOption === 'D'}
                  onChange={() => setSelectedOption("D")}
                />
                <label htmlFor="option4" className="form-check-label">D) {choiceD}</label>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-4">
                <span>{error && <div className="text-danger fs-6">{error}</div>}</span>  
                <div>
                  {index > 0 && <button type="button" className="btn btn-sm btn-secondary px-3 me-3" onClick={handleBack}>Back</button>}
                  <button type="submit" className="btn btn-sm btn-primary px-3" onClick={handleSubmit}>Next</button> 
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionPage;
