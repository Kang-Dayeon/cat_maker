import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import '../../App.css'
//component
import Button from '../../component/Button'
import Badge from '../../component/Badge'
// redux
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { handleSelectedCat } from '../../redux/cats'
// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBottleWater, faDrumstickBite, faBowlRice } from "@fortawesome/free-solid-svg-icons";

const Detail = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const cats = useSelector(state => state.cats.cats)
  const selectedCat = useSelector(state => state.cats.selectedCat)

  // console.log(cats.find(cat => cat.id === Number(params.key)))
  // console.log(dispatch(handleSelectedCat(parseInt(params.key))))

  // const date = new Date()
  // const currentDate = date.getFullYear()+'년'+(date.getMonth()+1)+'월'+date.getDate()+'일 '+date.getHours()+'시'+date.getMinutes()+'분'+date.getSeconds()+'초'

  // const increases = () => {
  //   dispatch(increaseCount(id, props.cat[id].weight + 0.5, currentDate, props.cat[id].age))
  // }

  useEffect(() => {
    if (params.key && cats.find(cat => cat.id === parseInt(params.key))){
      dispatch(handleSelectedCat(parseInt(params.key)))
      console.log(params)
    } else {
      navigate('/')
    }
  })

  // useEffect(() => {
  //   if(selectedCat.weight >= 30){
  //     dispatch(handleBodyState(id, props.cat[id].fat = true))
  //   }
  // },[props.cat[id].weight])
  //
  // useEffect(() => {
  //   if(props.cat[id].age >= 15){
  //     dispatch(handleLifeState(id, props.cat[id].death = true))
  //   }
  //   if(props.cat[id].age % 3 === 0 || props.cat[id].age === 1){
  //     dispatch(messageNum(id, props.cat[id].messageNum + 1))
  //   }
  // }, [props.cat[id].age])
  //
  // useEffect(() => {
  //   dispatch(messageAdd(id, props.cat[id].messages.slice(0,props.cat[id].messageNum)))
  // }, [props.cat[id].messageNum])

  if (!selectedCat) return;
  // useEffect는 렌더링 이후 발생하기 때문에 이걸로 데이터체크를 해주고(아예 처음엔 데이터가 null임) 다시 재렌더링하면서 useEffect가 발생 됨

  return (
    <div className="detail">
      <div className="detail_profile">
        <div className="detail_img img">
          <img src={selectedCat.death ? selectedCat.dieImage : selectedCat.image} />
        </div>
        <div className="detail_text">
          <h3 className="detail_name">{selectedCat.name}</h3>
          {
            selectedCat.fat && ! selectedCat.death ? <Badge color={'#E33D64'}>Fatness</Badge> :
              selectedCat.death ? <Badge color={'#000'}>Death</Badge> :
            <Badge>Normal</Badge>
          }
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
            <h4>[ Meal Time ]</h4>
            <ul>
              {
                selectedCat.dates.map((item) => {
                  return (
                    <li>{item}</li>
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
        <Button food={'Water'}><FontAwesomeIcon icon={faBottleWater} size="lg" /></Button>
        <Button food={'Meat'}><FontAwesomeIcon icon={faDrumstickBite} /></Button>
        <Button food={'Feed'}><FontAwesomeIcon icon={faBowlRice} /></Button>
        {/* {
          selectedCat.death ?
          <Button color={"#8f9da9"} cursor={'default'} disabled>Death</Button> :
          <Button >Give Food</Button>
        } */}
      </div>
    </div>
  )
}

export default Detail