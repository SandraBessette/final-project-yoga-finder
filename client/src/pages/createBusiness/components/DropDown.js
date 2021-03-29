import React from 'react';
import styled from 'styled-components';
import { COLORS} from '../../../GlobalStyles';
import { onSmallTabletMediaQuery, onPhoneMediaQuery } from '../../../utils/responsives';


const Dropdown = ({handleSelect, id, label, valueArray, defaultValue, width, labelWidth='80px', disabled = false})=>{
 
    return (
            <Wrapper>
          <Label htmlFor={id} labelWidth={labelWidth}>{label}</Label>
          <Select defaultValue={defaultValue} id={id} width={width} onChange={(ev)=>handleSelect(ev)} disabled={disabled}>  
           
            {valueArray.map((value)=>(
                 <option key={value} value={value}>{value}</option>
            ))}   
            </Select>
            </Wrapper>
        
    );
};


const Wrapper = styled.div`
    margin: 10px 0;
    display: flex;
    align-items: center;
`;

const Label = styled.label`
    padding-right: 10px;
    color: ${COLORS.primary};
    display: block;
    width: ${(p)=>p.labelWidth}; 
    float: left;
    margin-right: 15px;
    text-align: start;

    ${onSmallTabletMediaQuery()} {
        margin-right: 0; 
        font-size: 14px;
    }

    ${onPhoneMediaQuery()}{
      font-size: 13px;
    }

`;

const Select = styled.select` 
  height: 30px;
  width: ${(p)=>p.width}; 
  border-radius: 5px;
  font-size: 13px;
  box-shadow: 0 0 5px lightgrey;  
  border: 1px solid ${COLORS.primary};

`;

export default Dropdown;