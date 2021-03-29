import React, { useState } from 'react';
import styled from 'styled-components';
import RatingElement from './RatingElement';

const ratingArray = [1, 2, 3, 4, 5];

const Rating = ({value, onChange, disabled=false, size=20})=>{   
    const [hoverRating, setHoverRating] = useState(0);

    const handleOnMouseEnter = (e, index )=>{
        setHoverRating(index);
    };

    const handleOnMouseLeave = ()=>{
        setHoverRating(0);
    };

    const onClickStar = (e, index)=>{
        e.preventDefault();
        if (!disabled) 
            onChange(e, index);
    };
   

    return(
        <Wrapper>
            {ratingArray.map((elem)=>{
                return (
                    <RatingElement 
                    index={elem}
                    hoverRating={hoverRating}
                    rating={value}
                    onMouseEnter={handleOnMouseEnter}
                    onMouseLeave={handleOnMouseLeave}
                    onclick={onClickStar}   
                    disabled={disabled}  
                    size={size}               
                    />  
                )
            })}
    
        </Wrapper>
    )

};

const Wrapper = styled.div`
    display: flex;
`;

export default Rating;
