import React, {useEffect} from 'react';
import styled from 'styled-components';
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import decode from 'jwt-decode';
import { logout } from '../../store/reducers/auth/action'
import { COLORS, HEADER_HEIGHT } from '../../GlobalStyles';
import { FaMapMarkedAlt } from "react-icons/fa";
import Button from '../button/Button';
import Navbar from '../navbar/Navbar';
import IconButton from '../../components/button/IconButton';


const Header = ()=>{
    const {authData} = useSelector((state)=>state.auth);  
    const history = useHistory(); 
    const dispatch = useDispatch();

    useEffect(() => {
        const token = authData?.token;
        let timer = null;
        if (token) {  
            const decodedToken = decode(token);
            const timeNow = new Date().getTime();           
       
            if (decodedToken.exp * 1000 < timeNow){            
                history.push('/');
                dispatch(logout());             
            }  
            else {
                const timeBeforeExp = decodedToken.exp * 1000 - timeNow;
                console.log('timeBeforeExp', timeBeforeExp);
                timer = setTimeout(function(){                    
                    history.push('/');
                    dispatch(logout());
                }, timeBeforeExp);
            }
        }
        return () =>{
            if(timer){
                console.log("clearTimeout");
                clearTimeout(timer);
            }  
        }
    
      }, [authData?.token, dispatch, history]);

    const handleClick = (e)=>{
        e.preventDefault();
        history.push("/user/auth");
    };

    const handleClickHome = (e)=>{
        e.preventDefault();
        history.push("/");
    };

    return(
        <Wrapper>
            <LeftWrapper>
             <StyledLink to={`/`}  >
                <Logo>                
                    <Image src='/yoga3.jpg' alt='logo'/>              
                    <Title>Yoga Finder</Title>
                </Logo>
            </StyledLink>
            <IconButton title='Map' reverse={true} padding={'5px'} onclick={handleClickHome}>
                <FaMapMarkedAlt size={30}/>
            </IconButton>
            </LeftWrapper>
            <RightWrapper>            
            { !authData ? <Button background={'white'} color={COLORS.primary} width={'90px'} onclick={handleClick}>Sign In</Button> :<> 
                <p>{authData.data.userName}</p><Navbar /></>}                     
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
  margin-right: 50px;
`;

const RightWrapper = styled.div`
    display: flex;
    align-items: center;
    height: ${HEADER_HEIGHT};
    position: relative;  
`;

const LeftWrapper = styled.div`
    display: flex;
    align-items: center;
    height: ${HEADER_HEIGHT};
    
`;

export default Header;