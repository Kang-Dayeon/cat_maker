import React from 'react'
import '../App.css'
import {Link, useNavigate} from 'react-router-dom'
// component
import Button from '../component/Button'
// recoil
import {useRecoilState, useResetRecoilState} from 'recoil'
import {isLoginState} from '../recoil/userAtoms'
import {catListState} from '../recoil/catAtoms'

const Header = () => {
  const navigate = useNavigate()

  const [isLogin, setIsLogin] = useRecoilState(isLoginState)
  const resetCatList = useResetRecoilState(catListState)

  const logout = () => {
    setIsLogin(false)
    resetCatList()
    navigate('/')
  }
  return (
    <div className="header">
      <Link to="/"><h1>Cat Maker 🐈</h1></Link>
      {
        isLogin ?
          <Button margin={'none'} onClick={async () => {
            await logout()
          }}>Logout</Button> :
          <></>
      }
    </div>
  )
}

export default Header