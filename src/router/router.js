import { Link, Route, Routes} from 'react-router-dom'
import React from 'react'
import Main from '../component/Main'

const Routers = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Main/>}></Route>
      </Routes>
    </>
  )
}
export default Routers