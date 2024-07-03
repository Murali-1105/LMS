// import { useState, useEffect,useRef } from "react";
// import { useParams } from "react-router-dom";
// import useAxios from "../../utils/useAxios";
// import { useNavigate } from "react-router-dom";
// import { Modal, Button } from "react-bootstrap";   
// import { Link } from "react-router-dom"; 
// import "./Css/Quiz.css"  
 

// function Quizpage() {
//   const [selectedOption, setSelectedOption] = useState(""); 
//   const [correctAnswer,setCorrectAnswer] = useState(""); 
//   const [quizid, setQuizId] = useState([]);
//   const [index, setIndex] = useState(-1);
//   const [question, setQuestion] = useState("");
//   const [choiceA, setChoiceA] = useState("");
//   const [choiceB, setChoiceB] = useState("");
//   const [choiceC, setChoiceC] = useState("");
//   const [choiceD, setChoiceD] = useState("");
//   const [percentage, setPercentage] = useState(0);
//   const [isQuizCompleted, setIsQuizCompleted] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [quizAnswers, setQuizAnswers] = useState([]);  
//   const [time,setTime] = useState(10); 
//   const [error,setError] = useState(''); 
//   const [hasRetried, setHasRetried] = useState(false); 
//   const [quizLocked,setQuizLocked] = useState(false)
//   const navigate = useNavigate();
//   const param = useParams(); 
   
 
   
//     const getStudentQuizUpdate = async () => {
//       const response = await useAxios().get(`user/subject/student_quiz_status/${param.chapterid}`);
//       setQuizLocked(response?.data?.is_blocked);
//     };

//     const getQuizIds = async () => {
//       try {
//         const response = await useAxios().get(`user/subject/chapterid/${param.chapterid}`);
//         if (response) {
//           setQuizId(response.data.chapterquizid);
//         } else {
//           console.log(response);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };
 

//    useEffect(() => { 
//     getStudentQuizUpdate();
//     getQuizIds();
//   },[]);
  

//   useEffect(() => {
//     if (quizid.length > 0 && index >= 0) {
//       const getQuiz = async () => {
//         try {
//           const response = await useAxios().get(`user/subject/quiz/${quizid[index]}`);
//           if (response) { 
//             setCorrectAnswer(response.data.correct_answer)
//             setQuestion(response.data.question);
//             setChoiceA(response.data.choice_a);
//             setChoiceB(response.data.choice_b);
//             setChoiceC(response.data.choice_c);
//             setChoiceD(response.data.choice_d);
//           } else {
//             console.log(response);
//           }
//         } catch (error) {
//           console.error(error);
//         }
//       };
//       getQuiz();
//     }
//   }, [index, quizid]);

//   const handleIndex = (e) => {
//     e.preventDefault();
//     setIndex((prevIndex) => prevIndex + 1); 
//   }; 
  
   
//   useEffect(() => {
//     const lockStudentQuiz = async () => {
//       const formdataquizlock = new FormData();
//       const response = await useAxios().post(`user/subject/student_quiz_status/${param.chapterid}`, formdataquizlock);
//     };

//     const handleVisibilityChange = () => {
//       if (document.hidden) {
//         lockStudentQuiz();
//         setQuizLocked(true);
//       }
//     };

//     document.addEventListener('visibilitychange', handleVisibilityChange);

//     return () => {
//       document.removeEventListener('visibilitychange', handleVisibilityChange);
//     };
//   }, []);

//   useEffect(() => {
//     if (index !== quizid.length) {
//       let interval;

//       if (time > 0) {
//         interval = setInterval(() => {
//           setTime(prevTime => prevTime - 1);
//         }, 1000);
//       } else if (time === 0) {
//         handleFinalSubmit();
//       }
//       return () => clearInterval(interval);
//     }
//   }, [time]);


//   const handleSubmit = async (e) => {
//     if (e) {
//         e.preventDefault();
//       } 

//     if (time > 0 && selectedOption === '') {
//         setError('Please select an option!');
//         return;
//     } 

//     const formData = new FormData();
//     formData.append('selected_option', selectedOption); 

//     const quizAnswer= {
//             question,
//             selectedOption, 
//             correctAnswer, 
//           }; 
 
  
//     try {
//       const response = await useAxios().post(`user/subject/quiz/evaluate/${quizid[index]}`, formData); 
      
//       if (response.status === 201) {  
//           setQuizAnswers((prevAnswers) => [...prevAnswers, quizAnswer]); 
//         if (index < quizid.length - 1) {
//           setIndex((prevIndex) => prevIndex + 1);  
//           setSelectedOption(""); 
//           setError(''); 
//         } else if (index === quizid.length - 1){ 
//           handleFinalSubmit(); 
//           setIndex(quizid.length);
//         } 
//       } else {
//         console.error('Error evaluating quiz:', response);
//       } 
//     } catch (error) {
//       console.error(error);
//     }  
  
//   };

//   const handleFinalSubmit = async () => {
//     const formData = new FormData();
//     formData.append('chapter_id', param.chapterid); 
    
//     try {
//       const response = await useAxios().post("user/subject/quiz/evaluate_progress/", formData);
//       if (response.status === 201) {
//         setIsQuizCompleted(true);
//         setPercentage(response.data.progress)
        
//       } else {
//         console.error('Error submitting final progress:', response);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };


//   const handleCloseModal = () => setShowModal(false);  
   
//   const handleReset= (e) =>{  
//     if(e){
//     e.preventDefault(); 
//   }
//     setIndex(-1);
//     setTime(10);  
//     setError(''); 
//     setIsQuizCompleted(false); 
//     setSelectedOption("");  
//     setQuizAnswers([]);
//     setHasRetried(true); 
     
//   }    
   
//   const progressBarRef = useRef(null); 
  
//     useEffect(() => {
//     const progressElement = progressBarRef.current;
//     if (!progressElement) return;
    
//     const value = parseInt(percentage, 10);
//     const rightBar = progressElement.querySelector('.progress-right .progress-bar');
//     const leftBar = progressElement.querySelector('.progress-left .progress-bar');

//     if (value > 0) {
//       if (value <= 50) {
//         rightBar.style.transform = `rotate(${percentageToDegrees(value)}deg)`;
//       } else {
//         rightBar.style.transform = 'rotate(180deg)';
//         leftBar.style.transform = `rotate(${percentageToDegrees(value - 50)}deg)`;
//       }
//     }
//   }, [percentage]); 

//   const percentageToDegrees = (percentage) => {
//     return (percentage / 100) * 360;
//   };
 
//   if (!quizLocked) {
//   return ( 
//    <section className="section px-2 px-lg-5 py-4">
//     <div className="container-fluid">
//       {isQuizCompleted ? (
//         <> 
//       <div className="d-flex align-items-center justify-content-center my-5"> 
//        <div className=""> 
//          <div className="text-center mt-5">
//           <h2 className="fs-4 fw-semibold pb-4">Quiz Completed</h2> 
//           <p className="fs-6">Your Score</p>
//          </div>
//          <div className="circle-progress my-4">
//             <div className="progress blue" ref={progressBarRef} data-value={percentage}>
//                 <span className="progress-left">
//                   <span className="progress-bar" ></span>
//                 </span>
//                 <span className="progress-right">
//                     <span className="progress-bar"></span>
//                 </span> 
//                 <div className="progress-value">{Math.floor(percentage)}%</div> 
//             </div> 
//           </div>   
//           <div className="pt-2"> 
//             {/* <Link to={'/student/dashboard'} className="btn btn-primary"><i className="bi bi-arrow-left pe-2"></i>Go to Dashboard</Link> */}
//           {!hasRetried && (
//                   <Button className="btn btn-primary me-3" onClick={handleReset}>Try again</Button>
//                 )}
//            <Button variant="primary" onClick={() => setShowModal(true)}>Check your Answers</Button> 
//           </div>
//         </div>
//        </div>

//           <Modal show={showModal} onHide={handleCloseModal}>
//             <Modal.Header closeButton>
//               <Modal.Title>Quiz Answers</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 {quizAnswers.map((answer, id) => (
//                   <div key={id}>
//                      <p><strong>Question:</strong> {answer.question}</p>
//                     <p><strong>Your Answer:</strong> {answer.selectedOption}</p>
//                     <p><strong>Correct Answer:</strong> {answer.correctAnswer}</p>
//                     <hr />
//                   </div>
//                 ))}
//             </Modal.Body>
//             <Modal.Footer>
//               <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
//             </Modal.Footer>
//           </Modal>
//         </>
//       ) : index >= 0 ? (
//         <>    
//    <div className="card my-5 rounded-3 shadow h-100">   
//     <div className="timer">
//       <div className="progress rounded-top-5" style={{height: '5px'}}>
//         <div className="progress-bar bg-danger"
//           role="progressbar"
//           style={{ width: `${(time / 10) * 100}%` }}
//           aria-valuenow={time}
//           aria-valuemin="0"
//           aria-valuemax="100" 
//           key={index}
//            >
//         </div> 
//       </div> 
//     </div>  
//     <div className="m-3 m-sm-4">
//       <div className="d-flex justify-content-between align-items-center">   
//         <div className="d-flex">
//           <img src="/wings-red.png" alt="" style={{width :'50px', height: '50px',}} /> 
//           <h2 className="fs-6 fw-bold mt-3 ps-2">{index + 1 } of {quizid.length} Question </h2> 
//         </div>
//         <p className='fs-6 mt-3'><i className="bi bi-clock-history"></i>&nbsp; <span className='text-danger fw-bold time-display'>{time}s</span></p> 
//       </div>
//      <div className="card-body mt-2"> 
//           <form>
//             <div className="form-group">
//               <label htmlFor="question1" className="fs-6 mb-2">{index + 1 }. {question}</label>
//             </div> 
//             <div className="form-check m-3 ">
//               <input type="radio" id="option1" name="options" className="form-check-input border border-2 border-secondary"
//                 checked={selectedOption === 'A'} onChange={() => setSelectedOption("A")} /> 
//               <label htmlFor="option1" className="form-check-label">A) {choiceA}</label>
//             </div>
//             <div className="form-check m-3 ">
//               <input type="radio" id="option2" name="options" className="form-check-input border border-2  border-secondary"
//                 checked={selectedOption === 'B'} onChange={() => setSelectedOption("B")} /> 
//               <label htmlFor="option2" className="form-check-label">B) {choiceB}</label>
//             </div>
//             <div className="form-check m-3 ">
//               <input type="radio" id="option3" name="options" className="form-check-input border border-2  border-secondary"
//                 checked={selectedOption === 'C'} onChange={() => setSelectedOption("C")} /> 
//               <label htmlFor="option3" className="form-check-label">C) {choiceC}</label>
//             </div>
//             <div className="form-check m-3 ">
//               <input type="radio" id="option4" name="options" className="form-check-input border border-2  border-secondary"
//                 checked={selectedOption === 'D'} onChange={() => setSelectedOption("D")} /> 
//               <label htmlFor="option4" className="form-check-label">D) {choiceD}</label>
//             </div>  
//             <div className="d-flex justify-content-between align-items-center mt-4"> 
//              <span>{error && <div className="text-danger fs-6">{error}</div>}</span> 
//              <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Next</button> 
//             </div>
//           </form> 
          
//          </div>  
//          </div> 
//         </div>
//         </>
//       ) : (
//         <>
//          <div className="d-flex align-items-center justify-content-center my-5">   
//           <div className="">   
//             <div className="text-center"> 
//              <img src="/wings-red.png" alt="" className="img-fluid mb-5" style={{width :'180px'}} />
//            </div>
//            <div>
//             <span className="fw-bold ">Instructions:</span>
//             <ul className="mt-3"> 
//              <li>1. You will have only 10 seconds per each question.</li> 
//              <li>2. Do not open a new tab or window during the exam.</li>
//              <li>3. You can't select any option once time goes off.</li>
//              <li>4. All questions consist of 1 mark.</li></ul> 
//             <button className="btn btn-primary mt-3 px-4 float-end" onClick={handleIndex}>Start</button>  
//             </div> 
//           </div> 
//          </div> 
//         </>
//       )}
//     </div> 
//   </section>
//   );} 
//   else {
//     return (
//       <section className="section px-2 px-lg-5 py-4">
//         <div className="container-fluid">
//           <div className="d-flex align-items-center justify-content-center my-5">
//             <div className="text-center">
//               <h2 className="my-4 fs-4 fw-bold">Quiz Locked</h2>
//               <p className="text-danger">You have navigated away from the quiz. The quiz is now locked.</p>
//             </div>
//           </div>
//         </div>
//       </section>
//     );
//   }
// }

// export default Quizpage;
