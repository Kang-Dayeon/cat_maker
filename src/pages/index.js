import React from 'react'
import '../App.css'
import Profile from './profile/Profile'

const Index = (props) => {
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

export default Index