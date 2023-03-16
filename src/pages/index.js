import React from 'react'
import '../App.css'
import Profile from './profile/profile'
//component
import Login from './login/login'
import NewCat from './new/newCat'
// redux
import {useSelector} from 'react-redux'

const Index = () => {
  const isLogin = useSelector(state => state.user.isLogin)

  return (
    <>
      {isLogin ? <><Profile/><NewCat/></> : <Login/>}
    </>
  )
}

export default Index