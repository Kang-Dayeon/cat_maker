import {Route, Routes, useNavigate} from 'react-router-dom'
import React, {useEffect} from 'react'
import Index from '../../pages'
import Detail from '../../pages/detail/detail'
import Login from '../../pages/login/login'
import Header from '../../rayouts/header'
import '../../App.css'
import {useSelector} from 'react-redux'

const Routers = () => {

  return (
    <>
      <div className="wrap">
        <Header />
        <div className="content">
          <div className="content_wrap">
            <Routes>
              <Route path="/" element={<Index/>}></Route>
              <Route path="/detail/:key" element={<Detail/>}></Route>
              <Route path="/login" element={<Login/>}></Route>
            </Routes>
          </div>
        </div>
      </div>
    </>
  )
}
export default Routers