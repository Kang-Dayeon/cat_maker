import React from 'react'
import '../App.css'
import Profile from './profile/profile'
import { useSelector } from 'react-redux'
import Login from './login/login'

const Index = () => {
  const isLogin = useSelector(state => state.user.isLogin)

  const cats = useSelector(state => state.cat.cats)
  return (
    <>
      {
        isLogin ? cats.map((item, i) => {
        return <Profile cat={item} key={i}/>
      }): <Login/>
      }
    </>
  )
}

export default Index