import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { COLORS, HEADER_HEIGHT } from '../../GlobalStyles';
import Button from '../button/Button';


const Header = ()=>{
    return(
        <Wrapper>
             <StyledLink to={`/`}  >
                <Logo>                
                    <Image src='/yoga3.jpg' alt='logo'/>              
                    <Title>Yoga Finder</Title>
                </Logo>
            </StyledLink>
            <Button background={'white'} color={COLORS.primary} width={'90px'} >Sign In</Button>    
        </Wrapper>
    );
};


const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${COLORS.primary};
    color: white;
    padding: 10px 20px;
    height: ${HEADER_HEIGHT};
`;

const Logo = styled.div`
    display: flex;
    align-items: center;
`;

const Title = styled.h1`
    margin: 0 15px;
    font-weight: normal;
`;

const Image = styled.img`
    width: 60px;   
    background-color: ${COLORS.primary};
    border-radius: 50%;

`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export default Header;