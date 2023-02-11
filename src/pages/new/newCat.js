import React from 'react'
import {useNavigate} from 'react-router-dom'
import Button from '../../component/Button'
import ContentBox from '../../component/ContentBox'

const NewCat = () => {
  const navigate = useNavigate()

  const onClick = () => {
    navigate('/create_form')
  }

  return (
    <ContentBox size={'small'}>
      <Button margin={'none'} action={'create cat'} onClick={onClick}>+</Button>
    </ContentBox>
  )
}

export default NewCat