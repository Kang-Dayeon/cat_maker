import React, {useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import '../../App.css'
//component
import Button from '../../component/Button'
import Badge from '../../component/Badge'
import Timer from '../../component/Timer'
import ContentBox from '../../component/ContentBox'
//hook
import useInterval from '../../hooks/useInterval'
//recoil
import {loginUserState} from '../../recoil/userAtoms'
import {catListState, selectedCatState} from '../../recoil/catAtoms'
import {useRecoilState, useRecoilValue} from 'recoil'
//data
import {catStatus} from '../../database/catList'
// fontawesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  faBottleWater,
  faDrumstickBite,
  faBowlRice,
  faDumbbell,
} from '@fortawesome/free-solid-svg-icons'

const Detail = () => {
  const params = useParams()
  const navigate = useNavigate()

  const user = useRecoilValue(loginUserState)
  const userName = user[0].name
  const [catList, setCatList] = useRecoilState(catListState)
  const [selectedCat, setSelectedCat] = useRecoilState(selectedCatState)

  const [countEat, setCountEat] = useState(0)
  const [random, setRandom] = useState(0)
  const [timer, setTimer] = useState(null)
  const [delay, setDelay] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [work, setWork] = useState(false)
  const [eat, setEat] = useState(false)

  const randomCheck = (random < 7) ? true : false
  const catAge = (selectedCat) ? selectedCat.age : null
  const weight = (selectedCat) ? selectedCat.weight : null

  // 메세지 비활성화 타이머
  useInterval(() => {
    setTimer(timer - 1)
  }, delay)

  // 마지막 밥먹은시간, 현재시간 업데이트
  useInterval(() => {
    if (selectedCat.history.length > 0) {
      setSelectedCat((selectedCat) => {
        return {
          ...selectedCat,
          timeDifference: selectedCat.history[selectedCat.history.length - 1].timeStamp - Date.now()
        }
      })
    }
  }, 1000)

  // 마지막 밥먹고 1분 이상됐을경우 체중 -1
  useInterval(() => {
    if ((selectedCat) && (-selectedCat.timeDifference > -60000) && (selectedCat.state !== catStatus.state4)) {
      handleWeight(-1)
    }
  }, 60000)

  // 키우기시작(버튼클릭)후 2분 경과시 나이 +1
  useInterval(() => {
    if ((selectedCat.history.length > 0) && (selectedCat.state !== catStatus.state4)) {
      setSelectedCat((selectedCat) => {
        return {
          ...selectedCat,
          age: selectedCat.age + 1,
        }
      })
    }
  }, 120000)

  //버튼클릭시 함수
  const counter = (actionType) => {
    setRandom(Math.floor((Math.random() * (10 - 2)) + 2))
    actionTypeCheck(actionType)
    actionWorkOut(actionType)
    stateCheck()
  }

  // history 추가
  const addHistory = (actionType, currentTime) => {
    setSelectedCat((selectedCat) => {
      return {
        ...selectedCat,
        history: [
          ...selectedCat.history,
          {
            type: 'eat',
            timeLine: new Date().toLocaleString() + ' ' + userName,
            actionType,
            timeStamp: Date.now(),
          },
        ],
      }
    })
  }

  // 상태변화
  const handleState = (state) => {
    setSelectedCat((selectedCat) => {
      return {
        ...selectedCat,
        state,
      }
    })
  }

  // 체중추가
  const handleWeight = (weight) => {
    setSelectedCat((selectedCat) => {
      return {
        ...selectedCat,
        weight: Math.round((selectedCat.weight + weight) * 10) / 10,
      }
    })
  }

  // 나이추가
  const addAge = () => {
    if ((countEat % 3 === 0) && (countEat !== 0)) {
      setSelectedCat((selectedCat) => {
        return {
          ...selectedCat,
          age: selectedCat.age + 1,
        }
      })
    }
  }

  // 메세지추가
  const addMessage = (message) => {
    setSelectedCat((selectedCat) => {
      return {
        ...selectedCat,
        message: [...message],
      }
    })
  }

  // 밥 먹을지 안먹을지 & 먹었을경우 타입 체크 후 몸무게 더하기 + 버튼 비활성화
  const actionTypeCheck = (actionType) => {
    if ((randomCheck) && (actionType !== 'work out')) {
      if (actionType === 'water') {
        handleWeight(0.1)
      } else if (actionType === 'meat') {
        handleWeight(3)
      } else if (actionType === 'feed') {
        handleWeight(1)
      }
      addHistory(actionType)
      setCountEat(countEat + 1)
    } else if ((!randomCheck) && (actionType !== 'work out')) {
      setDisabled(true)
      setEat(true)
      disabledCheckOut(actionType)
    }
  }

  // 운동하기 버튼 클릭시 체중 -2 & 10초동안 비활성화
  const actionWorkOut = (actionType) => {
    if (actionType === 'work out') {
      handleWeight(-2)
      addHistory(actionType)
      setDisabled(true)
      setWork(true)
      setTimer(10)
      setDelay(1000)
      disabledCheckOut(actionType)
    }
  }

  // 몸무게, 나이등 체크해서 상태변경하기
  const stateCheck = () => {
    ((selectedCat.weight < 2) && (selectedCat.weight > 0)) ?
      handleState(catStatus.state1) :
      (selectedCat.weight > 30) ?
        handleState(catStatus.state3) :
        ((selectedCat.age >= 15) ||
          ((selectedCat.age * 0.1) > (selectedCat.weight))) ?
          handleState(catStatus.state4) :
          handleState(catStatus.state2)
  }

  //비활성화 풀기
  const disabledCheckOut = (actionType) => {
    if (actionType === 'work out') {
      setTimeout(() => {
        setDisabled(false)
        setWork(false)
        setDelay(null)
      }, 10000)
      setTimer(10)
    } else {
      setTimeout(() => {
        setDisabled(false)
        setEat(false)
      }, random * 1000)
    }
  }

  // selected cat 업로드
  useEffect(() => {
    if ((params.key) &&
      (catList.find(cat => cat.id === parseInt(params.key)))) {
      const finder = catList.find(cats => cats.id === parseInt(params.key))
      setSelectedCat(finder)
    } else {
      navigate('/')
    }
  }, [params])

  // 먹은 횟수에따라 나이 변경
  useEffect(() => {
    if (selectedCat) {
      addAge(countEat)
    }
  }, [countEat])

  // 메세지 추가
  useEffect(() => {
    if (((catAge % 3 === 0) || (catAge !== 0)) && (catAge !== null)) {
      addMessage(selectedCat.messages.slice(0, Math.floor(catAge / 3) + 1))
    }
  }, [catAge])

  // 몸무게 변경될때마다 상태체크
  useEffect(() => {
    if (weight !== null) {
      stateCheck()
    }
  }, [weight])

  // selected cat 데이터 변경될때마다 전체 데이터 업로드
  useEffect(() => {
    if (selectedCat) {
      const filterCat = catList.filter(cat => cat.id !== selectedCat.id)
      filterCat.push(selectedCat)
      filterCat.sort((a,b) => a.id - b.id)
      setCatList([
        ...filterCat
      ])
    }
  }, [selectedCat])

  if (!selectedCat) return
  // useEffect는 렌더링 이후 발생하기 때문에 이걸로 데이터체크를 해주고(아예 처음엔 데이터가 null임) 다시 재렌더링하면서 useEffect가 발생 됨

  return (
    <ContentBox size={'big'}>
      <div className="detail_profile">
        <Timer work={eat} top={'-25'} type={'lg'}>놉!! 안머겅!!</Timer>
        <div className={(selectedCat.state === 'Fatness') ? 'detail_img img fat' :
          (selectedCat.state === 'Death') ?
            'detail_img img death' :
            'detail_img img'}>
          <div className={(selectedCat.state === 'Death') ? 'death_layer' : ''}></div>
          <img alt="cat profile" src={selectedCat.image}/>
        </div>
        <div className="detail_text">
          <h3 className="detail_name">{selectedCat.name}</h3>
          <Badge state={selectedCat.state}>{selectedCat.state}</Badge>
        </div>
      </div>
      <div className="detail_info">
        <ul className="profile_state">
          <li className="gender">
            <p className="state_number">{selectedCat.gender}</p>
            <p className="state_name">Gender</p>
          </li>
          <li className="age">
            <p className="state_number">{selectedCat.age}</p>
            <p className="state_name">Age</p>
          </li>
          <li className="weight">
            <p className="state_number">{selectedCat.weight}kg</p>
            <p className="state_name">Weight</p>
          </li>
        </ul>
        <div className="add_text">
          <div className="time">
            <ul>
              <li className="time_section">
                <h4>[ First Time ]</h4>
                <p>
                  <span>
                    {
                      (selectedCat.history.length === 0) ? '' :
                        (selectedCat.history[0].actionType === 'water') ?
                          <FontAwesomeIcon icon={faBottleWater}/> :
                          (selectedCat.history[0].actionType === 'meat') ?
                            <FontAwesomeIcon icon={faDrumstickBite}/> :
                            (selectedCat.history[0].actionType === 'feed') ?
                              <FontAwesomeIcon icon={faBowlRice}/> :
                              (selectedCat.history[0].actionType ===
                                'work out') ?
                                <FontAwesomeIcon icon={faDumbbell}/> :
                                ''
                    }
                  </span>
                  {(selectedCat.history.length > 0) ?
                    selectedCat.history[0].timeLine :
                    ''}
                </p>
              </li>
              <li className="time_section">
                <h4>[ Last Time ]</h4>
                <p>
                  <span>
                    {
                      (selectedCat.history.length === 0) ? '' :
                        (selectedCat.history[selectedCat.history.length - 1].actionType === 'water') ?
                          <FontAwesomeIcon icon={faBottleWater}/> :
                          (selectedCat.history[selectedCat.history.length - 1].actionType === 'meat') ?
                            <FontAwesomeIcon icon={faDrumstickBite}/> :
                            (selectedCat.history[selectedCat.history.length - 1].actionType === 'feed') ?
                              <FontAwesomeIcon icon={faBowlRice}/> :
                              (selectedCat.history[selectedCat.history.length - 1].actionType === 'work out') ?
                                <FontAwesomeIcon icon={faDumbbell}/> :
                                ''
                    }
                  </span>
                  {(selectedCat.history.length > 0) ?
                    selectedCat.history[selectedCat.history.length -
                    1].timeLine :
                    ''}
                </p>
              </li>
              <li><h3>[ Timeline ]</h3></li>
              {
                selectedCat.history.map((item, i) => {
                  return (
                    <li>
                      <span>
                        {
                          (item.actionType === 'water') ?
                            <FontAwesomeIcon icon={faBottleWater}/> :
                            (item.actionType === 'meat') ?
                              <FontAwesomeIcon icon={faDrumstickBite}/> :
                              (item.actionType === 'feed') ?
                                <FontAwesomeIcon icon={faBowlRice}/> :
                                <FontAwesomeIcon icon={faDumbbell}/>
                        }
                      </span>
                      {item.timeLine}
                    </li>
                  )
                })
              }
            </ul>
          </div>
          <div className="message">
            <h4>[ Message ]</h4>
            <ul>
              {
                selectedCat.message.map((item, i) => {
                  return (
                    <li>{item}</li>
                  )
                })
              }
            </ul>
          </div>
        </div>
        <div className="button__wrap">
          <Button
            action={'Water'}
            disabled={((selectedCat.state === 'Death') || (disabled)) ?
              'disabled' :
              ''}
            onClick={() => counter('water')}
          >
            <FontAwesomeIcon icon={faBottleWater}/>
          </Button>
          <Button
            action={'Meat'}
            disabled={((selectedCat.state === 'Death') || (disabled)) ?
              'disabled' :
              ''}
            onClick={() => counter('meat')}
          >
            <FontAwesomeIcon icon={faDrumstickBite}/>
          </Button>
          <Button
            action={'Feed'}
            disabled={((selectedCat.state === 'Death') || (disabled)) ?
              'disabled' :
              ''}
            onClick={() => counter('feed')}
          >
            <FontAwesomeIcon icon={faBowlRice}/>
          </Button>
          <div className="timer__wrap">
            <Timer work={work} top={'-15'} type={'small'}>{timer}</Timer>
            <Button
              action={'work out'}
              disabled={((selectedCat.state === 'Death') || (disabled)) ?
                'disabled' :
                ''}
              onClick={() => counter('work out')}
            >
              <FontAwesomeIcon icon={faDumbbell}/>
            </Button>
          </div>
        </div>
      </div>
    </ContentBox>
  )
}

export default Detail