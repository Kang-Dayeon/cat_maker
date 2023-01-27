import { Route, Routes} from 'react-router-dom'
import React from 'react'
import Index from '../../pages'
import Detail from '../../pages/detail/detail'
import Header from '../../rayouts/header'
import '../../App.css'
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
              <Route exact path="/" element={<Index cat={catData}/>}></Route>
              <Route path="/detail/:key" element={<Detail cat={catData}/>}></Route>
            </Routes>
          </div>
        </div>
      </div>
    </>
  )
}
export default Routers