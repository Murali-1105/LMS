import {Navigate} from 'react-router-dom';
import { useAuthStore } from '../store/auth';

const PrivateRoute = ({children}) => {
    const { isLoggedIn, role }=useAuthStore((state) => ({ isLoggedIn: state.isLoggedIn, role: state.role,}));
    // return loggedIn ? <>{children}</> : <Navigate to ='/Dashboard/' />;
 
    return !isLoggedIn ? ( <Navigate to='/' />  
       ): role === 'student' ? ( <Navigate to='/student/dashboard' /> 
       ): ( <>{children}</>); 
    };

export default PrivateRoute;

// import { Navigate } from 'react-router-dom'
// import { useSelector } from 'react-redux'

// const PrivateRoute = ({ children }) => {
//   const { user } = useSelector((state) => state.auth)

//   if (user) return children

//   return <Navigate to='/login' />
// }

// export default PrivateRoute