import React from 'react'
import styled from 'styled-components'

const RoundButton = styled.button`
    position: relative;
    margin: 20px 10px 0;
    padding: 10px 0;
    width: ${(props) => props.action ? '100px' : '200px'};
    font-size: 16px;
    border: none;
    border-radius: 20px;
    color: #fff;
    background-color: ${(props) => props.color || '#b2acf3'};
    cursor: ${(props) => props.cursor || 'pointer'};
    
    :hover::after {
      display: ${(props) => props.action ? 'block' : 'none'};
      position: absolute;
      bottom: -30px;
      left: 5px;
      z-index: 1;
      padding: 5px;
      width: 80px;
      background-color: #fff;
      color: #000;
      border-radius: 5px;
      -webkit-box-shadow: 1px 1px 3px 0 rgba(0,0,0,0.2);
      box-shadow: 1px 1px 3px 0 rgba(0,0,0,0.2);
      font-size: 12px;
      content: '${(props) => props.action || ''}';
    }
    
    &:disabled {
      cursor: default;
      opacity: 0.5;
    }
  `

const Button = ({children, color, cursor, onClick, action, disabled}) => {
  return (
    <RoundButton disabled={disabled} action={action} color={color} cursor={cursor} onClick={onClick}>{children}</RoundButton>
  )
}

export default Button