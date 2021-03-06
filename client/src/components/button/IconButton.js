import React from 'react';
import styled from 'styled-components';
import { colors } from '../../api/helper';

const IconButton = ({reverse=false, type='Primary', padding, margin, onclick, disabled=false, title="", children})=>{
       
    return (
        <Wrapper   
            title={title}                     
            padding={padding}
            margin={margin}   
            type={type}   
            reverse={reverse}  
            onClick={onclick}
            disabled={disabled}       
        >
            {children}
        </Wrapper>

    );
};

const Wrapper = styled.button`
    position: relative;
    display: flex;
    align-items: center; 
    justify-content: center;
    width: auto;
    border: none;
    border-radius: 50%;
    margin: ${(p)=>p.margin || '0'};  
    padding: ${(p)=>p.padding || '0'};  
    cursor: pointer;   
    color: ${(p)=>(p.reverse ? colors[p.type].colorLight : colors[p.type].color)};  
    background: ${(p)=>(p.reverse ? colors[p.type].color : 'white')};  
    transition: all 0.40s ease-in-out;

     &:hover:not(:disabled) {  
        color: ${(p)=>(colors[p.type].colorDark)};  
        background: ${(p)=>colors[p.type].colorLight};       
    }  
    
    &:focus {
        outline: none;
    }

    &:disabled {
        pointer-events: none;
        cursor: default;
    }   
`;

export default IconButton;