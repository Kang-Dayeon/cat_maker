import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../../App.css'
//component
import Button from '../../component/Button'
import Badge from '../../component/Badge'

const Profile = (props) => {
  const navigate = useNavigate()
  const cats = props.cat

  const handleDetailNavigate = (id) => {
    navigate('/detail/' + id)
  }
  return (
    <div className="profile">
      <div className={cats.fat && !cats.death ? 'profile_img img fat' :
        cats.death ? 'profile_img img death' :
        'profile_img img'}>
        <img src={cats.death ? cats.dieImage : cats.image} />
      </div>
      <div className="profile_text">
        <p className="profile_name">{cats.name}</p>
        <span className="profile_gender">{cats.gender}</span>
      </div>
      <ul className="profile_state">
        <li className="age">
          <p className="state_number">{cats.age}</p>
          <p className="state_name">Age</p>
        </li>
        <li className="weight">
          <p className="state_number">{cats.weight}kg</p>
          <p className="state_name">Weight</p>
        </li>
      </ul>
      {
        cats.fat && !cats.death ?
          <Badge
            color={'#E33D64'}
            position={'absolute'}
            right={'22%'}
            top={'12%'}
          >Fatness</Badge> :
          cats.death ?
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
      <Button onClick={() => handleDetailNavigate(cats.id)}>View Profile</Button>
    </div>
  )
}

export default Profile