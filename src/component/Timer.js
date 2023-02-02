import React from 'react'
import styled from 'styled-components'

const TimerStyled = styled.div`
    display: ${(props) => props.work ? 'block' : 'none'};
    position: absolute;
    top: ${(props) => props.top}px;
    left: 50%;
    padding: 3px 10px;
    border-radius: 30%;
    background-color: #5b608c;
    transform: translateX(-50%);
  `

const Timer = ({top, work, children}) => {
  return (
    <TimerStyled work={work} top={top}>{children}</TimerStyled>
  )
}

export default Timer