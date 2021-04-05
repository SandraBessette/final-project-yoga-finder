import React, {useEffect, useCallback} from 'react';
import styled from 'styled-components';
import { Link, useHistory } from "react-router-dom";
import io from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import decode from 'jwt-decode';
import { logout } from '../../store/reducers/auth/action'
import { COLORS, HEADER_HEIGHT, HEADER_HEIGHT_SMALL } from '../../GlobalStyles';
import { FaMapMarkedAlt } from "react-icons/fa";
import { GrMail } from "react-icons/gr";
import Button from '../button/Button';
import Navbar from '../navbar/Navbar';
import IconButton from '../../components/button/IconButton';
import { onSmallTabletMediaQuery, onSmallPhoneMediaQuery, onPhoneMediaQuery } from '../../utils/responsives';
import { receiveCountInfo, resetChat, updateMessage, increaseCountInfo } from '../../store/reducers/chat/actions';

const ENDPOINT = 'http://localhost:3000';
let socket = io(ENDPOINT);

const Header = ()=>{
    const {authData} = useSelector((state)=>state.auth);  
    const {count} = useSelector((state)=>state.chat);
    const history = useHistory(); 
    const dispatch = useDispatch();

    const totalUnreadMessage = useCallback(()=>{
       const total = Object.values(count).reduce((total, num)=>(total + num), 0);
       console.log('total', total);
       return total;
    }, [count])

    useEffect(()=>{
        socket.on("new_msg", function(data) {           
            dispatch(updateMessage(data.data.message, data.data.chat)); 
            dispatch(increaseCountInfo(data.data.chat._id)); 
       
        });
    }, [dispatch]) 

  
    useEffect(() => {
        const token = authData?.token;
        let timer = null;
        if (token) { 
            //socket= io(ENDPOINT); 
            const decodedToken = decode(token);
            const timeNow = new Date().getTime();           
       
            if (decodedToken.exp * 1000 < timeNow){   
                socket.emit('logout', {_id: authData.data._id});            
                dispatch(resetChat());          
                history.push('/');            
                dispatch(logout());  
              
                          
            }  
            else {
                socket.emit('join', {_id: authData.data._id});
                const timeBeforeExp = decodedToken.exp * 1000 - timeNow;
                console.log('timeBeforeExp', timeBeforeExp);
                timer = setTimeout(function(){  
                    socket.emit('logout', {_id: authData.data._id});  
                    dispatch(resetChat());                             
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
    
      }, [authData?.token, authData?.data._id, dispatch, history]);

    useEffect(() => {
        if (authData){
            console.log("request the count total...")
            fetch('/chat/messages/unread', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authData?.token}`
                }               
            })
            .then((res) => res.json())
            .then((json) => {
                const { status, data, message} = json;            
                if (status === 200) {
                    //console.log("chatcount", data);
                    dispatch(receiveCountInfo(data));
                }
                else {  
                    console.log(message);                                                                   
                }
            })
            .catch((error)=>{
                console.log("unknown error");                            
            });    
        } 
    }, [authData, dispatch]);

    const handleClick = (e)=>{
        e.preventDefault();
        history.push("/user/auth");
    };

    const handleClickHome = (e)=>{
        e.preventDefault();
        history.push("/");
    };

    const handleClickChat = (e)=>{
        e.preventDefault();
        history.push("/user/chat");
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
                <MailIconWrapper>
                <IconButton title='Map' reverse={true} padding={'5px'} onclick={handleClickChat}>
                    <GrMail size={20}/>  
                </IconButton>
                {totalUnreadMessage() !== 0 &&
                <SpanIcon >{totalUnreadMessage()}</SpanIcon>}
                </MailIconWrapper>
                <p>{authData.data.userName}</p><Navbar socket={socket}/></>}                     
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

const MailIconWrapper = styled.div`
    position: relative;
    margin: 0 10px;

    ${onPhoneMediaQuery()} {
        margin: 0;

    }
`;

const SpanIcon = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
   
    top: 0;
    right: 0;
    border-radius: 50%; 
    background: red;
    color: white;
    font-size: 9px;
    font-weight: bold;
    width: 15px;
    height: 15px;
     
    & p {
        padding: 0;
        margin: 0;
    }
`;

export default Header;