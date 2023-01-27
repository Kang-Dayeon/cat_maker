import React from 'react'
import { Link } from 'react-router-dom'
import '../../App.css'
//component
import Button from '../../component/Button'
import Badge from '../../component/Badge'

const Profile = (props) => {
  return (
    <div className="profile">
      <div className={props.cat.fat && !props.cat.death ? 'profile_img img fat' :
        props.cat.death ? 'profile_img img death' :
        'profile_img img'}>
        <img src={props.cat.death ? props.cat.dieImage : props.cat.image} />
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
        props.cat.fat && !props.cat.death ?
          <Badge
            color={'#E33D64'}
            position={'absolute'}
            right={'22%'}
            top={'12%'}
          >Fatness</Badge> :
          props.cat.death ?
            <Badge
              color={'#000'}
              position={'absolute'}
              right={'22%'}
              top={'12%'}
            >Death</Badge> :
            <Badge
              position={'absolute'}
              right={'22%'}
              top={'12%'}
            >Normal</Badge>
      }
      <Button><Link to={'/detail/' + props.cat.id} >View Profile</Link></Button>
    </div>
  )
}

export default Profile