import React from 'react';
import { useHistory  } from "react-router-dom";
import styled from 'styled-components';
import { BiArrowBack } from "react-icons/bi"; 
import IconButton from '../../components/button/IconButton';
import { onSmallTabletMediaQuery } from '../../utils/responsives';


const UserHeader = ({title})=>{
    const history = useHistory();

    const handleClick = (e) => { 
        e.preventDefault(); 
        history.goBack();     
      };    

    return (               
            <TopWrapper >
                <IconButton reverse={true} padding={'5px'} margin='0 40px 0 20px' onclick={handleClick}>
                    <BiArrowBack size={35}/>
                </IconButton>
                <TopContentWrapper >
                    <Title>{title}</Title>                                
                </TopContentWrapper>
            </TopWrapper>            
    );
};

const TopWrapper = styled.div`
    min-height: 100px;
    padding: 10px 0;
    background-image: linear-gradient(to right, #845EC2 , #D65DB1, #FF6F91, #FF9671, #FFC75F, #F9F871);
    display: flex;
    color: white;
    align-items: center;  

    ${onSmallTabletMediaQuery()} {
        min-height: 85px;

        & svg {
            height: 27px;
            width: 27px;
        }
    }
`;

const TopContentWrapper = styled.div` 
    margin: 0 auto;
    width: 770px;
`;

const Title = styled.h1`
    font-weight: 600;

    ${onSmallTabletMediaQuery()} {
       font-size: 24px;
    }
`;

export default UserHeader;