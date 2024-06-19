import React, { useEffect, useState ,useRef} from "react";
import { Link } from "react-router-dom"; 
import useAxios from "../../utils/useAxios";

import "./Css/Dashboard.css";
import Swiper from 'swiper'; 
import { Navigation} from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js';
import { Bar } from 'react-chartjs-2';
  
Swiper.use([Navigation]); 

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);  
 
 
function Dashboard() {       
  const [subjects, setSubjects] = useState([]); 
  const [subjectTitle, setSubjectTitle] = useState([]); 
  const [subjectProgress, setSubjectProgress] = useState([]); 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);  
  const [hasAnimated, setHasAnimated] = useState(false); 
   
  useEffect(() => {
    setHasAnimated(true);
  }, []);

  useEffect(() => {
    const fetchSubjects = async () => {
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

    fetchSubjects();
  }, []); 

    
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
          600: {
            slidesPerView: 2,
          },
          968: {
            slidesPerView: 3,
          },  
        },
      }); 
    }
  }, []);
    
  const options = {
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
          color: 'rgba(0, 0, 0, 0.1)',
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
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
    elements: {
      bar: {
        borderRadius: 3,
        borderWidth: 0.7,
      },
    }, 
  }; 
   
  const labels = subjectTitle 
   
  const data = {
    labels,
    datasets: [ 
      { 
        label: 'Total Progress',
        data: subjectProgress,
        backgroundColor: 'rgba(0, 123, 255, 0.8)', 
      },
      {
        label: 'Quiz Mark',
        data: [11,18,29,30,50],
        backgroundColor: 'rgba(220, 53, 69, 0.8)',
      }, 
    ],
  }; 
    
 return ( 
     <>   
      <section className="section px-2 px-lg-5 py-2">
       <div class="container-fluid"> 
          <h4 className="my-4"><i class="bi bi-grid-1x2-fill fs-5 pe-2"></i>Dashboard</h4>
          <div class="row">  
               <div className="d-none d-lg-block col-12 col-xl-8 mb-4 "> 
                   <div class="card border-0 shadow-sm w-100 h-100">  
                      <div className="card-body d-flex align-items-center justify-content-center">
                        <Bar options={options} data={data}/> 
                      </div>
                   </div>
                </div> 
                  <div className="col-12 col-xl-4"> 
                    <div className="row">
                     <div class="col-12 col-sm-6 col-xl-12 d-flex">
                         <div class="card flex-fill border-0 shadow-sm illustration">
                             <div class="card-body p-0 d-flex flex-fill">
                                 <div class="row g-0 w-100">
                                     <div class="col-6 flex-grow-1">
                                         <div class="p-3 m-1">
                                             <h4>Welcome Back, student1</h4>
                                             <p class="mb-0">B.S.c Aviation</p>
                                         </div>
                                     </div>
                                     <div class="col-6 align-self-end text-end">
                                         <img src="/public/student.jpg" class="img-fluid illustration-img" alt="" />
                                     </div>
                                 </div>
                             </div>
                         </div>
                     </div>
                     <div class="col-12 col-sm-6 col-xl-12 d-flex">
                         <div class="card flex-fill border-0 shadow-sm">
                             <div class="card-body py-4">
                                 <div class="d-flex align-items-start">
                                     <div class="flex-grow-1">
                                         <h4 class="mb-2">
                                             0
                                         </h4>
                                         <p class="mb-2">
                                             Total Course
                                         </p>
                                         <div class="mb-0">
                                             <span class="text-muted">
                                                 Since Last Month
                                             </span>
                                         </div> 
                                     </div> 

                                 </div>
                             </div>
                         </div> 
                     </div>  
                     <div class="col-12 col-sm-6 col-xl-12  d-flex">
                         <div class="card flex-fill border-0 shadow-sm">
                             <div class="card-body py-4">
                                 <div class="d-flex align-items-start">
                                     <div class="flex-grow-1">
                                         <h4 class="mb-2">
                                             0
                                         </h4>
                                         <p class="mb-2">
                                             Total Course
                                         </p>
                                         <div class="mb-0">
                                             <span class="text-muted">
                                                 Since Last Month
                                             </span>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                         </div>  
                       </div>
                   </div> 
                </div>  
             </div>   
             <h4 className="my-4"><i class="bi bi-book-half pe-2"></i>My Subjects</h4> 
             <div className="d-flex aligan-items-center justify-content-center">
              <div>
                {loading && <p><i className="fas fa-spinner fa-spin"></i></p>}
                {error && <p>Error: {error.message}</p>} 
              </div> 
              <div className="card-container swiper " >  
                <div className="card-content" ref={swiperRef}>
                 <div className="swiper-wrapper">
                          {subjects.map((subject) => (
                            <div key={subject.id} className="card card-box swiper-slide">
                                <img src={subject.img} alt="avatar" className="img-fluid card-img-top w-100 h-100"/>
                              <div className="card-body">
                                  <h3 className="card-title fs-6">{subject.title}</h3>
                                     <div className="mt-5">
                                         <div className="progress" style={{height: '8px' , marginBottom:'5px'}}>
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
                               <Link className="btn btn-primary mt-3 w-100" to={`/student/course-detail/${subject.id}/${subject.progress}`}>  
                                 {subject.buttontext}continue 
                               </Link>
                              </div>
                            </div>
                          ))}
                       </div>  
                    </div>
                      <div className="swiper-button-next">
                      <i class="bi bi-arrow-right-circle"></i>
                      </div>
                      <div className="swiper-button-prev">
                      <i class="bi bi-arrow-left-circle"></i>
                      </div>
                  </div>   
                </div>
              </div>
         </section>
     </>
 );
}

export default Dashboard;
