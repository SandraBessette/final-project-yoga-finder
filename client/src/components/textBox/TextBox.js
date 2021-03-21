import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../GlobalStyles';

const TextBox = ({handleOnChanged, handleKeyDown, value, width, placeholder="", disabled=false, id=""})=>{

    return (
        <Input 
            type="text" 
            id={id}
            width={width}
            value= {value}         
            placeholder={placeholder}
            disabled={disabled}
            onChange={(ev)=>(handleOnChanged(ev))} 
            onKeyDown={(ev) =>(handleKeyDown ? handleKeyDown(ev): null)} 
       />  
    );
};

const Input = styled.input`  
    box-sizing: border-box;
    border: 1px solid ${COLORS.primary};
    border-radius: 5px;
    height: 30px;
    width: ${(p)=>p.width};  
    padding: 0 5px;
    transition: all 0.30s ease-in-out;  
   // margin: 15px;
    box-shadow: 0 0 5px lightgrey;    
    
    
    &:focus  {
        box-shadow: 0 0 5px ${COLORS.primary};
        border: 1px solid ${COLORS.primary};
        outline-width: 0px;
    }

    &:disabled {
        background-color: ${COLORS.lightGray};
    }
`;
export default TextBox;