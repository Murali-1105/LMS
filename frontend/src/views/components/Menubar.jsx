import React from 'react' 
import { NavLink } from 'react-router-dom' 
import './Css/Menu.css'

const Menu = ({id,progress,title}) => { 
  
  return (
  <div className="menu-container">
    <input type="checkbox" id="toggle" defaultChecked />
    <label className="button" htmlFor="toggle">
      <div className="nav">
        <ul className="d-flex">
          <li> 
            <NavLink to={`/student/subject-detail/${id}/${progress}/${title}`}><i className="bi bi-journals fs-5"></i></NavLink>
          </li>
          <li>
            <NavLink to={`/student/notes/${id}/${progress}/${title}`}><i className="bi bi-pen fs-5"></i></NavLink>
          </li>
          <li>
            <NavLink to={`/student/discussion/${id}/${progress}/${title}`}><i className="bi bi-chat-text fs-5"></i></NavLink>
          </li>
        </ul>
      </div>
    </label>
  </div>
  )
}

export default Menu