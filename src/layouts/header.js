import React from 'react'
import '../App.css'
import {Link, useNavigate} from 'react-router-dom'
import Button from '../component/Button'
import {persistor} from '../App'
import {isLoginState} from '../recoil/userAtoms'
import {useRecoilState} from 'recoil'

const Header = () => {
  const navigate = useNavigate()

  const [isLogin, setIsLogin] = useRecoilState(isLoginState)

  const logout = () => {
    setIsLogin(false)
    window.localStorage.removeItem('recoil-persist')
    navigate('/')
  }
  return (
    <div className="header">
      <Link to='/'><h1>Cat Maker 🐈</h1></Link>
      {isLogin ? <Button onClick={async () =>
      {
        await logout()
      }
      }>Logout</Button> : <></>}
    </div>
  )
}

export default Header