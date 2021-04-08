import React, {useState, useEffect, useCallback} from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from "react-redux";
import { MdDeleteForever } from 'react-icons/md'
import { HEADER_HEIGHT, HEADER_HEIGHT_SMALL } from '../../GlobalStyles';
import UserHeader from '../../components/userHeader/UserHeader';
import BusinessItem from '../../components/businessItem/BusinessItem';
import Spinner from '../../components/spinner/Spinner';
import IconButton from '../../components/button/IconButton';
import { updateFavorites } from '../../store/reducers/auth/action';
import Error from '../error/Error';
import { onSmallTabletMediaQuery } from '../../utils/responsives';


const Favorites = ()=>{
    const { authData } = useSelector((state)=>state.auth); 
    const [status, setStatus] = useState("loading");
    const [error, setError] = useState("");
    const [favorites, setFavorites] = useState(null);  
    const dispatch = useDispatch(); 

    const updateItem = useCallback((id)=>{       
        let newFavorites = favorites.filter((item)=>{
            return item._id !== id;
        })
        setFavorites(newFavorites);
    },[favorites]);

    const handleDeleteClick = useCallback((e, id)=>{   
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}/user/favorite/${id}`, {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authData?.token}`
            }               
        })
        .then((res) => res.json())
        .then((json) => {
            const { status, data, message } = json;            
            if (status === 200) { 
                updateItem(id);  
                dispatch(updateFavorites(data));                
                setStatus("idle");                  
            }
            else {
                setError(status.toString());
                setStatus("error"); 
                console.log(message);                                    
            }
        })
        .catch((error)=>{    
            setError("500");           
            setStatus("error");               
        });     
    }, [authData?.token, dispatch, updateItem]);

  
    useEffect(() => {       
    
            setStatus("loading");   
            fetch(`${process.env.REACT_APP_API_URL}/user/favorites`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authData?.token}`
                }               
            })
            .then((res) => res.json())
            .then((json) => {
                const { status, data } = json;            
                if (status === 200) {               
                    setFavorites(data);                   
                    setStatus("idle");                  
                }
                else {
                    setError(status.toString());
                    setStatus("error");                                                      
                }
            })
            .catch((error)=>{  
                setError("500");             
                setStatus("error");               
            });     
        
      }, [authData?.token]);

    if(status === 'error'){
        return <Error type={error}/>;
    }

  return(
        <Wrapper>           
            <UserHeader title="Favorites"/> 
            {status === 'loading' && <Spinner />}
            {status === 'idle' && 
            <MainWrapper>                        
                {favorites.map((favorite)=>{
                    return (
                    <BusinessWrapper key={favorite._id}>
                        <TopIconWrapper title='Delete Favorite'>
                            <IconButton padding='5px' onclick={(e)=>handleDeleteClick(e, favorite._id)} ><MdDeleteForever size={25}/></IconButton>
                        </TopIconWrapper>                        
                        <BusinessItem data={favorite} height='150px'/>                                               
                    </BusinessWrapper>
                    )              
                })}
            </MainWrapper>
            }
        </Wrapper>
    );
};

const Wrapper = styled.div`
   font-size: 15px;
   height: calc(100vh - ${HEADER_HEIGHT});

   ${onSmallTabletMediaQuery()} {   
        height: calc(100vh - ${HEADER_HEIGHT_SMALL});
    } 
`;

const MainWrapper = styled.div`
    margin: 20px auto;
    max-width: 700px;
    padding: 20px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    flex: 1;
    align-items: center;
`;


const BusinessWrapper = styled.div`
    position: relative;  
    margin: 5px;
    width: 100%; 
    border-radius:10px;
`;

const TopIconWrapper = styled.div`
    position: absolute;
    top: 10px;
    right: 7px;
    z-index: 3;
`;


export default Favorites;