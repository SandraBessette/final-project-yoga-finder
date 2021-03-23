import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../GlobalStyles';

const Button = ({background, color, width, radius, onclick, disabled=false, children})=>{

    return (
        <Wrapper 
            backgroundColor={background}
            colorText={color}           
            width={width}
            radius={radius}
            onClick={onclick}
            disabled={disabled}            
        >
            {children}
        </Wrapper>

    );
};

const Wrapper = styled.button`
    background: ${(p)=>p.backgroundColor || COLORS.primary};
    border-radius: ${(p)=>p.radius || '4px'};
    border-color: transparent;
    color: ${(p)=>p.colorText || "white"};
 
    cursor: pointer;
    display: block;
    font-size: 16px;
    height: 35px;
    width: ${(p)=>p.width || '100%'};
    font-weight: 400;
    transition: all 0.30s ease-in-out;  

    &:hover:not(:disabled) {       
        background-color: ${(p)=>p.colorText || "white"};
        color: ${(p)=>p.backgroundColor || COLORS.primary};
        border: 1px solid ${(p)=>p.backgroundColor || COLORS.primary};
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }

`;

export default Button;
