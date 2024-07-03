import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAxios from '../../../utils/useAxios';

const ScorePage = () => {
  const { chapterid } = useParams();
  const [quizDetails, setQuizDetails] = useState([]);  
  const [percentage,setPercentage] = useState(); 
  
   
  const navigate = useNavigate()

  useEffect(() => {
    fetchQuizIds(); 
    fetchPercentage();
  }, [chapterid]);  
   
   
  const fetchQuizIds = async () => {
    try {
      const response = await useAxios().get(`user/subject/chapter-quiz-report/${chapterid}`);
      if (response) {
        setQuizDetails(response.data.details);  
        console.log(response);
      } else {
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  };
   
  const fetchPercentage = async () => {  
    const formData = new FormData();
    formData.append('chapter_id', chapterid); 

    try {
      const response = await useAxios().post("user/subject/quiz/evaluate_progress/", formData);
      if (response.status === 201) {
        setPercentage(response.data.progress); 
        console.log(response)
      } else {
        console.error('Error submitting final progress:', response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleBack = () => {
    navigate(-2);
  };

  return ( 
    <section className="section px-0 px-lg-5"> 
    <div className='container-fluid'> 
      <div className='d-flex justify-content-between my-4'> 
        <h3 className=''>Test Report</h3> 
       <div className='hstack'> 
         <div> Your Score: <span className='pe-2'>{percentage}%</span></div>
         <div className='fw-bold'>{percentage > 80 ? (<span className='text-success'>( Pass )</span>):(<span className='text-danger'>( Fail )</span>)}</div>
       </div> 
      </div>
    <div className="card score-page p-2 p-lg-3">  
     
       
      <div className='card-body'> 
      {quizDetails.map((quiz, id) => (
        <div key={id} className="vstack quiz-result"> 
            <h6>{id + 1}. <span>{quiz.chapterquiz.question}</span> </h6> 
         <div className='px-2 px-lg-4 pt-2 pb-4 '> 
           <p className={`mb-2 ${quiz.selected_answer === quiz.chapterquiz.correct_answer ? 'text-success' : 'text-danger'}`}>  
             {quiz.selected_answer === quiz.chapterquiz.correct_answer ? (
                 <i className="bi bi-check-circle-fill"></i> 
               ) : (
                 <i className="bi bi-x-circle-fill"></i> 
                 )}
             <span> {quiz.selected_answer}</span>  
           </p>  
            {quiz.selected_answer !== quiz.chapterquiz.correct_answer && (
              <p><i class="bi bi-check-circle-fill text-success"></i><span> {quiz.chapterquiz.correct_answer}</span></p>  
            )}
           <div className='border p-3 rounded bg-success bg-opacity-10'> 
             <h6>Explanation:</h6> 
             <p>{quiz.chapterquiz.explanation}</p>   
           </div> 
         </div>
        </div>
      ))} 
      </div>
    </div>    
    <div className='text-center'>
      <button className="btn btn-outline-primary mb-5" onClick={handleBack}><i class="bi bi-arrow-left"></i> Back</button> 
    </div>
   </div>
  </section>
  );
};

export default ScorePage;
