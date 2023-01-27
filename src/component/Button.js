import React from 'react'
import styled from 'styled-components'
const RoundButton = styled.button`
    margin-top: 30px;
    padding: 10px 0;
    width: 200px;
    font-size: 16px;
    border: none;
    border-radius: 20px;
    color: #fff;
    background-color: ${(props) => props.color || '#b2acf3'};
    cursor: ${(props) => props.cursor || 'pointer'};
  `

const Button = ({children, color, cursor, onClick}) => {
  return (
    <RoundButton color={color} cursor={cursor} onClick={onClick}>{children}</RoundButton>
  )
}

export default Button