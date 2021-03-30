import React from 'react';
import styled from 'styled-components';
import { onSmallTabletMediaQuery } from '../../../utils/responsives';

const CheckBox = ({ index, value, handleChange, isChecked, children })=>{
   
    return (
        <Wrapper > 
            <Label >           
                <Input type="checkbox" name={value} onChange={(ev)=>handleChange(ev, value, index)} value={value} checked={isChecked} />
            {children}
            </Label>         
        </Wrapper>  
    );
};

const Wrapper = styled.div`  
  margin: 0px 0 0 25px; 
  padding: 5px 10px ;
  display: flex;
  align-items:center; 
  color: black;
  font-size: 15px;
  font-weight: normal;   

  &:hover {     
   color: gray;  
  }
`;
const Label = styled.label`
    display: flex;
    align-items: center;

    ${onSmallTabletMediaQuery()} {        
        font-size: 14px;
    }
`;

const Input = styled.input`
    margin-right: 15px;
    width: 15px;
    height: 15px;  

`;

export default CheckBox;