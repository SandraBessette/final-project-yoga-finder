import React from 'react';
import styled from 'styled-components';
import { COLORS, HEADER_HEIGHT, HEADER_HEIGHT_SMALL } from '../../GlobalStyles';
import { onSmallTabletMediaQuery } from '../../utils/responsives';


const Error = ({type})=>{
    return(
        <Wrapper>        
        < Image src='/error3.svg' alt='errorImage'/>
        <TextWrapper>
            <p>{type}</p>
            <Text>Oups... something went wrong.</Text>
        </TextWrapper>
        </Wrapper>
    )

};


const Wrapper = styled.div`
    position: relative;
    height: calc(100vh - ${HEADER_HEIGHT}); 
    width: 100%;  
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; 

    ${onSmallTabletMediaQuery()} {   
        height: ${HEADER_HEIGHT_SMALL};
    } 
    
`;

const Image = styled.img`
    object-fit: cover;
    height: 70%;    
`;

const TextWrapper = styled.div` 
   text-align:center;
   color: ${COLORS.primary};
   font-size: 100px;

    & p { 
        margin: 0;
        padding: 0;
    }
`;

const Text= styled.p`
    font-size: 20px;
`;

export default Error;