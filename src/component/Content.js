import React from 'react'
import '../App.css'
import {catList} from '../data/cat_List'
import Profile from './Profile'
import Detail from './Detail'

const Content = () => {
  return (
    <div className="content">
      <div className="content_wrap">
        {
          catList.map((item,i) => {
            return <Profile cat={item} key={i} />
          })
        }
        <Detail cat={catList}/>
      </div>
    </div>
  )
}

export default Content