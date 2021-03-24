import React from 'react';
import styled from 'styled-components';
import { Link, useHistory } from "react-router-dom";
import { COLORS, HEADER_HEIGHT } from '../../GlobalStyles';
import {CgProfile} from "react-icons/cg"; 
import Button from '../button/Button';
import Navbar from '../navbar/Navbar';


const Header = ()=>{
    const history = useHistory(); 


    const handleClick = (e)=>{
        e.preventDefault();
        history.push("/user/auth");
    };


    return(
        <Wrapper>
             <StyledLink to={`/`}  >
                <Logo>                
                    <Image src='/yoga3.jpg' alt='logo'/>              
                    <Title>Yoga Finder</Title>
                </Logo>
            </StyledLink>
            <RightWrapper>
                <Button background={'white'} color={COLORS.primary} width={'90px'} onclick={handleClick}>Sign In</Button>  
                <Navbar />                     
            </RightWrapper>
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

const RightWrapper = styled.div`
    display: flex;
    align-items: center;
    height: ${HEADER_HEIGHT};
    position: relative;
   

`;

export default Header;