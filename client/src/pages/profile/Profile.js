import React, {useState, useEffect } from 'react';
import styled from 'styled-components';
import { BsChatDots } from "react-icons/bs";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { COLORS, HEADER_HEIGHT, HEADER_HEIGHT_SMALL } from '../../GlobalStyles';
import Spinner from '../../components/spinner/Spinner';
import UserHeader from '../../components/userHeader/UserHeader';
import Comments from './components/Comments';
import Error from '../error/Error';
import IconButton from '../../components/button/IconButton';
import { onSmallTabletMediaQuery} from '../../utils/responsives';


const Profile = ()=>{
    const {authData} = useSelector((state)=>state.auth);   
    const [status, setStatus] = useState("loading"); 
    const [error, setError] = useState("");
    const [user, setUser] = useState(null);
    const { id } = useParams();  
    const history = useHistory();  

    const handleClickChat = (e) =>{
        e.preventDefault();
        history.push(`/user/chat/${id}`);
    };

      useEffect(() => {       
        setStatus("loading");
        fetch(`${process.env.REACT_APP_API_URL}/user/profile/${id}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authData?.token}`
            }               
        })
          .then((res) => res.json())
          .then((json) => {
            const { status, data} = json;     
            if (status === 200) {              
                setUser(data);
                setStatus("idle");
            } else {  
                setError(status.toString());      
                setStatus("error");
            }
          })
          .catch((e) => { 
            setError("500");       
            setStatus("error");
          });
      }, [id, authData.token]);

    if (status ==="error") return <Error type={error}/>; 
      
    return(
        <Wrapper>           
            <UserHeader title='Profile'/> 
            {status === 'loading' && <Spinner />}
            {status === 'idle' &&            
            <MainWrapper>             
                <Image src={user.image || '/user.svg'} alt="userPicture"></Image>            
                <TextBoxWrapper>
                    <Label htmlFor='username'>Username</Label>                     
                    <p>{user.userName}</p>          
                </TextBoxWrapper> 
               <TextBoxWrapper>
                    <Label htmlFor='email'>Email</Label>                     
                    <p>{user.email}</p>
                </TextBoxWrapper> 
                <div>
                <IconButton title='Chat' padding={'10px'} margin={'0 0 5px 0'} onclick={(e)=>handleClickChat(e)}>
                        <BsChatDots size={45}/>
                </IconButton> 
                </div>  
            </MainWrapper>}   
            <Comments/>        
        </Wrapper>
    );
};

const Wrapper = styled.div`
    height: calc(100vh - ${HEADER_HEIGHT}); 
    font-size: 15px;

    ${onSmallTabletMediaQuery()} {   
        height: calc(100vh - ${HEADER_HEIGHT_SMALL});
    } 
`;

const MainWrapper = styled.div`
    margin: 0 auto;
    max-width: 400px;
    padding: 20px;
    display: flex;
    flex-direction: column; 
`;


const Label = styled.label`  
    padding: 5px 10px 5px 0;
    color: ${COLORS.primary};
    display: block;
    min-width: 100px;
    float: left;
    text-align: start;
`;

const TextBoxWrapper = styled.div` 
    display: flex;
    align-items: center;
`;

const Image = styled.img`
    width: 180px;
    height: 180px;
    display: block;
    margin: 20px auto 35px auto;
    object-fit: cover;
    border-radius: 50%;

    ${onSmallTabletMediaQuery()} {
        width: 150px;
        height: 150px;
    }
`;


export default Profile;