import React from 'react'
import '../App.css'
import Profile from './profile/profile'
//component
import Login from './login/login'
//recoil
import { useRecoilValue} from 'recoil'
import {isLoginState} from '../recoil/userAtoms'
import {catListState} from '../recoil/catAtoms'

const Index = () => {
  // ----------------------------- atoms ---------------------------//
  const isLogin = useRecoilValue(isLoginState)
  const catList = useRecoilValue(catListState)
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