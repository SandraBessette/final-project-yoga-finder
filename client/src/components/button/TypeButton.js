import React from 'react';
import styled from 'styled-components';
import { colors } from '../../api/helper';
import { GiMeditation } from 'react-icons/gi';
import {BiFilter} from 'react-icons/bi';
import { onSmallTabletMediaQuery } from '../../utils/responsives';

const TypeButton = ({className=null, type='Primary', margin, onclick, disabled=false})=>{
   
    return (
        <Wrapper  
            className={className}    
            margin={margin}   
            type={type}              
            onClick={onclick}
            disabled={disabled}       
        >
            <div>
                {(type === 'Meditation' && <GiMeditation />) ||
                (type === 'Yoga' && <img src='/yoga-pose.svg' alt="yoga" />) ||
                (type === 'Accessory' && <img src='/yoga-mat.svg' alt="accessory" />) ||
                (type === 'Primary' && <BiFilter size={15} />)}
            </div>
           <p>{type === 'Primary' ? 'more filter' : type}</p>     
        </Wrapper>

    );
};

const Wrapper = styled.button`
    position: relative;
    display: flex;
    align-items: center; 
    justify-content: center;
    
    border:${(p)=>( `1px solid ${colors[p.type].color}`)};
    border-radius: 20px;
    margin: ${(p)=>p.margin || '0'};   
    padding: 0px 10px 0px 0px; 
    cursor: pointer;   
    color: ${(p)=>(colors[p.type].color)};  
    background: white;  
    transition: all 0.40s ease-in-out;
    width: auto;

    & p {
        margin: 0 0 0 5px;
        padding: 0;
    }

    & svg{
       
        width: 18px;
        height: 18px;
    }

    & img{
        width: 18px;
        height: 18px;
    }

    & div {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background-color: white;
        margin: 2px;
        padding: 2px;    
        border:${(p)=>( `1px solid ${colors[p.type].color}`)};   
    }
    

     &:hover:not(:disabled) {       
        opacity: 0.7;    
    }  

   &.selected {          
       p {       
            color: white
       }      
       background-color: ${(p)=>colors[p.type].color};      
    }  
    
    &:focus {
        outline: none;
    }

    &:disabled {
        pointer-events: none;
        cursor: default;      
    }  

    ${onSmallTabletMediaQuery()} {
        & svg {
            width: 15px;
            height: 15px;
        }

        & img{
            width: 15px;
            height: 15px;
        }
    }
`;

export default TypeButton;