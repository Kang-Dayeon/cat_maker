import React from 'react'
import Button from '../../component/Button'
import '../../App.css'
import useInput from '../../hooks/useInput'
//component
import ContentBox from '../../component/ContentBox'
//redux
import {useDispatch} from 'react-redux'
import {login} from '../../redux/login'
// fontawesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPaw} from '@fortawesome/free-solid-svg-icons'

const Login = () => {
  // ** redux
  const dispatch = useDispatch()

  // ** hook
  const [text, setText] = useInput({
    loginId: '',
    password: '',
  })

  const loginAction = () => {
    dispatch(
      login({
        loginId: text.loginId,
        password: text.password
      })
    )
  }

  return (
    <ContentBox size={'medium'} color={'purple'}>
      <div className="login__wrap">
        <h2><FontAwesomeIcon icon={faPaw}/></h2>
        <form className="login-form">
          <input name="loginId" type="text" value={text.loginId}
                 onChange={setText} placeholder="ID"/>
          <input name="password" type="password" value={text.password}
                 onChange={setText} placeholder="PASSWORD"/>
          <Button
            onClick={() => (text.loginId === '') ? alert('아이디를 입력하세요') :
              (text.password === '') ? alert('비밀번호를 입력하세요') : loginAction
            }
          >LOGIN</Button>
        </form>
      </div>
    </ContentBox>
  )
}

export default Login