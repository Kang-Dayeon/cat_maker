import React from 'react'
import styled from 'styled-components'

const TimerStyled = styled.div`
  display: ${(props) => (props.work)? 'block' : 'none'};
  position: absolute;
  top: ${(props) => props.top}px;
  left: 50%;
  z-index: 20;
  padding: ${(props) => (props.type === 'lg')? '20px 25px' : '3px 10px'};
  border-radius: ${(props) => (props.type === 'lg')? '50%' : '30%'};
  background-color: #5b608c;
  transform: translateX(-50%);
`
const TimerText = styled.span`
  position: relative;
  display: inline-block;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  ::after{
    position: absolute;
    bottom: ${(props) => (props.type === 'lg')? '-35px' : '-16px'};
    left: 50%;
    z-index: 10;
    width: 0;
    height: 0;
    border-top: 8px solid #5b608c;
    border-right: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-left: 8px solid transparent;
    transform: translateX(-50%);
    content: '';
  }
`

const Timer = ({type, top, work, children}) => {
  return (
    <TimerStyled work={work} top={top} type={type}>
      <TimerText type={type}>
        {children}
      </TimerText>
    </TimerStyled>
  )
}

export default Timer