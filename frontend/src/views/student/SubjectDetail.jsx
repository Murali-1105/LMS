import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import UserData from "../plugin/UserData.js";
import useAxios from "../../utils/useAxios.js";
import { MainSpinner, Spinner } from "../components/Spinner.jsx";
import Menu from "../components/Menubar.jsx"; 

import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import { VideoPlayer } from '/src/views/components/Player.jsx';
import ReactPlayer from "react-player";

function SubjectDetail() {
  const user = UserData();
  const param = useParams();
  const [chapterItem, setchapterItem] = useState([]);
  const [chapter, setChapter] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); 
  const [loading1, setLoading1] = useState(false); 
  const [quizStatus,setQuizStatus] = useState({})
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (chapterItem) => {
    setchapterItem(chapterItem);
    setShow(true);
  };

  if (!user) {
    return <div>No user data available</div>;
  }

  const fetchChapters = async () => {
    setLoading(true);
    try {
      const response = await useAxios().get(`/user/subject/${param.id}`);

      if (response.data && Array.isArray(response.data)) {
        setChapter(response.data);
      } else {
        setChapter([]);
        setError(new Error("Invalid data format"));
      }
    } catch (error) {
      console.error("Error fetching subjects:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChapters();
    getQuizAttendedUpdate()
  }, [param.id]);


  const getQuizAttendedUpdate = async () => { 
    setLoading1(true);
    try {
      const response = await useAxios().get( `user/subject/student_quiz_status/array/${param.id}`);  
      if (response.data && Array.isArray(response.data)) {
        const statusObject = response.data.reduce((acc, curr) => { acc[curr.chapter] = { attended: curr.attended, blocked: curr.blocked }; return acc;}, {});
        setQuizStatus(statusObject); 
      } else {
        setQuizStatus({})
        setError(new Error("Invalid data format"));
      }

    } catch (error) {
      console.error(error);
    } finally {
      setLoading1(false); 
    }
  }; 
   
  
  return (
    <>
      <section className="px-2 px-lg-5 py-2">
        <div className="container-fluid my-4">
          <h5 className="text-uppercase text-center">{param.title}</h5>
          <Menu id={param.id} progress={param.progress} title={param.title} />
          <div className="">
            {param.progress > 0 && (
              <div
                className="progress mb-4"
                role="progressbar"
                aria-label="striped example"
                aria-valuenow={param.progress}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div
                  className="progress-bar progress-primary  placeholder-wave"
                  style={{ width: `${param.progress}%` }}
                >
                  {param.progress}%
                </div>
              </div>
            )}
            <div>
              {loading && <MainSpinner />}
              {error && (
                <p className="mt-5 text-danger">Error: {error.message}</p>
              )}
            </div>
            <div className="accordion" id="accordionExample">
              {chapter.map((chapter, index) => (
                <div
                  className="accordion-item mb-2 border border-2"
                  key={index.toString()}
                >
                  <h6 className="accordion-header" id={`headingOne-${index}`}>
                    <button
                      style={{ color: "var( --bs-emphasis-color)" }}
                      className="accordion-button bg-body"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapseOne-${index}`}
                      aria-expanded={index === 0 ? "true" : "false"}
                      aria-controls={`collapseOne-${index}`}
                    >
                      {chapter.name}
                    </button>
                  </h6>
                  <div
                    id={`collapseOne-${index}`}
                    className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
                    aria-labelledby={`headingOne-${index}`}
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      {chapter.items.map((chapterItems, index) => (
                        <div className="d-flex justify-content-start align-items-center p-1" key={`item-${index}`} style={{ background: "none" }}>
                            <span style={{ transform: "rotate(90deg)"  }}>
                              <i className="bi bi-airplane"></i>
                            </span>
                            <a className="fs-6 ms-2"onClick={() => handleShow(chapterItems)}>
                              {chapterItems.description} {chapterItems.video && <i className="bi bi-camera-reels-fill text-primary align-top" style={{fontSize:'12px'}}></i>}
                            </a>
                        </div>
                      ))}
                      <div className="mt-4 d-flex justify-content-start align-items-center"> 
                      {quizStatus[chapter.id] && quizStatus[chapter.id].blocked && !quizStatus[chapter.id].attended ? (
                         <button className="btn btn-primary btn-sm m-2" disabled>Test Blocked</button>
                       ) : quizStatus[chapter.id] && quizStatus[chapter.id].attended ? (
                      <Link to={`/student/quiz-result/${chapter.id}`} className="btn btn-primary btn-sm m-2"> 
                       Test Report
                      </Link>
                      ) : (
                     <Link to={`/quiz/${chapter.id}/${chapter.name}/${param.title}`} className="btn btn-primary btn-sm m-2"> 
                       {loading1 ? <Spinner className="w-50"/> : "Start Test"}
                     </Link>
                      )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Modal show={show} size="fullscreen" onHide={handleClose} scrollable>
          <div>
            <button className="btn btn-danger float-end rounded-0" onClick={handleClose}>
              <i className="bi bi-x-lg fw-bolder"></i>
            </button>
            <h5 className="fs-5 fw-semibold text-start ps-3 pt-2">{chapterItem.description}</h5>
          </div>
          <Modal.Body>
            <div className="d-block"> 
              {chapterItem.video &&
              <div className="mb-4 mb-lg-5" >
                <VideoPlayer url={chapterItem.video} title={chapterItem.description}/>  
              </div>} 
              {chapterItem.ppt &&
              <div className="doc-viewer-container">
                <DocViewer
                  frameborder="0"
                  pluginRenderers={DocViewerRenderers}
                  documents={[{ uri: chapterItem.ppt }]}
                  onError={(e) => {
                    console.error("Error loading document:", e);
                  }}
                  style={{
                    height: "90vh",
                    borderColor: "none",
                    padding: "10px", 
                    borderRadius:"0rem",
                  }}
                  showToolbar={false}
                />
              </div>}
            </div>
          </Modal.Body>
        </Modal>
      </section>
    </>
  );
}

export default SubjectDetail;
