import React, {useState, useEffect, useCallback} from 'react';
import styled from 'styled-components';
import { useHistory  } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdDeleteForever } from 'react-icons/md'
import { BsPencilSquare } from 'react-icons/bs'
import { HEADER_HEIGHT } from '../../GlobalStyles';
import UserHeader from '../../components/userHeader/UserHeader';
import BusinessItem from '../../components/businessItem/BusinessItem';
import Spinner from '../../components/spinner/Spinner';
import Button from '../../components/button/Button';
import IconButton from '../../components/button/IconButton';
import Error from '../error/Error';


const Business = ()=>{
    const { authData } = useSelector((state)=>state.auth); 
    const [status, setStatus] = useState("loading");
    const [error, setError] = useState("");
    const [business, setBusiness] = useState(null);
    const history = useHistory();

    const handleNewClick = (e) =>{
        e.preventDefault();
        history.push('/user/new/business');
    };

    const deleteItem = useCallback((id)=>{       
        let newBusiness = business.filter((item)=>{
            return item._id !== id;
        })
        setBusiness(newBusiness);
    },[business]);


    const handleDeleteClick = useCallback((e, id)=>{
        e.preventDefault();   
        fetch(`/business/${id}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authData?.token}`
            }               
        })
        .then((res) => res.json())
        .then((json) => {
            const { status } = json;            
            if (status === 201) { 
                deleteItem(id);
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
    }, [authData?.token, deleteItem]);

    const handleModifyClick = (e, id)=>{
        e.preventDefault();
        history.push(`/user/business/${id}`)
    };

    useEffect(() => {       
    
            setStatus("loading");   
            fetch('/user/business', {
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
                    setBusiness(data);
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
            <UserHeader title="My Business"/> 
            {status === 'loading' && <Spinner />}
            {status === 'idle' && 
            <MainWrapper> 
                <ButtonWrapper>
                    <Button width={'200px'} onclick={handleNewClick} >+ New Business</Button> 
                </ButtonWrapper>          
                {business.map((singleBusiness)=>{
                    return (
                    <BusinessWrapper key={singleBusiness._id}>
                        <TopIconWrapper title='Delete Business'>
                            <IconButton padding='5px' onclick={(e)=>handleDeleteClick(e, singleBusiness._id)} ><MdDeleteForever size={25}/></IconButton>
                        </TopIconWrapper>                        
                        <BusinessItem data={singleBusiness} height='150px'/>
                        <BottomIconWrapper title='Modify Business'>
                            <IconButton padding='5px' onclick={(e)=>handleModifyClick(e, singleBusiness._id)}>< BsPencilSquare size={25}/></IconButton>
                        </BottomIconWrapper>                        
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
`;

const MainWrapper = styled.div`
    margin: 0 auto;
    max-width: 700px;
    padding: 20px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    flex: 1;
    align-items: center;
`;

const ButtonWrapper = styled.div`
    margin: 10px 10px 25px 10px;
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

const BottomIconWrapper = styled.div`
    position: absolute;
    bottom: 10px;
    right: 7px;
    z-index: 3;
`;



export default Business;