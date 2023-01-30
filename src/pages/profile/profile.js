import React from 'react'
import {useNavigate} from 'react-router-dom'
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
      <div className={cats.state === 'Fatness' ? 'profile_img img fat' :
        cats.state === 'Death' ? 'profile_img img death' : 'profile_img img'}>
        <img alt="cat profile"
             src={cats.state === 'Death' ? cats.dieImage : cats.image}/>
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
      <Badge
        state={cats.state}
        position={'absolute'}
        right={'22%'}
        top={'12%'}
      >{cats.state}</Badge>
      <Button
        disabled={cats.state === 'Death' ? 'disabled' : ''}
        onClick={() => handleDetailNavigate(cats.id)}
      >
        View Profile
      </Button>
    </div>
  )
}

export default Profile