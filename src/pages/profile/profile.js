import React from 'react'
import {useNavigate} from 'react-router-dom'
import '../../App.css'
//component
import Button from '../../component/Button'
import Badge from '../../component/Badge'
import ContentBox from '../../component/ContentBox'

const Profile = (props) => {
  // ----------------------------- react ---------------------------//
  const navigate = useNavigate()

  // ----------------------------- props ---------------------------//
  const catList = props.catList

  // ----------------------------- function ---------------------------//
  const handleDetailNavigate = (id) => {
    navigate('/detail/' + id)
  }

  return (
    <ContentBox size={'small'}>
      <div className={catList.state === 'Fatness' ? 'profile_img img fat' :
        catList.state === 'Death' ? 'profile_img img death' : 'profile_img img'}>
        <img alt="cat profile"
             src={catList.state === 'Death' ? catList.dieImage : catList.image}/>
      </div>
      <div className="profile_text">
        <p className="profile_name">{catList.name}</p>
        <span className="profile_gender">{catList.gender}</span>
      </div>
      <ul className="profile_state">
        <li className="age">
          <p className="state_number">{catList.age}</p>
          <p className="state_name">Age</p>
        </li>
        <li className="weight">
          <p className="state_number">{catList.weight}kg</p>
          <p className="state_name">Weight</p>
        </li>
      </ul>
      <Badge
        state={catList.state}
        position={'absolute'}
        right={'22%'}
        top={'12%'}
      >{catList.state}</Badge>
      <Button
        disabled={catList.state === 'Death' ? 'disabled' : ''}
        onClick={() => handleDetailNavigate(catList.id)}
      >
        View Profile
      </Button>
    </ContentBox>
  )
}

export default Profile