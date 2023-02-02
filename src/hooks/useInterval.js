import {useEffect, useRef} from 'react'

function useInterval(callback, delay){

  const saveCallback = useRef()

  useEffect(() => {
    saveCallback.current = callback
  }, [callback])

  useEffect(() => {
    const interval = () => {
      saveCallback.current()
    }
    if(delay !== null){
      let id = setInterval(interval, delay)
      return () => clearInterval(id)
    }
  }, [delay])

}

export default useInterval