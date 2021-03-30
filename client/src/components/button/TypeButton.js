import React from 'react';
import styled from 'styled-components';
import { colors } from '../../api/helper';
import { GiMeditation } from 'react-icons/gi'
import { onSmallTabletMediaQuery, onPhoneMediaQuery } from '../../utils/responsives';

const TypeButton = ({className=null, reverse=false, type='Primary', padding, margin, onclick, disabled=false, title="", children})=>{
       
    return (
        <Wrapper  
            className={className} 
            title={title}                     
            padding={padding}
            margin={margin}   
            type={type}   
            reverse={reverse}  
            onClick={onclick}
            disabled={disabled}       
        >
            <div>
           {type === 'Meditation' &&<GiMeditation />  ||
            type === 'Yoga' && <img src='/yoga-pose.svg' /> ||
            type === 'Accessory' && <img src='/yoga-mat.svg' />}
            </div>
           <p>{type}</p>
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
    color: ${(p)=>(p.reverse ? colors[p.type].colorLight : colors[p.type].color)};  
    background: ${(p)=>(p.reverse ? colors[p.type].color : 'white')};  
    transition: all 0.40s ease-in-out;
    width: auto;

    & p {
        margin: 0 0 0 5px;
        padding: 0;
    }

    & svg{
       
        width: 20px;
        height: 20px;
    }

    & img{
        width: 20px;
        height: 20px;
    }

    & div {
        border-radius: 50%;
        background-color: white;
        padding: 5px;       
    }
    

     &:hover:not(:disabled) {       
        opacity: 0.7;    
    }  

   &.selected {  
       // color: ${(p)=>(colors[p.type].colorDark)};  
       // background: ${(p)=>colors[p.type].colorLight};  
       p { 
        //color: ${(p)=>(colors[p.type].colorDark)}; 
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
       // color: white;  
       // background: ${(p)=>colors[p.type].color};
       // border:${(p)=>( `1px solid white`)};
    }   

    ${onSmallTabletMediaQuery()} {
        & svg{
       
       width: 20px;
       height: 20px;
        }

    & img{
        width: 20px;
        height: 20px;
        }      
    }
`;

export default TypeButton;