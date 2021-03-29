import React, {useEffect} from 'react';
import styled from 'styled-components';
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import decode from 'jwt-decode';
import { logout } from '../../store/reducers/auth/action'
import { COLORS, HEADER_HEIGHT, HEADER_HEIGHT_SMALL } from '../../GlobalStyles';
import { FaMapMarkedAlt } from "react-icons/fa";
import Button from '../button/Button';
import Navbar from '../navbar/Navbar';
import IconButton from '../../components/button/IconButton';
import { onSmallTabletMediaQuery, onSmallPhoneMediaQuery, onPhoneMediaQuery } from '../../utils/responsives';


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
            <IconButtonWrapper>
            <IconButton title='Map' reverse={true} padding={'5px'} onclick={handleClickHome}>
                <FaMapMarkedAlt size={'30px'} />
            </IconButton>
            </IconButtonWrapper>
            </LeftWrapper>
            <RightWrapper>            
            { !authData ? <Button background={'white'} color={COLORS.primary} width={'80px'} onclick={handleClick}>Sign In</Button> :<> 
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

    ${onSmallTabletMediaQuery()} {
       height: ${HEADER_HEIGHT_SMALL};
       padding: 10px 10px 10px 20px;
    }

    ${onPhoneMediaQuery()} {
        padding: 10px 10px 10px 15px;
    }
`;

const Logo = styled.div`
    display: flex;
    align-items: center;   
`;

const Title = styled.h1`
    margin: 0 15px;
    font-weight: normal;
    font-size: 22px;

    ${onSmallTabletMediaQuery()} {
       font-size: 18px;
    }

    ${onPhoneMediaQuery()} {
       font-size: 16px;
    }
    
    ${onSmallPhoneMediaQuery()} {
       font-size: 14px;
    }

`;

const IconButtonWrapper = styled.div`
    display: block;

    ${ onSmallTabletMediaQuery()} {
        & svg {
            height: 25px;
            width: 25px;
        }
    }

    ${ onSmallTabletMediaQuery()} {
        & svg {
            height: 20px;
            width: 20px;
        }
    }
   
`;

const Image = styled.img`
    width: 60px;   
    background-color: ${COLORS.primary};
    border-radius: 50%;

    ${onSmallTabletMediaQuery()} {
       width: 50px;
    }

    ${onPhoneMediaQuery()} {
        width: 45px;
    }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  margin-right: 50px;

  ${onSmallTabletMediaQuery()} {
        margin-right: 15px;
    }

    ${ onSmallTabletMediaQuery()} {
        margin-right: 0;
    }
`;

const RightWrapper = styled.div`
    display: flex;
    align-items: center;
    height: ${HEADER_HEIGHT};
    position: relative; 

  
    ${onSmallTabletMediaQuery()} {        
        font-size: 13px;
        height: ${HEADER_HEIGHT_SMALL};
    } 

    ${onPhoneMediaQuery()} {   
        & p {
            display: none;           
        }
    } 
   
   
`;

const LeftWrapper = styled.div`
    display: flex;
    align-items: center;
    height: ${HEADER_HEIGHT};   

    ${onSmallTabletMediaQuery()} {       
        height: ${HEADER_HEIGHT_SMALL};
    }  
`;

export default Header;