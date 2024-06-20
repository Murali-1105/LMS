import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../utils/useAxios";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";  
import { Link } from "react-router-dom";  
 

function Quizpage() {
  const [selectedOption, setSelectedOption] = useState(""); 
  const [correctAnswer,setCorrectAnswer] = useState(""); 
  const [quizid, setQuizId] = useState([]);
  const [index, setIndex] = useState(-1);
  const [question, setQuestion] = useState("");
  const [choiceA, setChoiceA] = useState("");
  const [choiceB, setChoiceB] = useState("");
  const [choiceC, setChoiceC] = useState("");
  const [choiceD, setChoiceD] = useState("");
  const [percentage, setPercentage] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState([]);  
  const [time,setTime] = useState(10); 
  const [error,setError] = useState('');
  const navigate = useNavigate();
  const param = useParams();

  useEffect(() => {
    const getQuizIds = async () => {
      try {
        const response = await useAxios().get(`user/subject/chapterid/${param.chapterid}`);
        if (response) {
          setQuizId(response.data.chapterquizid);
        } else {
          console.log(response);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getQuizIds();
  }, []);

  useEffect(() => {
    if (quizid.length > 0 && index >= 0) {
      const getQuiz = async () => {
        try {
          const response = await useAxios().get(`user/subject/quiz/${quizid[index]}`);
          if (response) { 
            setCorrectAnswer(response.data.correct_answer)
            setQuestion(response.data.question);
            setChoiceA(response.data.choice_a);
            setChoiceB(response.data.choice_b);
            setChoiceC(response.data.choice_c);
            setChoiceD(response.data.choice_d);
          } else {
            console.log(response);
          }
        } catch (error) {
          console.error(error);
        }
      };
      getQuiz();
    }
  }, [index, quizid]);

  const handleIndex = (e) => {
    e.preventDefault();
    setIndex((prevIndex) => prevIndex + 1); 
    setTime(10)
  }; 
  
  useEffect(() =>{ 
    if (index!==quizid.length){
    let interval ;     

    if(time > 0){
     interval = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);
     }
     else if(time === 0){ 
      handleSubmit(); 

    } 
    else if(time === 0 && index===quizid.length-1){ 
      handleSubmit(); 
      setIndex(quizid.length);
      
    } 
      return () => clearInterval(interval);
}}, [time]);


  const handleSubmit = async (e) => {
    if (e) {
        e.preventDefault();
      } 

    if (time > 0 && selectedOption === '') {
        setError('Please select an option.');
        return;
    } 

    const formData = new FormData();
    formData.append('selected_option', selectedOption); 

    const quizAnswer= {
            question,
            selectedOption, 
            correctAnswer, 
          }; 
 
  
    try {
      const response = await useAxios().post(`user/subject/quiz/evaluate/${quizid[index]}`, formData); 
      
      if (response.status === 201) {  
          setQuizAnswers((prevAnswers) => [...prevAnswers, quizAnswer]); 
        if (index < quizid.length - 1) {
          setIndex((prevIndex) => prevIndex + 1);  
          setSelectedOption(""); 
          setError(''); 
          setTime(10);
        } else if (index === quizid.length - 1){ 
          handleFinalSubmit(); 
          setIndex(quizid.length);
        } 
      } else {
        console.error('Error evaluating quiz:', response);
      } 
    } catch (error) {
      console.error(error);
    }  
  
  };

  const handleFinalSubmit = async () => {
    const formData = new FormData();
    formData.append('chapter_id', param.chapterid); 
    
    try {
      console.log('hello try')
      const response = await useAxios().post("user/subject/quiz/evaluate_progress/", formData);
      if (response.status === 201) {
        setIsQuizCompleted(true);
        setPercentage(response.data.progress)
        
      } else {
        console.error('Error submitting final progress:', response);
      }
    } catch (error) {
      console.error(error);
    }
  };


  const handleCloseModal = () => setShowModal(false);  
   
  const handleReset= (e) =>{  
    if(e){
    e.preventDefault();}
    setIndex(-1);
    setTime(10);  
    setError(''); 
    setIsQuizCompleted(false); 
    setSelectedOption("");  
    setQuizAnswers([])
  }

  return ( 
   <section className="section px-2 px-lg-5 py-2">
    <div className="container-fluid">
      {isQuizCompleted ? (
        <>
          <h2 className="my-4 fs-4 fw-bold">Quiz Completed</h2>
          <p>Your final percentage is: {Math.floor(percentage)} %</p> 
          <Button className="btn btn-primary me-3 btn-sm" onClick={handleReset}>Try again</Button>
          <Button variant="primary btn-sm" onClick={() => setShowModal(true)}>Check your Answers</Button>

          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Quiz Answers</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ul>
                {quizAnswers.map((answer, id) => (
                  <li key={id}>
                    <strong>{answer.question}</strong><br /> 
                    Correct Answer: {answer.correctAnswer}<br />
                    Your Answer: {answer.selectedOption}
                  </li>
                ))}
              </ul>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : index >= 0 ? (
        <> 
         <div className="row">
          <h2 className="fs-4 fw-bold">Quiz Application</h2> 
          <form>
            <div className="form-group">
              <label htmlFor="question1" className="fs-5 mb-3">{question}</label>
            </div>
            <div className="form-check">
              <input type="radio" id="option1" name="options" className="form-check-input border border-dark"
                checked={selectedOption === 'A'} onChange={() => setSelectedOption("A")} /> 
              <label htmlFor="option1" className="form-check-label">{choiceA}</label>
            </div>
            <div className="form-check">
              <input type="radio" id="option2" name="options" className="form-check-input border border-dark"
                checked={selectedOption === 'B'} onChange={() => setSelectedOption("B")} /> 
              <label htmlFor="option2" className="form-check-label">{choiceB}</label>
            </div>
            <div className="form-check">
              <input type="radio" id="option3" name="options" className="form-check-input border border-dark"
                checked={selectedOption === 'C'} onChange={() => setSelectedOption("C")} /> 
              <label htmlFor="option3" className="form-check-label">{choiceC}</label>
            </div>
            <div className="form-check">
              <input type="radio" id="option4" name="options" className="form-check-input border border-dark"
                checked={selectedOption === 'D'} onChange={() => setSelectedOption("D")} /> 
              <label htmlFor="option4" className="form-check-label">{choiceD}</label>
            </div>
            <button type="submit" className="btn btn-primary mt-3 btn-sm" onClick={handleSubmit}>Next</button>
          </form> 
          {error && <div className="text-danger mt-3">{error}</div>} 
          <p className=' '>Time Left: <span className='text-danger'>{time}s</span></p> 
          <br /> 
          <p>{index + 1 } of {quizid.length} Question</p> 
         </div>
        </>
      ) : (
        <>
         <div> 
           <h1 className="my-4 fs-4 fw-bold">Do you want to start the quiz? Click below:</h1>
           <p>Rules of this Quiz </p>
            <ul> 
            <li>1. You will have only 10 seconds per each question.</li>
            <li>2. Once you select your answer, it can't be undone.</li>
            <li>3. You can't select any option once time goes off.</li>
            <li>4. You'll get points on the basis of your correct answers.</li></ul> 
            <button className="btn btn-primary btn-sm mt-3" onClick={handleIndex}>Start</button>  
         </div>
        </>
      )}
    </div> 
  </section>
  );
}

export default Quizpage;
