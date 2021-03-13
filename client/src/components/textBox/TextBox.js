import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../GlobalStyles';

const TextBox = ({width})=>{

    return (
        <Input type="text" width={width}/>  
    );
};

const Input = styled.input`  
    border: 1px solid ${COLORS.primary};
    border-radius: 5px;
    height: 30px;
    width: ${(p)=>p.width};  
    padding: 0 5px;
    transition: all 0.30s ease-in-out;  
    margin: 15px;
    box-shadow: 0 0 5px lightgrey;    
 
    &:focus  {
        box-shadow: 0 0 5px ${COLORS.primary};
        border: 1px solid ${COLORS.primary};
        outline-width: 0px;
    }
`;
export default TextBox;