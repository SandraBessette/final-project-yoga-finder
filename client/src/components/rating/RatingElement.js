import React from 'react';
import styled from 'styled-components';
import { BsStarFill, BsStarHalf } from 'react-icons/bs';


const Rating = ({index, rating, hoverRating, onMouseEnter, onMouseLeave, onclick, disabled, size})=>{
    const colorStar = React.useCallback(()=>{   
        if (index <= hoverRating) {
            return '#593796';
        }
        if (hoverRating === 0 && index <= Math.round(rating)){
            return '#593796';
        }
        return 'transparent';
    }, [hoverRating, index, rating]);

    const isHalfStart = React.useCallback(()=>{    
      
        if (hoverRating === 0 && Math.round(rating) === index && Math.floor(rating) < index){
            return true;
        }

        return  false;
    }, [hoverRating, index, rating]);

    return(
        <Wrapper
            disabled={disabled}
            onMouseEnter={(e)=>(onMouseEnter(e, index))}
            onMouseLeave={ onMouseLeave}
            onClick={(e)=>(onclick(e, index))}
            color={colorStar()}
        >
          {isHalfStart() ? <BsStarHalf  size={size}/>  : < BsStarFill stroke-width={0.6} stroke='#593796' size={size}/> }
        </Wrapper>
    );

};

const Wrapper = styled.button`
    margin: 0;
    padding: 0 3px;
    border: none;
    background: transparent;
    outline: none;
    cursor: pointer; 
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${(p)=>p.color};
    transition: all 0.25s ease-in-out; 

    &:hover:not(:disabled){      
        transform: scale(1.2);        
    }
   
     &:disabled {
        cursor: initial;         
    }  
`;


export default Rating;