import React, { useEffect, useState ,useRef} from "react";
import { Link } from "react-router-dom";  
import UserData from '../../views/plugin/UserData.js';
import useAxios from "../../utils/useAxios"; 

import "./Css/Dashboard.css";
import Swiper from 'swiper'; 
import { Navigation} from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";

import { PolarArea,Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, RadialLinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import { MainSpinner } from "../components/Spinner.jsx";
  
Swiper.use([Navigation]); 

ChartJS.register(CategoryScale, LinearScale, BarElement,RadialLinearScale, ArcElement, Tooltip, Legend); 
 
function Dashboard() {       
  const user =UserData(); 
  
  const [subjects, setSubjects] = useState([]); 
  const [subjectTitle, setSubjectTitle] = useState([]); 
  const [subjectProgress, setSubjectProgress] = useState([]); 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);  
  const [hasAnimated, setHasAnimated] = useState(false); 
   
  useEffect(() => {
    setHasAnimated(true); 
    fetchSubjects(); 
  }, []);
  
  
  const fetchSubjects = async () => {  
    setLoading(true);
    try {
      const response = await useAxios().get("/user/subject");
      if (response.data && Array.isArray(response.data.subjects)) {
        setSubjects(response.data.subjects);
        
        const subjectTitlelocal = response.data.subjects.map(subject => subject.title);
        const subjectProgresslocal = response.data.subjects.map(subject => subject.progress);

        setSubjectTitle(subjectTitlelocal);
        setSubjectProgress(subjectProgresslocal);
      } else {
        setSubjects([]);
        setError(new Error("Invalid data format"));
      }
    } catch (error) {
      console.error("Error fetching subjects:", error);
      setError(error);
    } finally {
      setLoading(false); 
    }  
  }
    
  const swiperRef = useRef(null);
 
  useEffect(() => {
    if (swiperRef.current) {
      new Swiper(swiperRef.current, {
        loop: false,
        spaceBetween: 25,
        grabCursor: true, 

        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          dynamicBullets: true,
        }, 

        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }, 

        breakpoints: { 
          0: {
            slidesPerView: 1,
            touchRatio: 1,
          },
          600: {
            slidesPerView: 2, 
            touchRatio: 0,
          },
          968: {
            slidesPerView: 3, 
            touchRatio: 0,
          },  
          1200:{ 
            slidesPerView: 4, 
            touchRatio: 0,
          } 
        },
      }); 
    }
  }, []);  
   
   
  const data = {
    labels: subjectTitle,
    datasets: [
      {
        label: 'Total Progress',
        data: subjectProgress,
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }; 
   
  const options = { 
    responsive: true, 
    scales: {
      r: {
        suggestedMin: 0,
        suggestedMax: 100,
        pointLabels: {
          font: {
            size: 12,
            weight: 'bold',
          },
          color: '#aaaaaa',
        },
      },
    },
    plugins: { 
      legend: {
        display: true, 
        position: 'top',
        labels: {
          font: {
            size: 10,
          }, 
      
        },
      },
    },
  };  
   
  const data2 = {
    labels: subjectTitle,
    datasets: [ 
      { 
        label: 'Total Progress',
        data: subjectProgress,
        backgroundColor: 'rgba(54, 162, 235, 0.8)',  
        borderWidth: 1,  
        borderColor:"rgba(54, 162, 235, 1)",
      },
    ],
  };   

  const options2 = {  
    maintainAspectRatio: false, 
    legend: {display: false},
    responsive: true,  
    plugins: {
      legend: { 
        display: true,
        position: 'top',  
        align: 'center',
        labels: {
           font: {
              weight: 'bold'
           }, 
        }
      },  
    },  
     
    scales: { 
      x: { 
        grid: {
          display: false,
        },
        ticks: {
          fontColor: '#333',  
          font: {
            size: 8, 
          },
        },
      },
      y: {   
        beginAtZero: true, 
        min: 0,
        max: 100,
        ticks: {
          stepSize: 10, 
          fontColor: '#333',  
        },
        grid: { 
          display: true,
          color: 'rgba(0, 0, 0, 0)',
        },
      },
    },
    elements: {
      bar: {
        borderRadius: 2,
        borderWidth: 0.7,
      },
    },   
    animation: {
      duration: 800,
      easing: 'linear', 
    }, 
   
  };  
    

    
 return ( 
     <>   
      <section className="section px-2 px-lg-5 py-4">
       <div className="container-fluid">  
            <h4 className="my-4"><i className="bi bi-grid-1x2-fill fs-5 pe-2"></i>Dashboard</h4>
                    <div className="row">
                     <div className="col-12 col-sm-6 col-xl-4 d-flex">
                         <div className="card flex-fill border shadow-sm primary-subtle">
                             <div className="row g-0">
                                 <div className="col-8 d-flex align-items-center">
                                     <div className="card-body flex-grow-1">
                                         <div className="p-2">
                                             <h6 className="">Welcome Back, {user.username}</h6>
                                             <p className="mb-0 text-muted">{user.program}</p>
                                         </div>
                                     </div> 
                                    </div>
                                     <div className="col-4">
                                         <img src={user.user_image} className="img-fluid avatar-profile rounded-end-2" alt="user-img" />
                                     </div>
                             </div>
                         </div>
                     </div>
                     <div className="col-12 col-sm-6 col-xl-4 d-flex">
                         <div className="card flex-fill border shadow-sm">
                             <div className="card-body">
                                 <div className="d-flex align-items-center justify-content-between">
                                     <div className="p-3 flex-grow-1">
                                         <h4 className="mb-1">{subjects.length}</h4>
                                         <p className="mb-0 text-muted">Total Subjects</p>
                                         {/* <div className="mb-0">
                                             <span className="text-muted">
                                              Since Last Month
                                             </span>
                                         </div>  */}
                                     </div>  
                                        <div className="">
                                          <img src="/books-svgrepo-com.svg" alt="subject-svg" className="img-fluid avatar-lg" />
                                        </div>
                                    </div>
                                 </div>
                            </div> 
                         </div>  
                     <div className="col-12 col-sm-6 col-xl-4  d-flex">
                         <div className="card flex-fill border shadow-sm">
                             <div className="card-body">
                                 <div className="d-flex align-items-center justify-content-between">
                                     <div className="p-3 flex-grow-1">
                                         <h4 className="mb-1">0</h4>
                                         <p className="mb-0 text-muted">Completed Units</p>
                                         {/* <div className="mb-0">
                                             <span className="text-muted">
                                                 Since Last Month
                                             </span>
                                         </div> */}
                                    </div>
                                    <div className="">
                                       <img src="/notebook-svgrepo-com.svg" alt="subject-svg" className="img-fluid avatar-lg" />
                                    </div>
                                </div>
                             </div>
                         </div>  
                       </div>
                   </div> 
         { subjectProgress.length > 0 && <div className="row mt-2">  
                <div className="col-12 d-none d-xl-block col-xl-7"> 
                   <div className="card border shadow-sm">  
                      <div className="card-body">
                        <Bar data={data2} options={options2} style={{height:'350px'}} /> 
                      </div>
                   </div>
                </div>  
                <div className="col-12 d-none d-xl-block col-xl-5">
                   <div className="card border shadow-sm " > 
                     <div className="card-body flex-grow-1 d-flex align-items-center justify-content-center" style={{height:'380px',}}>
                        <PolarArea data={data} options={options} />
                     </div>
                   </div>
               </div>  
            </div>}
                
             <h4 className="my-4"><i className="bi bi-book-half pe-2"></i>My Subjects</h4> 
              <div className='d-flex justify-content-center align-items-center'> 
                 {loading && <p style={{marginTop: '100px'}}> <MainSpinner/> </p>}
                 {error && <p style={{marginTop: '100px'}}>{error.message} 😔</p>} 
              </div> 
              <div className="card-container swiper">  
                <div className="card-content" ref={swiperRef}>
                 <div className="swiper-wrapper">
                          {subjects.map((subject) => (
                            <div key={subject.id} className="card card-box swiper-slide">
                                <img src={subject.img} alt="avatar" className="img-fluid card-img-top" style={{ height: '180px', objectFit: 'cover' }}/>
                              <div className="card-body">
                                  <h3 className="card-title fs-6" style={{ height: '20px' }}>{subject.title}</h3>
                                     <div className="mt-5">
                                         <div className="progress" style={{height: '5px' , marginBottom:'5px'}}>
                                            <div
                                               className={`progress-bar ${hasAnimated ? 'animate' : ''}`}
                                               role="progressbar"
                                               style={{ width: `${subject.progress}%` }}
                                               aria-valuenow={subject.progress}
                                               aria-valuemin="0"
                                               aria-valuemax="100"> 
                                             </div> 
                                          </div> 
                                           {subject.progress}%
                                        </div>
                               <Link className="btn btn-primary mt-3 w-100" to={`/student/subject-detail/${subject.id}/${subject.progress}/${subject.title}`}>  
                                 {subject.buttontext}continue 
                               </Link>
                              </div>
                            </div>
                          ))}
                       </div>  
                    </div>
                      <div className="swiper-button-next">
                      <i className="bi bi-arrow-right-circle"></i>
                      </div>
                      <div className="swiper-button-prev">
                      <i className="bi bi-arrow-left-circle"></i>
                      </div>
                  </div>   
                </div> 
          </section>
     </>
 );
}

export default Dashboard;
