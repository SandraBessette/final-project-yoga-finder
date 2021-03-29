import React from 'react';
import styled from 'styled-components';
import { COLORS, HEADER_HEIGHT, HEADER_HEIGHT_SMALL } from '../../GlobalStyles';
import { onSmallTabletMediaQuery } from '../../utils/responsives';


const Error = ({type})=>{
    return(
        <Wrapper>
            <ImageWrapper>        
        < Image src='/error3.svg' alt='errorImage'/>
        </ImageWrapper>
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
    overflow: hidden;

    ${onSmallTabletMediaQuery()} {   
        height: calc(100vh - ${HEADER_HEIGHT_SMALL});
    } 
    
`;

const ImageWrapper = styled.div`
    display: flex;
    align-items:center;
    justify-content:center;
    width: 60%;
    max-width: 600px;    
`;

const Image = styled.img`
    object-fit: cover;
    width: 100%;  
`;

const TextWrapper = styled.div` 
   text-align:center;
   color: ${COLORS.primary};
   font-size: 100px;

    & p { 
        margin: 0;
        padding: 0;
    }

    ${onSmallTabletMediaQuery()} {   
        & p:first-child { 
            font-size: 60px;
        }
   }
`;

const Text= styled.p`
    font-size: 20px;    
`;

export default Error;