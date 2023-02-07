import React, {useEffect, useState} from 'react'
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
import useInterval from '../../hooks/useInterval'
import {catStatus} from '../../database/catList'

const Profile = () => {
  const navigate = useNavigate()

  const [catList, setCatList] = useRecoilState(catListState)

  const weight = catList ? catList.weight : null

  // 마지막 밥먹은시간, 현재시간 업데이트
  useInterval(() => {
    setCatList(
      catList.map((item, i) => {
        if(item.history.length > 0){
          return{
          ...item,
            timeDifference: item.history[item.history.length - 1].timeStamp - Date.now(),
          }
        } else {
          return {
            ...item
          }
        }
      })
    )
  }, 1000)

  // 마지막 밥먹고 1분 이상됐을경우 체중 -1
  useInterval(() => {
    setCatList(
      catList.map((item) => {
        if((-item.timeDifference > -60000) && (item.state !== catStatus.state4)){
          return{
            ...item,
            weight: item.weight - 1
          }
        } else {
          return {
            ...item,
            weight: item.weight
          }
        }
      })
    )
  }, 60000)

  // 키우기시작(버튼클릭)후 2분 경과시 나이 +1
  useInterval(() => {
    setCatList(
      catList.map((item) => {
        if ((item.history.length > 0) && (item.state !== catStatus.state4)){
          return {
            ...item,
            age: item.age + 1,
          }
        } else {
          return {
            ...item,
            age: item.age
          }
        }
      })
    )
  }, 120000)

  // 몸무게, 나이등 체크해서 상태변경하기
  const stateCheck = () => {
    catList.map((item) => {
      ((item.weight < 2) && (item.weight > 0)) ?
        handleState(catStatus.state1) :
        (item.weight > 30) ?
          handleState(catStatus.state3) :
          ((item.age >= 15) ||
            ((item.age * 0.1) > (item.weight))) ?
            handleState(catStatus.state4) :
            handleState(catStatus.state2)
    })
  }
  // 상태변화
  const handleState = (state) => {
    setCatList(
      catList.map((item) => {
        return {
          ...item,
          state,
        }
      })
    )
  }

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

  useEffect(() => {
    if(catList.weight || catList.age){
      stateCheck()
      handleState()
    }
  }, [weight])

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