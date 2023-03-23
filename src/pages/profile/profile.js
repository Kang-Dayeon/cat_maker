import React from 'react'
import {useNavigate} from 'react-router-dom'
import '../../App.css'
// components
import Button from '../../component/Button'
import Badge from '../../component/Badge'
import ContentBox from '../../component/ContentBox'
// icon
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash} from '@fortawesome/free-solid-svg-icons'
// hooks
import useInterval from '../../hooks/useInterval'
// redux
import {useDispatch, useSelector} from 'react-redux'
import {
  handleTimeDifference,
  stateCheck,
  handleCatListAge,
  handleCatListWeight,
  deleteCat
} from '../../redux/cats'

const Profile = () => {
  // ** react
  const navigate = useNavigate()

  // ** redux
  const dispatch = useDispatch()
  const catList = useSelector(state => state.cat.catList)

  // ** hook
  useInterval(() => {
    dispatch(handleTimeDifference())
  }, 1000)

  useInterval(() => {
    dispatch(stateCheck())
  }, 1000)

  useInterval(() => {
    dispatch(handleCatListWeight())
  }, 60000)

  useInterval(() => {
    dispatch(handleCatListAge())
  }, 120000)

  // 상세페이지 이동
  const handleDetailNavigate = (id) => {
    navigate('/detail/' + id)
  }

  // 삭제하기
  const deleteCatAction = (id) => {
    const deleteConfirm = window.confirm('정말 삭제 하시겠습니까?')
    if (deleteConfirm) {
      dispatch(deleteCat(id))
      navigate('/')
    }
  }

  if (!catList) return

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
          <div className="delete-button" onClick={() => deleteCatAction(catList.id)}>
            <FontAwesomeIcon icon={faTrash}/>
          </div>
        </ContentBox>
      })
      }
    </>
  )
}

export default Profile