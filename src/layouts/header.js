import React from 'react'
import '../App.css'
import {Link} from 'react-router-dom'
import Button from '../component/Button'
import {useSelector} from 'react-redux'
import {persistor} from '../App'
import {logout} from '../redux/login'

const Header = () => {
  const isLogin = useSelector(state => state.user.isLogin)
  const purge =  async () => {
    await persistor.purge()
  }
  return (
    <div className="header">
      <Link to='/'><h1>Cat Maker 🐈</h1></Link>
      {isLogin ? <Button onClick={async () =>
      {
        await logout()
        await setTimeout(() => purge(), 200)
      }
      }>Logout</Button> : <></>}
    </div>
  )
}

export default Header