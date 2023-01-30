import React from 'react'
import Button from '../../component/Button'
import '../../App.css'
import useInput from '../../hooks/useInput'
//redux
import {useDispatch} from 'react-redux'
import {login} from '../../redux/login'
// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaw } from '@fortawesome/free-solid-svg-icons'

const Login = () => {
  const dispatch = useDispatch()
  const [text, setText] = useInput({
    loginId : "",
    password: ""
  })
  const loginAction = (loginId, password) => {
    dispatch(login({
      loginId,
      password
    }))
  }

  return (
    <div className="login">
      <div className="login__wrap">
        <h2><FontAwesomeIcon icon={faPaw} /></h2>
        <form className="login-form">
          <input name="loginId" type="text" value={text.loginId} onChange={setText} placeholder="ID"/>
          <input name="password" type="password" value={text.password} onChange={setText} placeholder="PASSWORD"/>
          <Button
            onClick={() => text.loginId === '' ? alert('아이디를 입력하세요') :
              text.password === '' ? alert('비밀번호를 입력하세요') :
              loginAction(text.loginId,text.password)}
          >LOGIN</Button>
        </form>
      </div>
    </div>
  )
}

export default Login