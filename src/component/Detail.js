import React, { useEffect } from 'react'
import '../App.css'
import {useParams} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {increaseCount, addAge, die} from '../reducer/catData'

const Detail = (props) => {
  const id = useParams().key
  const dispatch = useDispatch()
  const increases = () => {
    dispatch(increaseCount(id, props.cat[id].weight + 0.5))
  }

  useEffect(() => {
    if(props.cat[id].weight % 3 === 0){
      dispatch(addAge(id, props.cat[id].age + 1))
    }
  },[props.cat[id].weight])

  useEffect(() => {
    if(props.cat[id].age >= 15){
      dispatch(die(id, props.cat[id].die = true))
    }
    console.log(props.cat[id].age)
  }, [props.cat[id].age])

  return (
    <div className="detail">
      <div className="detail_profile">
        <div className="detail_img img">
          <img src={props.cat[id].die ? props.cat[id].dieImage : props.cat[id].image} />
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
            <p className="state_number">{props.cat[id].weight}kg</p>
            <p className="state_name">Weight</p>
          </li>
        </ul>
        <div className="add_text">
          <h4>Meal Time : {props.cat[id].date}</h4>
          <ul>
            <li>
              <p></p>
            </li>
          </ul>
        </div>
        {
          props.cat[id].die ?
          <button className="btn die" disabled>DIE</button> :
          <button className="btn meal" onClick={increases}>Give Food</button>
        }
        
      </div>
    </div>
  )
}

export default Detail