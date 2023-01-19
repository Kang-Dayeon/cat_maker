import { Route, Routes} from 'react-router-dom'
import React from 'react'
import Main from '../component/Main'
import Detail from '../component/Detail'
import {catList} from '../data/cat_List'
import Header from '../common/header'
import '../App.css'

const Routers = () => {
  return (
    <>
      <div className="wrap">
        <Header />
        <div className="content">
          <div className="content_wrap">
            <Routes>
              <Route exact path="/" element={<Main cat={catList}/>}></Route>
              <Route path="/detail/:key" element={<Detail cat={catList}/>}></Route>
            </Routes>
          </div>
        </div>
      </div>
    </>
  )
}
export default Routers