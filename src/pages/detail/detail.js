import React, {useEffect,useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import '../../App.css'
//component
import Button from '../../component/Button'
import Badge from '../../component/Badge'
import Timer from '../../component/Timer'
// redux
import {useDispatch, useSelector} from 'react-redux'
import {
  handleSelectedCat,
  addHistory,
  handleWeight,
  handleAge,
  handleState,
  addMessage,
  upDateData
} from '../../redux/cats'
// fontawesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  faBottleWater,
  faDrumstickBite,
  faBowlRice,
  faDumbbell,
} from '@fortawesome/free-solid-svg-icons'
import useInterval from '../../hooks/useInterval'

const Detail = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const cats = useSelector(state => state.cat.cats)
  const selectedCat = useSelector(state => state.cat.selectedCat)
  const user = useSelector(state => state.user.loginUser)

  const catAge = selectedCat ? selectedCat.age : 0

  // useStates
  const [eating, setEating] = useState(0)
  const [random, setRandom] = useState(0)
  const [timer, setTimer] = useState(null)
  const [delay, setDelay] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [work, setWork] = useState(false)
  const [eat, setEat] = useState(false)

  //custom hooks
  useInterval(() => {
    setTimer(timer - 1)
  }, delay)

  // function
  const counter = (actionType) => {
    actionWatcher(actionType)
    disabledCheck(actionType)
  }

  // dispatch reducer
  const timeLine = (actionType) => {
    dispatch(addHistory({
      type: 'eat',
      timeLine: new Date().toLocaleString() + ' '+user.name,
      actionType,
    }))
  }

  //action타입에 따른 상태변경
  const actionWatcher = (actionType) => {
    setRandom(Math.floor((Math.random() * (10 - 2)) + 2))
    if((random < 7) && actionType !== 'work out') {
      setEating(eating + 1)
      if(actionType === 'water'){
        dispatch(handleWeight(+(selectedCat.weight + 0.1).toFixed(1) ))
      } else if (actionType === 'meat'){
        dispatch(handleWeight(selectedCat.weight + 3))
      } else if (actionType === 'feed'){
        dispatch(handleWeight(selectedCat.weight + 1))
      }
      timeLine(actionType)
    }
    if(actionType === 'work out'){
      dispatch(handleWeight(+(selectedCat.weight - 2).toFixed(1)))
      timeLine(actionType)
    }
  }
  // 비활성화
  const disabledCheck = (actionType) => {
    if((random >= 7) && (actionType !== 'work out')){
      setDisabled(true)
      setEat(true)
      disabledCheckOut(actionType)
    }
    if(actionType === 'work out'){
      setDisabled(true)
      setWork(true)
      setTimer(10)
      setDelay(1000)
      disabledCheckOut(actionType)
    }
  }
  //비활성화 풀기
  const disabledCheckOut = (actionType) => {
    if(actionType === 'work out'){
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

  //useEffect
  useEffect(() => {
    if (params.key && cats.find(cat => cat.id === parseInt(params.key))) {
      dispatch(handleSelectedCat(parseInt(params.key)))
    } else {
      navigate('/')
    }
  },[params])

  // 메세지 추가
  useEffect(() => {
    if(catAge % 3 === 0 || catAge !== 0){
      dispatch(addMessage(Math.floor(catAge/3) + 1))
    }
  }, [catAge])

  // 나이먹기
  useEffect(() => {
    if((eating % 3 === 0) && (eating !== 0)){
      dispatch(handleAge(1))
    }
  }, [eating])

  // cat data update
  useEffect(() => {
    dispatch(handleState())
    dispatch(upDateData())
    console.log(selectedCat)
  }, [selectedCat])

  if (!selectedCat) return
  // useEffect는 렌더링 이후 발생하기 때문에 이걸로 데이터체크를 해주고(아예 처음엔 데이터가 null임) 다시 재렌더링하면서 useEffect가 발생 됨

  return (
    <div className="detail">
      <div className="detail_profile">
        <Timer work={eat} top={'-25'} type={'lg'}>놉!! 안머겅!!</Timer>
        <div className="detail_img img">
          <img alt="cat profile"
            src={selectedCat.state === 'Death' ?
            selectedCat.dieImage :
            selectedCat.image}/>
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
                      selectedCat.history.length === 0 ? '' :
                        selectedCat.history[0].actionType === 'water' ?
                          <FontAwesomeIcon icon={faBottleWater}/> :
                          selectedCat.history[0].actionType === 'meat' ?
                            <FontAwesomeIcon icon={faDrumstickBite}/> :
                            selectedCat.history[0].actionType === 'feed' ?
                              <FontAwesomeIcon icon={faBowlRice}/> :
                              selectedCat.history[0].actionType === 'work out' ?
                                <FontAwesomeIcon icon={faDumbbell}/> :
                                ''
                    }
                  </span>
                  {selectedCat.history.length > 0 ?
                    selectedCat.history[0].timeLine :
                    ''}
                </p>
              </li>
              <li className="time_section">
                <h4>[ Last Time ]</h4>
                <p>
                  <span>
                    {
                      selectedCat.history.length === 0 ? '' :
                        selectedCat.history[selectedCat.history.length -
                        1].actionType === 'water' ?
                          <FontAwesomeIcon icon={faBottleWater}/> :
                          selectedCat.history[selectedCat.history.length -
                          1].actionType === 'meat' ?
                            <FontAwesomeIcon icon={faDrumstickBite}/> :
                            selectedCat.history[selectedCat.history.length -
                            1].actionType === 'feed' ?
                              <FontAwesomeIcon icon={faBowlRice}/> :
                              selectedCat.history[selectedCat.history.length -
                              1].actionType === 'work out' ?
                                <FontAwesomeIcon icon={faDumbbell}/> :
                                ''
                    }
                  </span>
                  {selectedCat.history.length > 0 ?
                    selectedCat.history[selectedCat.history.length - 1].timeLine :
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
                          item.actionType === 'water' ?
                            <FontAwesomeIcon icon={faBottleWater}/> :
                            item.actionType === 'meat' ?
                              <FontAwesomeIcon icon={faDrumstickBite}/> :
                              item.actionType === 'feed' ?
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
            disabled={selectedCat.state === 'Death' || disabled ? 'disabled' : ''}
            onClick={() => counter('water')}
          >
            <FontAwesomeIcon icon={faBottleWater}/>
          </Button>
          <Button
            action={'Meat'}
            disabled={selectedCat.state === 'Death' || disabled ? 'disabled' : ''}
            onClick={() => counter('meat')}
          >
            <FontAwesomeIcon icon={faDrumstickBite}/>
          </Button>
          <Button
            action={'Feed'}
            disabled={selectedCat.state === 'Death' || disabled ? 'disabled' : ''}
            onClick={() => counter('feed')}
          >
            <FontAwesomeIcon icon={faBowlRice}/>
          </Button>
          <div className="timer__wrap">
            <Timer work={work} top={'-15'} type={'small'}>{timer}</Timer>
            <Button
              action={'work out'}
              disabled={selectedCat.state === 'Death' || disabled ? 'disabled' : ''}
              onClick={() => counter('work out')}
            >
              <FontAwesomeIcon icon={faDumbbell}/>
            </Button>
        </div>
        </div>

      </div>
    </div>
  )
}

export default Detail