import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../../GlobalStyles';

const TextArea = ({handleOnChanged, height, width, value, placeholder="", disabled=false, id=""})=>{

    return (
        <TextAreaStyled                  
            id={id}
            value={value}
            width={width}
            height={height}                 
            placeholder={placeholder}
            disabled={disabled}
            onChange={(ev)=>(handleOnChanged(ev))} 
        
       />        
    );
};

const TextAreaStyled  = styled.textarea`  
    box-sizing: border-box;
    border: 1px solid ${COLORS.primary};
    border-radius: 10px;    
    height: ${(p)=>p.height};
    width: ${(p)=>p.width};  
    margin: 5px 0;
    padding: 10px;
    transition: all 0.30s ease-in-out;    
    box-shadow: 0 0 5px lightgrey; 
    line-height: 1.4; 
    font-size: 14px;
    
    &:focus  {
        box-shadow: 0 0 5px ${COLORS.primary};
        border: 1px solid ${COLORS.primary};
        outline-width: 0px;
    }

    &:disabled {
        background-color: ${COLORS.lightGray};
    }
`;

export default TextArea;