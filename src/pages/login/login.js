import React from 'react'
import Button from '../../component/Button'
import '../../App.css'
import useInput from '../../hooks/useInput'
//component
import ContentBox from '../../component/ContentBox'
//recoil
import {useRecoilValue, useSetRecoilState} from 'recoil'
import {userListState, loginUserState, isLoginState} from '../../recoil/userAtoms'
// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaw } from '@fortawesome/free-solid-svg-icons'

const Login = () => {
  //----------------------- atoms ---------------------------//
  const userList = useRecoilValue(userListState)
  const setLoginUser = useSetRecoilState(loginUserState)
  const setIsLogin = useSetRecoilState(isLoginState)

  // ----------------------------- custom hooks ---------------------------//
  const [text, setText] = useInput({
    loginId : "",
    password: ""
  })

  // ----------------------------- function ---------------------------//
  const loginAction = (loginId, password) => {
    if(!userList.some((item) => item.loginId === loginId)){
      alert("아이디가 일치하지 않습니다")
    } else if(!userList.some((item) => item.password === password)){
      alert('비밀번호가 일치하지 않습니다.')
    } else {
      setLoginUser(userList.filter(user => user.loginId === loginId && user.password === password))
      setIsLogin(true)
    }
  }

  return (
    <ContentBox size={'medium'} color={'purple'}>
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
    </ContentBox>
  )
}

export default Login