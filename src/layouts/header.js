import React from 'react'
import '../App.css'
import {Link, useNavigate} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowRightFromBracket} from '@fortawesome/free-solid-svg-icons'
// redux
import {useDispatch} from 'react-redux'
import {logout} from '../redux/login'
import {useSelector} from 'react-redux'

const Header = () => {
  const navigate = useNavigate()

  // ** redux
  const dispatch = useDispatch()
  const isLogin = useSelector(state => state.user.isLogin)

  const logoutAction = () => {
    dispatch(logout())
    navigate('/')
  }
  return (
    <div className="header">
      <Link to="/"><h1>Cat Maker 🐈</h1></Link>
      {
        isLogin ?
          <div className="header__button">
            <button className="logout_btn" onClick={async () => {await logoutAction()}}>
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
            </button>
          </div> :
          <></>
      }
    </div>
  )
}

export default Header