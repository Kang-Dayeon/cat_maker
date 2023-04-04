import React, {useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import '../../App.css'
// component
import Button from '../../component/Button'
import Badge from '../../component/Badge'
import Timer from '../../component/Timer'
import ContentBox from '../../component/ContentBox'
// hook
import useInterval from '../../hooks/useInterval'
// redux
import {useDispatch, useSelector} from 'react-redux'
import {
  addHistory,
  addTimeDifference,
  handleSelectedCat,
  handleAge,
  handleState,
  handleWeight,
  addMessage,
  updateData
} from '../../redux/cats'
// data
import {catStatus} from '../../database/catList'
//icon
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  faBottleWater,
  faDrumstickBite,
  faBowlRice,
  faDumbbell,
} from '@fortawesome/free-solid-svg-icons'

const Detail = () => {
  // TODO : custom hook으로 변경
  // ** react
  const params = useParams()
  const navigate = useNavigate()

  // ** redux
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.loginUser)
  const catList = useSelector(state => state.cat.catList)
  const selectedCat = useSelector(state => state.cat.selectedCat)

  // ** state
  const [countEat, setCountEat] = useState(0)
  const [random, setRandom] = useState(0)
  const [timer, setTimer] = useState(null)
  const [delay, setDelay] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [work, setWork] = useState(false)
  const [eat, setEat] = useState(false)

  // ** hook
  // 메세지 비활성화 타이머
  useInterval(() => {
    setTimer(timer - 1)
  }, delay)

  // 마지막 밥먹은시간, 현재시간 업데이트
  useInterval(() => {
    handleTimeDifference()
  }, 1000)

  // 마지막 밥먹고 1분 이상됐을경우 체중 -1
  useInterval(() => {
    if ((selectedCat) && (selectedCat.timeDifference > 60000) && (selectedCat.state !== catStatus.death)) {
      dispatch(handleWeight(-1))
    }
  }, 60000)

  // 키우기시작(버튼클릭)후 2분 경과시 나이 +1
  useInterval(() => {
    addAge()
  }, 120000)

  const handleTimeDifference = () => {
    dispatch(addTimeDifference(Date.now() - selectedCat.history[selectedCat.history.length - 1].timeStamp))
  }

  //버튼클릭시 함수
  const counter = (actionType) => {
    setRandom(Math.floor((Math.random() * (10 - 2)) + 2))
    actionTypeCheck(actionType)
    if (((selectedCat.age % 3 === 0) || (selectedCat.age !== 0)) && (selectedCat.age !== null)) {
      dispatch(addMessage(selectedCat.messages.slice(0, Math.floor(selectedCat.age / 3) + 1)))
    }
  }

  const addHistoryAction = (actionType) => {
    dispatch(addHistory({
        type: 'eat',
        timeLine: new Date().toLocaleString() + ' ' + user.name,
        actionType,
        timeStamp: Date.now(),
      },
    ))
  }

  // 나이추가
  const addAge = () => {
    if ((countEat % 3 === 0) && (countEat !== 0) && (selectedCat.history.length > 0) && (selectedCat.state !== catStatus.death)) {
      dispatch(handleAge(1))
    }
  }

  // 밥 먹을지 안먹을지 & 먹었을경우 타입 체크 후 몸무게 더하기 + 버튼 비활성화
  const actionTypeCheck = (actionType) => {
    if ((random < 7) && (actionType !== 'work out')) {
      if (actionType === 'water') {
        dispatch(handleWeight(0.1))
      } else if (actionType === 'meat') {
        dispatch(handleWeight(3))
      } else if (actionType === 'feed') {
        dispatch(handleWeight(1))
      }
      addHistoryAction(actionType)
      setCountEat(countEat + 1)
    } else if ((actionType !== 'work out')) {
      setDisabled(true)
      setEat(true)
      disabledCheckOut(actionType)
    } else if(actionType === 'work out'){
      dispatch(handleWeight(-2))
      addHistoryAction(actionType)
      setDisabled(true)
      setWork(true)
      setTimer(10)
      setDelay(1000)
      disabledCheckOut(actionType)
    }
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

  // selectedCat 업로드
  useEffect(() => {
    if ((params.key) &&
      (catList.find(cat => cat.id === parseInt(params.key)))) {
      dispatch(handleSelectedCat(parseInt(params.key)))
    } else {
      navigate('/')
    }
  }, [params])

  // 먹은 횟수에따라 나이 변경
  useEffect(() => {
    if (selectedCat) {
      addAge(countEat)
      dispatch(handleState())
    }
  }, [countEat])

  useEffect(() => {
    dispatch(updateData())
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
                selectedCat.history.map((item) => {
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
                selectedCat.message.map((item) => {
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