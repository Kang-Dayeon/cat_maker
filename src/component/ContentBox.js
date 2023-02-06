import React from 'react'
import styled from 'styled-components'
const BoxStyled = styled.div`
    position: relative;
    display: flex;
    flex-direction: ${(props) => props.size === 'small' ? 'column' : 'row'};
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: ${(props) => props.size === 'small' ? '15px' : '0'};
    padding: ${(props) => props.size === 'small' ? '30px 0' : '50px 30px'};
    min-width: 300px;
    width: ${(props) => (props.size === 'big')? '70%' : (props.size === 'medium')? '500px' : '300px'};
    border-radius: ${(props) => props.size === 'small' ? '10px' : '20px'};
    background: ${(props) => props.color === 'purple' ? '#e4e9fa' : '#fff'};
    -webkit-box-shadow: 3px 3px 5px 0 rgba(0,0,0,0.1);
    box-shadow: 3px 3px 5px 0 rgba(0,0,0,0.1);
    
    @media (max-width: 500px){
      padding: ${(props) => props.size === 'big' ? '30px 15px' : ''};
      width: ${(props) => props.size === 'big' ? '80%' : ''};
    }
  `

const ContentBox = ({children, size, color}) => {
  return (
    <BoxStyled size={size} color={color}>{children}</BoxStyled>
  )
}

export default ContentBox