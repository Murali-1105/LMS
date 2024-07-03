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
import DefaultLayout from './views/student/layout/DefaultLayout';
import StudentDashboard from './views/student/Dashboard' 
import StudentSubjectDetail from './views/student/SubjectDetail' 
import StudentProfile from './views/student/Profile' 
import StudentQuiz from './views/student/Quiz/Quiz'  
import StudentTicket from './views/student/Tickets' 
import StudentCalender from './views/student/Calender' 
import StudentLeaderBoard from './views/student/LeaderBoard' 
import StudentInterviewQus from './views/student/InterviewQus'
import StudentSubjects from './views/student/Subjects'   
import StudentScorePage from './views/student/Quiz/ScorePage'
import ChangePassword from './views/student/ResetPassword' 
import Dev from './views/student/Dev'



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
          <Route path='/student/' element={<DefaultLayout />}>
            <Route index element={<StudentDashboard />} />   
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="subject-detail/:id/:progress" element={<StudentSubjectDetail/>} />
            <Route path="profile/" element={<StudentProfile/>} />
            <Route path="subjects/" element={<StudentSubjects/>} />   
            <Route path='quiz/:chapterid' element={<StudentQuiz/>} /> 
            <Route path='ticket/' element={<StudentTicket/>} /> 
            <Route path='quiz-result/:chapterid' element={<StudentScorePage/>}></Route>   
            <Route path='calender' element={<StudentInterviewQus/> }></Route> 
            <Route path='interview-questions' element={<StudentCalender/> }></Route> 
            <Route path='leadership-board' element={<StudentLeaderBoard/>}></Route> 
            <Route path="change-password/" element={<ChangePassword/>} />   
            <Route path="coming-soon/" element={<Dev/>}></Route> 
          </Route>
        </Routes> 
      </MainWrapper> 
    </BrowserRouter>
  )
}

export default App
