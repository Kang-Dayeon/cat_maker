import {useEffect, useState} from 'react'

export default (initalValue) => {
  // 버튼 비활성화시 랜덤한 숫자와
  const [action, setAction] = useState(initalValue)
  const [disabled, setDisabled] = useState(false)
  const [time, setTime] = useState(0)

  useEffect(() => {
    const timeout = () => {
      setTimeout(() => {
        setDisabled(false)
      }, time)
    }
    return clearTimeout(timeout)
  }, [disabled])


  return [data, handle]
}