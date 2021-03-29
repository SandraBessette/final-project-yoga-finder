import React, {useState, useEffect, useCallback} from 'react';
import styled from 'styled-components';
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { COLORS, HEADER_HEIGHT } from '../../GlobalStyles';
import Spinner from '../../components/spinner/Spinner';
import UserHeader from '../../components/userHeader/UserHeader';
import Comments from './components/Comments';
import Error from '../error/Error';


const Profile = ({title})=>{
    const {authData} = useSelector((state)=>state.auth);   
    const [status, setStatus] = useState("loading"); 
    const [error, setError] = useState("");
    const [user, setUser] = useState(null);
   // const dispatch = useDispatch(); 
   // const history = useHistory(); 
    const { id } = useParams();  

  

      useEffect(() => {       
        setStatus("loading");
        fetch(`/user/profile/${id}`, {
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
            </MainWrapper>}   
            <Comments/>        
        </Wrapper>
    )


};

const Wrapper = styled.div`
   height: calc(100vh - ${HEADER_HEIGHT}); 
   font-size: 15px;

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
`;


export default Profile;