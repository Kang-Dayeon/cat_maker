import React from 'react'
import '../App.css'
import Profile from './profile/profile'
//component
import Login from './login/login'
import NewCat from './new/newCat'
//recoil
import {useRecoilValue} from 'recoil'
import {isLoginState} from '../recoil/userAtoms'

const Index = () => {
  const isLogin = useRecoilValue(isLoginState)

  return (
    <>
      {isLogin ? <><Profile/><NewCat/></> : <Login/>}
    </>
  )
}

export default Index