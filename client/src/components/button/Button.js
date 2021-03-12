import React from 'react';
import styled from 'styled-components';

const Button = ({background, color, height, width, onClick, children})=>{

    return (
        <Wrapper 
            backgroundColor={background}
            colorText={color}
            height={height}
            width={width}
            onClick={onClick}
        >
            {children}
        </Wrapper>

    );
};

const Wrapper = styled.button`
    background: ${(p)=>p.backgroundColor};
    border-radius: 4px;
    border-color: transparent;
    color: ${(p)=>p.colorText};
 
    cursor: pointer;
    display: block;
    font-size: 16px;
    height: ${(p)=>p.height};
    width: ${(p)=>p.width};

    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }

`;

export default Button;
