import React, { useState ,useEffect ,useRef } from 'react' 
import { useParams  } from "react-router-dom";    
import Modal from 'react-bootstrap/Modal';  
import moment from 'moment'; 
import UserData from '../plugin/UserData.js';
import useAxios from '../../utils/useAxios.js' 
import Menu from '../components/Menubar.jsx';

const Chat = () => {    
  
const user = UserData();
const messagesEndRef = useRef(null);   
const param=useParams();  
const [loading, setLoading] = useState(false);  
const [postmessage,setPostMessage] = useState("");  
const [question,setQuestion] = useState("");
const [questiontitle,setQuestionTitle]=useState("");
const [questionid,setQuestionID]=useState(-1);
const [questionsposts,setQuestionPosts] = useState([]); 
const [returnquestions,setReturnQuestions] = useState([]);
const [ConversationShow, setConversationShow] = useState(false);  
 
if (!user) {
  return <div>No user data available</div>;
}

const handleConversationClose = () =>  { 
      setConversationShow(false);  
      setQuestionID(-1)  
  } 
 
const handleConversationShow = (id) => {   
      fetchQuestionAnswers(id);
      setQuestionID(id);
      setConversationShow(true);  
  } 
 
const [addQuestionShow, setAddQuestionShow] = useState(false);
const handleQuestionClose = () => setAddQuestionShow(false);
const handleQuestionShow = () => setAddQuestionShow(true); 

     
 const fetchSubjectQuestions =  async () => {
    setLoading(true)
    try{
      const response = await useAxios().get(`user/subject/get_question/${param.id}`); 
      setReturnQuestions(response.data.questions);  
    }
    catch(error){
      console.log('Error fetching subject questions:',error);
    }finally { 
      setLoading(false)
    }
  }
  

  const handleSaveQuestion = async (e) => {
    e.preventDefault()
    const formdata = new FormData()
    formdata.append('title',questiontitle);
    formdata.append('question',question);
    formdata.append('subject_id',param.id)

    try{
      const response = await useAxios().post(`user/subject/post_question/`,formdata);
      setAddQuestionShow(false);  
      if (response.status === 201) {  
        fetchSubjectQuestions();
      }    
    }
    catch(error){
      console.log(error)
    }


  };

  const fetchQuestionAnswers= async (id) => { 
    try{
      const response = await useAxios().get(`user/subject/get_question_answer/${id}`);  
      console.log(response) 
      if (response.status === 404){
       setLoading(true)
       setQuestionPosts([]);
    }else if (response.status === 200){
      setQuestionPosts(response.data.answers)
    }}
    catch(error){
      console.log(error);
    }finally{ 
      setLoading(false)
    }
  }
     
const handlePostMessage =async() => { 
    const formdataMessage = new FormData(); 
    formdataMessage.append('question_id',questionid);
    formdataMessage.append('answer',postmessage);  
     
    if(postmessage === ''){ 
     return;
    }

    try{
    const response = await useAxios().post(`user/subject/post_question_answer/`,formdataMessage);
    fetchQuestionAnswers(questionid); 
    }
    catch(error){
      console.log(error)
    }finally{ 
      setPostMessage('');
    } 
  } 
   
  useEffect(() => {
    fetchSubjectQuestions(); 
  }, []);  
    
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [questionsposts]);  

  return (
   <section className='px-2 px-lg-5 py-2'>
      <div className="container-fluid my-4"> 
        <Menu id={param.id} progress={param.progress} title={param.title} />
          <div className="d-block">
            <div className="d-flex justify-content-between pb-1">
               <h5 className="text-uppercase text-center">{param.title}</h5>
               <button onClick={handleQuestionShow} className="btn btn-primary btn-sm"><i className="bi bi-patch-question-fill pe-2"></i>Ask Question </button>
            </div>
            <div className="pt-4">   
              {returnquestions.map((question,id)=> (
              <div className="vstack gap-3 p-1"> 
                <div className="card shadow-sm rounded-4 p-1" key={id}> 
                  <div className='card-body'>
                  <div className="d-flex justify-content-between mb-3">
                    <div className="d-flex align-items-center justify-content-center">
                      <div className="flex-shrink-0">
                        <img src={question.student_image} className="avatar-lg rounded-circle" alt="avatar"/>
                      </div>
                      <div className="ps-3 vstack mt-3">
                        <h6 className="fw-bold"><a href="#" className='text-decoration-none'>{question.student_name}</a></h6>
                        <small>{moment(question.date).format("DD MMM, YYYY")}</small>
                      </div>
                    </div>
                  </div> 
                  <div className='pt-2'>
                    <h6 className='mb-1'>{question.title}</h6>  
                    <p>{question.question}</p> 
                  </div>
                  <button className='btn btn-primary btn-sm' onClick={() => {handleConversationShow(question.id);}} > 
                    Join Conversation <i className='fas fa-arrow-right'></i> 
                  </button>
                </div> 
                </div>
              </div>
            ))}
            </div>
          </div>
       </div>

    <Modal show={ConversationShow} size='lg' onHide={handleConversationClose} centered> 
         <div className=''>  
           <button className="btn btn-danger float-end close-btn" onClick={handleConversationClose}><i className="bi bi-x-lg fw-bolder"></i></button> 
           <h2 className="fs-6 fw-bold mt-3 px-4 text-muted">Discussion</h2> 
          </div> 
        <Modal.Body> 
          <div className="" >
            <ul className="list-unstyled mx-2 px-3 border rounded shadow-sm" style={{ overflowY: "scroll", height: "500px",overflowX: 'hidden'}}>  
         { loading ? 
             (Array.from({ length: 10 }).map((_, index) => (
              <div className="d-flex flex-row align-items-center gap-2 my-4" key={index}>
               <div className="placeholder-glow"><div className='placeholder rounded-circle avatar'></div></div>
                <div className="d-flex flex-column gap-1 placeholder-glow">
                  <div className="placeholder" style={{width: "10rem", height: "0.3rem", borderRadius: "0.5rem",}}></div>
                  <div className="placeholder" style={{width: "13rem", height: "0.3rem", borderRadius: "0.5rem",}}></div>
               </div>
             </div>)) 
             ):(
             questionsposts.map((post,index) => (
              <li className="comment-item mb-3" key={index}>
                <div className="d-flex my-4" >
                  <div className="flex-shrink-0">
                    <img className="rounded-circle avatar" src={post.student_image} alt="image" />
                  </div>
                  <div className="ms-2">
                    <div className="bg-secondary-subtle rounded w-100">
                      <div className="d-block ">
                          <div className='py-2 px-3'><small style={{ wordBreak: 'break-word' }}>{post?.answer}</small></div> 
                          <small className='float-start mt-1' style={{ fontSize: "10px", color: "gray" }}>{moment(post.date).format("DD MMM, YYYY")}</small>
                      </div>
                    </div>
                  </div>
                </div>
              </li> ))
             )}
              <div ref={messagesEndRef}/>
            </ul> 
            <div className='d-flex align-items-center border shadow-sm rounded-pill m-2 px-2'> 
             <img className="rounded-circle avatar" src={user.user_image} alt="user-avatar" />
               <input type="text" name='message' className="one form-control no-hover border-0 w-100 m-2" value={postmessage} placeholder="Type message..." onChange={(e) => {setPostMessage(e.target.value)}}/>
               <a className="text-primary mx-2" onClick={handlePostMessage}><i className='fas fa-paper-plane fs-5'></i></a>
           </div>
          </div>
        </Modal.Body>
      </Modal>   
      
      <Modal show={addQuestionShow} size="md" onHide={handleQuestionClose} centered> 
        <div className=''>  
           <button className="btn btn-danger float-end close-btn" onClick={handleQuestionClose}><i className="bi bi-x-lg fw-bolder"></i></button> 
           <h2 className="fs-5 fw-bold mt-3 px-4 text-muted text-center">Ask Question</h2> 
        </div> 
        <Modal.Body> 
        <div className='px-2'>
          <form onSubmit={handleSaveQuestion} > 
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Question Title
              </label>
              <input
                name="title"
                onChange={(e) => {setQuestionTitle(e.target.value)}}
                type="text"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Question Message
              </label>
              <textarea
                name="message"
                onChange={(e) => {setQuestion(e.target.value)}}
                className="form-control"
                rows="5"
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary float-end">Ask Question</button>
          </form> 
         </div>
        </Modal.Body>
      </Modal>
   </section>
  )
}

export default Chat