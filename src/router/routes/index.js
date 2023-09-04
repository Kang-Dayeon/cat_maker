import React from 'react'
import { useEffect} from 'react'
import {Route, Routes, Navigate, useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import Profile from '../../pages/profile/profile'
import Detail from '../../pages/detail/detail'
import Login from '../../pages/login/login'
import Header from '../../layouts/header'
import CreateCat from '../../pages/new/createCat'
import '../../App.css'

const Routers = () => {
  const navigate = useNavigate()
  const isLogin = useSelector(state => state.user.isLogin)

  const homeRoute = () => {
    if (isLogin) {
      return '/profile'
    } else {
      return '/login'
    }
  }

  useEffect(() => {
    if (isLogin) {
      navigate('/profile')
    } else {
      navigate('/login')
    }
  }, [isLogin])

  return (
    <>
      <div className="wrap">
        <Header/>
        <div className="content">
          <div className="content_wrap">
            <Routes>
              <Route path="/" element={<Navigate replace to={homeRoute()}/>}/>
              {/* <Route path="/" element={<Index/>}></Route> */}
              <Route path="/profile" element={<Profile/>}></Route>
              <Route path="/detail/:key" element={<Detail/>}></Route>
              <Route path="/login" element={<Login/>}></Route>
              <Route path="/create_form" element={<CreateCat/>}></Route>
            </Routes>
          </div>
        </div>
      </div>
    </>
  )
}
export default Routers