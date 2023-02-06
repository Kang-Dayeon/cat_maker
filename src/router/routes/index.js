import {Route, Routes} from 'react-router-dom'
import React from 'react'
import Index from '../../pages'
import Detail from '../../pages/detail/detail'
import Login from '../../pages/login/login'
import Header from '../../layouts/header'
import CreateCat from '../../pages/new/createCat'
import '../../App.css'

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
              <Route path="/create_form" element={<CreateCat/>}></Route>
            </Routes>
          </div>
        </div>
      </div>
    </>
  )
}
export default Routers