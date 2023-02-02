import React from 'react'
import '../App.css'
import Profile from './profile/profile'
//redux
import { useSelector } from 'react-redux'
import Login from './login/login'
//recoil
import {useRecoilValue} from 'recoil'
import {catListGetter} from '../recoil/selectors'

const Index = () => {
  //redux
  const isLogin = useSelector(state => state.user.isLogin)
  // const cats = useSelector(state => state.cat.cats)

  //recoil
  const catList = useRecoilValue(catListGetter)
  //logout시 사용할 리셋
  // const resetCatList = useResetRecoilState(catList)

  return (
    <>
      {
        isLogin ? catList.map((item, i) => {
        return <Profile catList={item} key={i}/>
      }): <Login/>
      }
    </>
  )
}

export default Index