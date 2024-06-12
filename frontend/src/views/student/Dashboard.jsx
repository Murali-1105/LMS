import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import useAxios from "../../utils/useAxios";

// import "./Css/Dashboard.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";  

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
 
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
); 

 
 
// const chartConfigs = subjects.map((subject, index) => {
//   let labels = [subject.title];

//   let data = {
//     labels,
//     datasets: [
//       {
//         label: 'Current Month',
//         data: [subject.progress],
//         backgroundColor: 'rgb(255, 99, 132)',
//       },
//     ],
//   };

//   return data;
// });
 
 
function Dashboard() {       
  const [subjects, setSubjects] = useState([]); 
  const [subjectArray, setSubjectArray] = useState([]); 
  const [subjectProgressArray, setSubjectProgressArray] = useState([]); 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); 
   
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await useAxios().get("/user/subject");
        if (response.data && Array.isArray(response.data.subjects)) {
          setSubjects(response.data.subjects);
          
          const subjectArraylocal = response.data.subjects.map(subject => subject.title);
          const subjectProgresslocal = response.data.subjects.map(subject => subject.progress);

          setSubjectArray(subjectArraylocal);
          setSubjectProgressArray(subjectProgresslocal);
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

    
  const settings = {
     dots: false,
     infinite: false,
     speed: 500,
     slidesToShow: 4,
     slidesToScroll: 1,
     arrows: true,
     responsive: [
       {
         breakpoint: 1024,
         settings: {
           slidesToShow: 3,
           slidesToScroll: 1,
         },
       },
       {
         breakpoint: 768,
         settings: {
           slidesToShow: 2,
           slidesToScroll: 1,
         },
       },
       {
         breakpoint: 480,
         settings: {
           slidesToShow: 1,
           slidesToScroll: 1,
         },
       },
     ], 
   }; 
    
   const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Subject Total Progress',
      },
    },
  }; 
   
  const labels = subjectArray;
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Current Month',
        data: subjectProgressArray,
        backgroundColor: 'rgb(255, 99, 132)',
      },
    
    ],
  }; 
    
 return ( 
     <> 
             <div class="container-fluid">
                 <div class="my-4">
                  <h4><i class="bi bi-grid-1x2-fill fs-5 pe-2"></i>Dashboard</h4>
                 </div>
                 <div class="row px-3">
                     <div class="col-12 col-md-6 col-lg-4 d-flex">
                         <div class="card flex-fill border-0 illustration">
                             <div class="card-body p-0 d-flex flex-fill">
                                 <div class="row g-0 w-100">
                                     <div class="col-6">
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
                     <div class="col-12 col-md-6 col-lg-4 d-flex">
                         <div class="card flex-fill border-0">
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
                     <div class="col-12 col-md-6 col-lg-4  d-flex">
                         <div class="card flex-fill border-0">
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
                 <Bar options={options} data={data} />
               <div class="my-4">
                     <h4><i class="bi bi-file-earmark-fill pe-2"></i>My Subjects</h4>
               </div>
             <div className="card-container px-2">  
              <div>
                {loading && <p><i className="fas fa-spinner fa-spin"></i></p>}
                {error && <p>Error: {error.message}</p>} 
               </div>
               <Slider {...settings}>
                 {subjects.map((subject, index) => (  
                   <div className="card px-2" key={index}> 
                     <img src={subject.img} className="img-fluid card-img-top rounded-top-3" alt={subject.title} style={{ width: "100%", height: "200px", objectFit: "cover",}}/> 
                     <div className="card-body rounded-bottom-3">
                       <h5 className="card-title fs-6">{subject.title}</h5>
                       <div className="mt-5">
                         <div className="progress" style={{height: '8px' , marginBottom:'5px'}}>
                           <div
                             className="progress-bar"
                             role="progressbar"
                             style={{ width: `${subject.progress}%` }}
                             aria-valuenow={subject.progress}
                             aria-valuemin="0"
                             aria-valuemax="100"
                           ></div>
                         </div>
                         {subject.progress}%
                       </div>
                       <Link
                         className="btn btn-primary mt-3 w-100"
                         to={`/student/course-detail/${subject.id}/${subject.progress}`}
                       >
                         {" "}
                         {subject.buttontext} 
                         continue
                       </Link>
                     </div>
                   </div> 
                ))}
               </Slider>
             </div>
          </div>  
     </>
 );
}

export default Dashboard;
