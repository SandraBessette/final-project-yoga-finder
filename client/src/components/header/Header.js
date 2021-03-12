import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../GlobalStyles';
import Button from '../button/Button';


const Header = ()=>{
    return(
        <Wrapper>
            <Logo>                
                <Image src='yoga3.jpg' alt='logo'/>              
                <Title>Yoga Finder</Title>
            </Logo>
            <Button background={'white'} color={COLORS.primary} height={'35px'} width={'90px'} >Sign In</Button>    
        </Wrapper>
    )

};


const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${COLORS.primary};
    color: white;
    padding: 10px 20px;
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
export default Header;