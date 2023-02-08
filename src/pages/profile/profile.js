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
// hook
import useInterval from '../../hooks/useInterval'
// data
import {catStatus} from '../../database/catList'

const Profile = () => {
  const navigate = useNavigate()

  const [catList, setCatList] = useRecoilState(catListState)

  useInterval(() => {
    handleTimeDifference()
  }, 1000)

  useInterval(() => {
    stateCheck()
  }, 1000)

  useInterval(() => {
    handleWeight()
  }, 60000)

  useInterval(() => {
    handleAge()
  }, 120000)

  // 마지막 밥먹은시간, 현재시간 업데이트
  const handleTimeDifference = () => {
    setCatList(
      catList.map((item, i) => {
        if(item.history.length > 0){
          return{
            ...item,
            timeDifference: Date.now() - item.history[item.history.length - 1].timeStamp,
          }
        } else {
          return {
            ...item,
            timeDifference: null
          }
        }
      })
    )
  }

  // 나이 변경
  const handleAge = () => {
    setCatList(
      catList.map((item, i) => {
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
  }

  // 몸무게 변경
  const handleWeight = () => {
    setCatList(
      catList.map((item, i) => {
        if((item.timeDifference > 60000) && (item.state !== catStatus.state4)){
          return{
            ...item,
            weight: Math.round((item.weight - 1) * 10) / 10,
          }
        } else {
          return {
            ...item,
            weight: item.weight
          }
        }
      })
    )
  }

  // 몸무게, 나이등 체크해서 상태변경하기
  const stateCheck = () => {
      setCatList(
        catList.map((item) => {
          if((item.weight < 2) && (item.weight > 0)){
            return {
              ...item,
              state : catStatus.state1
            }
          } else if(item.weight > 30){
            return {
              ...item,
              state : catStatus.state3
            }
          } else if((item.age >= 15) || ((item.age * 0.1) > (item.weight))){
            return {
              ...item,
              state : catStatus.state4
            }
          } else {
            return {
              ...item,
              state : catStatus.state2
            }
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
    const deleteConfirm = window.confirm('정말 삭제 하시겠습니까?')
    if (catList && deleteConfirm) {
      setCatList(catList => catList.filter(item => item.id !== id))
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