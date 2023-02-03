import React, {useEffect,useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import '../../App.css'
//component
import Button from '../../component/Button'
import Badge from '../../component/Badge'
import Timer from '../../component/Timer'
// redux
import {useSelector} from 'react-redux'
//recoil
import {catListState, selectedCatState} from '../../recoil/catAtoms'
import {useRecoilState} from 'recoil'
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
//hook
import useInterval from '../../hooks/useInterval'


const Detail = () => {
  const params = useParams()
  const navigate = useNavigate()

  //redux
  const user = useSelector(state => state.user.loginUser)

  //recoil
  const [catList, setCatList] = useRecoilState(catListState)
  const [selectedCat, setSelectedCat] = useRecoilState(selectedCatState)

  // useStates
  const [countEat, setCountEat] = useState(0)
  const [random, setRandom] = useState(0)
  const [timer, setTimer] = useState(null)
  const [delay, setDelay] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [work, setWork] = useState(false)
  const [eat, setEat] = useState(false)

  const randomCheck = random < 7 ? true : false

  const catAge = selectedCat ? selectedCat.age : null
  const weight = selectedCat ? selectedCat.weight : null

  //custom hooks
  useInterval(() => {
    setTimer(timer - 1)
  }, delay)

  // function
  const counter = (actionType) => {
    setRandom(  Math.floor((Math.random() * (10 - 2)) + 2))
    actionTypeCheck(actionType)
    actionWorkOut(actionType)
    stateCheck()
  }

  // recoil history
  const addHistory = (actionType) => {
    setSelectedCat((selectedCat) => {
      return {...selectedCat,
          history: [
          ...selectedCat.history,
          {
            type: 'eat',
            timeLine: new Date().toLocaleString() + ' ' + user.name,
            actionType,
          }
      ]}
    })
  }

  const handleWeight = (weight) => {
    setSelectedCat((selectedCat) => {
      return {
        ...selectedCat,
        weight: Math.round((selectedCat.weight + weight) * 10) / 10
      }
    })
  }

  // 함수안에서 바로 리코일 스테이트 가져오면 바로 업데이트가 안됨
  const addAge = () => {
    if((countEat % 3 === 0) && (countEat !== 0)){
      setSelectedCat((selectedCat) => {
        return{
          ...selectedCat,
          age: selectedCat.age + 1
        }
      })
    }
  }

  const addMessage = (message) => {
    setSelectedCat((selectedCat) => {
      return {
        ...selectedCat,
        message: [...message]
      }
    })
  }

  //타입 체크
  const actionTypeCheck = (actionType) => {
    if(randomCheck && actionType !== 'work out'){
      if(actionType === 'water'){
        handleWeight(0.1)
      } else if (actionType === 'meat'){
        handleWeight(3)
      } else if (actionType === 'feed'){
        handleWeight( 1)
      }
      addHistory(actionType)
      setCountEat(countEat + 1)
    } else if(!randomCheck && actionType !== 'work out'){
      setDisabled(true)
      setEat(true)
      disabledCheckOut(actionType)
    }
  }

  const actionWorkOut = (actionType) => {
    if(actionType === 'work out'){
      handleWeight(-2)
      addHistory(actionType)
      setDisabled(true)
      setWork(true)
      setTimer(10)
      setDelay(1000)
      disabledCheckOut(actionType)
    }
  }

  // 상태변화
  const handleState = (state) => {
    setSelectedCat((selectedCat) => {
      return {
        ...selectedCat,
        state
      }
    })
  }

  const stateCheck = () => {
    (selectedCat.weight < 2 && selectedCat.weight > 0) ? handleState(catStatus.state1) :
      (selectedCat.weight > 30) ? handleState(catStatus.state3) :
        ((selectedCat.age >= 15) || ((selectedCat.age * 0.1) > (selectedCat.weight))) ? handleState(catStatus.state4) :
          handleState(catStatus.state2)
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
  // selected cat
  useEffect(() => {
    if (params.key && catList.find(cat => cat.id === parseInt(params.key))) {
      // dispatch(handleSelectedCat(parseInt(params.key)))
      const finder = catList.find(cats => cats.id === parseInt(params.key))
      setSelectedCat(finder)
    } else {
      navigate('/')
    }
  },[params])

  useEffect(() => {
    if(selectedCat){
      addAge(countEat)
    }
  },[countEat])

  // 메세지 추가
  useEffect(() => {
    if(((catAge % 3 === 0) || (catAge !== 0)) && (catAge !== null)){
      // dispatch(addMessage(Math.floor(catAge/3) + 1))
      addMessage(selectedCat.messages.slice(0, Math.floor(catAge/3) + 1))
    }
  }, [catAge])

  useEffect(() => {
    if(weight !== null){
      stateCheck()
    }
  }, [weight])

  // cat data update
  useEffect(() => {
    if(selectedCat){
      setCatList([
        ...catList.filter(cat => cat.id !== selectedCat.id),
        selectedCat
      ])
    }
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
                        selectedCat.history[selectedCat.history.length - 1].actionType === 'water' ?
                          <FontAwesomeIcon icon={faBottleWater}/> :
                          selectedCat.history[selectedCat.history.length - 1].actionType === 'meat' ?
                            <FontAwesomeIcon icon={faDrumstickBite}/> :
                            selectedCat.history[selectedCat.history.length - 1].actionType === 'feed' ?
                              <FontAwesomeIcon icon={faBowlRice}/> :
                              selectedCat.history[selectedCat.history.length - 1].actionType === 'work out' ?
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