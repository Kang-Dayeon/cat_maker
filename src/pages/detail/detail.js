import React, {useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import '../../App.css'
//component
import Button from '../../component/Button'
import Badge from '../../component/Badge'
// redux
import {useDispatch, useSelector} from 'react-redux'
import {handleSelectedCat, addHistory} from '../../redux/cats'
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
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const cats = useSelector(state => state.cats.cats)
  const selectedCat = useSelector(state => state.cats.selectedCat)
  // const disabled = useSelector(state => state.cats.disabled)
  const user = useSelector(state => state.user.loginUser)

  const addEating = (actionType) => {
    dispatch(addHistory({
      type: 'eat',
      dates: new Date().toLocaleString(),
      actionType,
      disabled: false
    }))
  }

  useEffect(() => {
    if (params.key && cats.find(cat => cat.id === parseInt(params.key))) {
      dispatch(handleSelectedCat(parseInt(params.key)))
    } else {
      navigate('/')
    }
  })


  if (!selectedCat) return
  // useEffect는 렌더링 이후 발생하기 때문에 이걸로 데이터체크를 해주고(아예 처음엔 데이터가 null임) 다시 재렌더링하면서 useEffect가 발생 됨

  return (
    <div className="detail">
      <div className="detail_profile">
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
          <li className="age">
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
                    selectedCat.history[0].dates :
                    ''} {user.name}
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
                    selectedCat.history[selectedCat.history.length - 1].dates :
                    ''} {user.name}
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
                      {item.dates}  {user.name}
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
        <Button
          action={'Water'}
          disabled={selectedCat.state === 'Death' || selectedCat.disabled ? 'disabled' : ''}
          onClick={() => addEating('water')}
        >
          <FontAwesomeIcon icon={faBottleWater}/>
        </Button>
        <Button
          action={'Meat'}
          disabled={selectedCat.state === 'Death' || selectedCat.disabled ? 'disabled' : ''}
          onClick={() => addEating('meat')}
        >
          <FontAwesomeIcon icon={faDrumstickBite}/>
        </Button>
        <Button
          action={'Feed'}
          disabled={selectedCat.state === 'Death' || selectedCat.disabled ? 'disabled' : ''}
          onClick={() => addEating('feed')}
        >
          <FontAwesomeIcon icon={faBowlRice}/>
        </Button>
        <Button
          action={'work out'}
          disabled={selectedCat.state === 'Death' ? 'disabled' : ''}
          onClick={() => addEating('work out')}
        >
          <FontAwesomeIcon icon={faDumbbell}/>
        </Button>
      </div>
    </div>
  )
}

export default Detail