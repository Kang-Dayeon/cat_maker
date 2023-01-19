import React from 'react'
import '../App.css'
import Profile from './Profile'

const Main = (props) => {
  return (
    <>
      {
        props.cat.map((item,i) => {
          return <Profile cat={item} key={i} />
        })
      }
    </>
  )
}

export default Main