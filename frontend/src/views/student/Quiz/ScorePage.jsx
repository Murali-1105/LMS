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
      <div className='d-flex justify-content-between align-items-center my-4'> 
        <h4 className='mt-2'>Test Report</h4> 
       <div className='hstack'> 
         <div> Your Score: <span className='pe-2'>{percentage}%</span></div>
         <div>{percentage > 80 ? (<small className='text-bg-success bg-opacity-75 rounded-pill px-2 py-1'>Pass</small>):(<small className='text-bg-danger bg-opacity-75 rounded-pill px-2 py-1'>Fail</small>)}</div>
       </div> 
      </div>
    <div className="card score-page p-2 p-lg-3">  
      <div className='card-body'> 
      {quizDetails.map((quiz, id) => (
        <div key={id} className="vstack quiz-result"> 
            <h6>{id + 1}. <span>{quiz.chapterquiz.question}</span> </h6> 
         <div className='px-2 px-lg-3 pt-2 pb-4 '> 
           <p className='mb-2'>  
             {quiz.selected_answer === quiz.chapterquiz.correct_answer ? (
                 <i className="bi bi-check-circle text-success"></i> 
               ) : (
                 <i className="bi bi-x-circle text-danger"></i> 
                 )}
             <span> {quiz.selected_answer}</span>  
           </p>  
            {quiz.selected_answer !== quiz.chapterquiz.correct_answer && (
              <p><i class="bi bi-check-circle text-success"></i><span> {quiz.chapterquiz.correct_answer}</span></p>  
            )}
           <div className='border p-3 bg-secondary bg-opacity-10 rounded'> 
             <h6>Explanation:</h6> 
             <p className='m-0'>{quiz.chapterquiz.explanation}</p>   
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
