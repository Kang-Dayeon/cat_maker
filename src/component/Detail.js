import React from 'react'
import '../App.css'
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector, connect} from 'react-redux'
import {increaseCount} from '../reducer/giveFood'

const Detail = (props) => {

  const id = useParams().key
  const dispatch = useDispatch()
  const {weight} = useSelector(state => state.counter)
  const increases = () => {
    dispatch(increaseCount(props.cat[id]))
  }
  console.log(weight)
  return (
    <div className="detail">
      <div className="detail_profile">
        <div className="detail_img img">
          <img src={props.cat[id].image} />
        </div>
        <h3 className="detail_name">{props.cat[id].name}</h3>
      </div>
      <div className="detail_info">
        <ul className="profile_state">
          <li className="age">
            <p className="state_number">{props.cat[id].gender}</p>
            <p className="state_name">Gender</p>
          </li>
          <li className="age">
            <p className="state_number">{props.cat[id].age}</p>
            <p className="state_name">Age</p>
          </li>
          <li className="weight">
            <p className="state_number">{weight}kg</p>
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
        <button className="btn meal" onClick={increases}>Give Food</button>
      </div>
    </div>
  )
}

export default Detail