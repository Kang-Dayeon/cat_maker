import React, { useEffect } from 'react'
import '../App.css'
import {useParams} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {increaseCount, handleLifeState, handleBodyState} from '../reducer/catData'

const Detail = (props) => {
  const id = useParams().key
  const dispatch = useDispatch()
  const date = new Date()
  const currentDate = date.getFullYear()+'년'+(date.getMonth()+1)+'월'+date.getDate()+'일 '+date.getHours()+'시'+date.getMinutes()+'분'+date.getSeconds()+'초'
  const increases = () => {
    dispatch(increaseCount(id, props.cat[id].weight + 0.5, currentDate, props.cat[id].age))
  }

  useEffect(() => {
    if(props.cat[id].weight >= 30){
      dispatch(handleBodyState(id, props.cat[id].fat = true))
    }
  },[props.cat[id].weight])

  useEffect(() => {
    if(props.cat[id].age >= 15){
      dispatch(handleLifeState(id, props.cat[id].death = true))
    }
  }, [props.cat[id].age])

  return (
    <div className="detail">
      <div className="detail_profile">
        <div className="detail_img img">
          <img src={props.cat[id].death ? props.cat[id].dieImage : props.cat[id].image} />
        </div>
        <div className="detail_text">
          <h3 className="detail_name">{props.cat[id].name}</h3>
          {
            props.cat[id].fat && ! props.cat[id].death ? <div className="badge fat">Fatness</div> :
            props.cat[id].death ? <div className="badge death">Death</div> :
            <div className="badge">Normal</div>
          }
        </div>
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
          <h4>[ Meal Time ]</h4>
          <ul>
            {
              props.cat[id].date.map((item) => {
                return (
                  <li>{item}</li>
                )
              })
            }
          </ul>
        </div>
        {
          props.cat[id].death ?
          <button className="btn death" disabled>Death</button> :
          <button className="btn meal" onClick={increases}>Give Food</button>
        }
        
      </div>
    </div>
  )
}

export default Detail