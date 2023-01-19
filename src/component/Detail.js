import React from 'react'
import '../App.css'

const Detail = (props) => {
  const cat = props.cat
  return (
    <div className="detail">
      <div className="detail_profile">
        <div className="detail_img img">
          <img src={cat[0].image} />
        </div>
        <h3 className="detail_name">{cat[0].name}</h3>
      </div>
      <div className="detail_info">
        <ul className="profile_state">
          <li className="age">
            <p className="state_number">{cat[0].gender}</p>
            <p className="state_name">Gender</p>
          </li>
          <li className="age">
            <p className="state_number">{cat[0].age}</p>
            <p className="state_name">Age</p>
          </li>
          <li className="weight">
            <p className="state_number">{cat[0].weight}kg</p>
            <p className="state_name">Weight</p>
          </li>
        </ul>
        <div className="add_text">
          <h4>Meal Time</h4>
          <ul>
            <li>
              <p></p>
            </li>
          </ul>
        </div>
        <button className="btn meal">Give food</button>
      </div>
    </div>
  )
}

export default Detail