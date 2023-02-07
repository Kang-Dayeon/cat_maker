import React from 'react'
import {useNavigate} from 'react-router-dom'
import '../../App.css'
//component
import Button from '../../component/Button'
import Badge from '../../component/Badge'
import ContentBox from '../../component/ContentBox'
// fontawesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash} from '@fortawesome/free-solid-svg-icons'
// recoil
import {useRecoilState} from 'recoil'
import {catListState} from '../../recoil/catAtoms'

const Profile = () => {
  const navigate = useNavigate()

  const [catList, setCatList] = useRecoilState(catListState)

  // 상세페이지 이동
  const handleDetailNavigate = (id) => {
    navigate('/detail/' + id)
  }

  // 삭제하기
  const deleteCat = (id) => {
    if (catList) {
      console.log(id)
      setCatList(catList => catList.filter(item => item.id !== id))
      navigate('/')
    }
  }

  return (
    <>
      {catList.map((catList) => {
        return <ContentBox size={'small'}>
          <div
            className={(catList.state === 'Fatness') ? 'profile_img img fat' :
              (catList.state === 'Death') ?
                'profile_img img death' :
                'profile_img img'}>
            <div className={(catList.state === 'Death') ? 'death_layer' : ''}></div>
            <img alt="cat profile" src={catList.image}
            />
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
            disabled={(catList.state === 'Death') ? 'disabled' : ''}
            onClick={() => handleDetailNavigate(catList.id)}
          >
            View Profile
          </Button>
          <div className="delete-button" onClick={() => deleteCat(catList.id)}>
            <FontAwesomeIcon icon={faTrash}/>
          </div>
        </ContentBox>
      })
      }
    </>
  )
}

export default Profile