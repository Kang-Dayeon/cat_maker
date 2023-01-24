import { Route, Routes} from 'react-router-dom'
import React from 'react'
import Main from '../component/Main'
import Detail from '../component/Detail'
import Header from '../common/header'
import '../App.css'
import {useSelector} from 'react-redux'

const Routers = () => {
  const catData = useSelector(state => state.reducer)
  // console.log(catData)
  
  return (
    <>
      <div className="wrap">
        <Header />
        <div className="content">
          <div className="content_wrap">
            <Routes>
              <Route exact path="/" element={<Main cat={catData}/>}></Route>
              <Route path="/detail/:key" element={<Detail cat={catData}/>}></Route>
            </Routes>
          </div>
        </div>
      </div>
    </>
  )
}
export default Routers