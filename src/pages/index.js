import React from 'react'
import '../App.css'
import Profile from './profile/profile'
import { useSelector } from 'react-redux'

const Index = () => {
  const cats = useSelector(state => state.cats.cats)
  console.log(cats)
  return (
    <>
      {
        cats.map((item, i) => {
          return <Profile cat={item} key={i}/>
        })
      }
    </>
  )
}

export default Index