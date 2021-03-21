import React from 'react';
import styled from 'styled-components';
import { COLORS} from '../../GlobalStyles';


const Dropdown = ({handleSortSelect, id, label, valueArray})=>{

    return (
            <Wrapper>
          <Label htmlFor={id}>{label}</Label>
          <Select defaultValue={valueArray[0]} id={id} onChange={(ev)=>handleSortSelect(ev)}>  
           
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
    width: 80px;
    float: left;
    margin-right: 15px;
    text-align: start;

`;

const Select = styled.select`
 
  height: 35px;
  width: 150px;
  border-radius: 5px;
`;

export default Dropdown;