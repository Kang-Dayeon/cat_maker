import React from 'react'
import '../App.css'
import {Link, useNavigate} from 'react-router-dom'
import {useRecoilState, useResetRecoilState} from 'recoil'
import {isLoginState} from '../recoil/userAtoms'
import {catListState} from '../recoil/catAtoms'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowRightFromBracket} from '@fortawesome/free-solid-svg-icons'
// import useHandleCatState from './store/useHandleCatState'

const Header = () => {
  const navigate = useNavigate()

  const [isLogin, setIsLogin] = useRecoilState(isLoginState)
  const resetCatList = useResetRecoilState(catListState)

  // useHandleCatState()

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
          <div className="header__button">
            <button className="logout_btn" onClick={async () => {await logout()}}>
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
            </button>
          </div> :
          <></>
      }
    </div>
  )
}

export default Header