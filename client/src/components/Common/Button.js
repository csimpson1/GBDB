import React from 'react';
import styled from 'styled-components';

export const Button = ({onClick, children}) => {
    return <ButtonWrapper onClick={onClick}>{children}</ButtonWrapper>
};

const ButtonWrapper = styled.button`
    border: none;
    text-decoration: none;
    background-color: rgb(156, 17, 126);
    border-radius: 50%;
    color: white;
    height: 30px;
    width: 30px;
`;

export const SelectButton = ({onClick, height, width, children}) => {
    return <SelectButtonWrapper onClick={onClick} height={height} width={width}>{children}</SelectButtonWrapper>
}

const SelectButtonWrapper = styled.button`
    border: none;
    text-decoration: none
    background-color: darkgrey;
    border-radius: 10px;
    ${props => props.height?`height: ${props.height}px;`:''}
    ${props => props.width?`width: ${props.width}px;`:''}
`;

