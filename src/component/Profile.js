import React from 'react'
import { Link } from 'react-router-dom'
import '../App.css'

const Profile = (props) => {
  return (
    <div className="profile">
      <div className="profile_img img">
      <img src={props.cat.die ? props.cat.dieImage : props.cat.image} />
      </div>
      <div className="profile_text">
        <p className="profile_name">{props.cat.name}</p>
        <span className="profile_gender">{props.cat.gender}</span>
      </div>
      <ul className="profile_state">
        <li className="age">
          <p className="state_number">{props.cat.age}</p>
          <p className="state_name">Age</p>
        </li>
        <li className="weight">
          <p className="state_number">{props.cat.weight}kg</p>
          <p className="state_name">Weight</p>
        </li>
      </ul>
      {
        props.cat.fat ?
          <div className="badge fat">Fatness</div> :
          <div className="badge">Normal</div>
      }
      <Link className="btn more" to={'/detail/' + props.cat.id} >View Profile</Link>
    </div>
  )
}

export default Profile