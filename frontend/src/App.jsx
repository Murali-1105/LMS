import {Route,Routes,BrowserRouter} from 'react-router-dom'
import MainWrapper from './layouts/MainWrapper'
import PrivateRoute from './layouts/PrivateRoute'


//base Pages
import Login from '../src/views/auth/Login'   
import Logout from '../src/views/auth/Logout'   
import ForgotPassword from '../src/views/auth/ForgotPassword'   
import Error500 from './views/auth/Error500'
import Error404 from './views/auth/Error404' 

//Student Pages 
import DefaultStudentLayout from './views/student/layout/DefaultLayout';
import StudentDashboard from './views/student/Dashboard' 
import StudentSubjectDetail from './views/student/SubjectDetail' 
import StudentNotes from './views/student/Notes'
import StudentChat from './views/student/Chat'
import StudentProfile from './views/student/Profile' 
import StudentQuiz from './views/student/Quiz/Quiz'  
import StudentTicket from './views/student/Tickets' 
import StudentCalender from './views/student/Calender' 
import StudentLeaderBoard from './views/student/LeaderBoard' 
import StudentInterviewQus from './views/student/InterviewQus'
import StudentSubjects from './views/student/Subjects'   
import StudentScorePage from './views/student/Quiz/ScorePage'
import ChangePassword from './views/student/ResetPassword' 
import StudentDev from './views/student/Dev' 
 

//Teacher Pages 
import DefaultTeacherLayout from './views/teacher/Layout/DefaultLayout';
import TeacherDashboard from './views/teacher/Dashboard'
import TeacherCalender from './views/teacher/Calender' 
import TeacherDev from './views/teacher/Dev' 


function App() {
  return (
    <BrowserRouter>
      <MainWrapper>
        <Routes>
         {/* Base Routes */} 
          <Route path="/"  element={<Login />}/> 
          <Route path="/logout/"  element={<Logout />}  />  
          <Route path="/forgot-password/"  element={<ForgotPassword />}  /> 
          <Route path="/Error500/" element={<Error500/> } /> 
          <Route path="/Error404/" element={<Error404/>} />


          {/* Student Routes */}  
          <Route path='/student/' element={<DefaultStudentLayout/>}>
            <Route path="dashboard/" element={<StudentDashboard />} />
            <Route path={`subject-detail/:id/:progress/:title/`} element={<StudentSubjectDetail/>} /> 
            <Route path="notes/:id/:progress/:title/" element={<StudentNotes/>} /> 
            <Route path="discussion/:id/:progress/:title/" element={<StudentChat/>} /> 
            <Route path="profile/" element={<StudentProfile/>} />
            <Route path="subjects/" element={<StudentSubjects/>} />   
            <Route path='ticket/' element={<StudentTicket/>} /> 
            <Route path='quiz-result/:chapterid/' element={<StudentScorePage/>}></Route>   
            <Route path='calender/' element={<StudentInterviewQus/> }></Route> 
            <Route path='interview-questions/' element={<StudentCalender/> }></Route> 
            <Route path='leadership-board/' element={<StudentLeaderBoard/>}></Route> 
            <Route path="change-password/" element={<ChangePassword/>} />   
            <Route path="coming-soon/" element={<StudentDev/>}></Route> 
          </Route>  
          <Route path='quiz/:chapterid/:chapterName/:title/' element={<StudentQuiz/>}/> 
        
          
          {/* Teacher Routes */}
          <Route path='/teacher/' element={<DefaultTeacherLayout/>}>
            <Route path="dashboard/" element={<TeacherDashboard/>} /> 
            <Route path="calender/" element={<TeacherCalender/> } /> 
            <Route path="coming-soon/" element={<TeacherDev/>}></Route>  
          </Route>   

        </Routes> 
      </MainWrapper> 
    </BrowserRouter>
  )
}

export default App
