import React from 'react'
import styled from 'styled-components'
const BadgeStyled = styled.div`
    position: ${(props) => props.position || 'static'};
    right: ${(props) => props.right || '0'};
    top: ${(props) => props.top || '0'};
    margin-left: 7px;
    padding: 3px 7px;
    background: ${(props) => props.color || '#b2acf3'};
    color: #fff;
    font-size: 10px;
    font-weight: normal;
    border-radius: 40px;
  `

const Badge = ({children, color, position, right, top}) => {
  return (
    <BadgeStyled color={color} position={position} right={right} top={top}>{children}</BadgeStyled>
  )
}

export default Badge