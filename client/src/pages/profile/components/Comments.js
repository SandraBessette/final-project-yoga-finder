import React, {useState, useEffect } from 'react';
import { useParams  } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from 'styled-components';
import CommentItem from './CommentItem';
import Spinner from '../../../components/spinner/Spinner';
import Error from '../../error/Error';
import { COLORS } from '../../../GlobalStyles';



const Comments = ()=>{  
    const { authData } = useSelector((state)=>state.auth);     
    const [comments, setComments] = useState(null);
    const [error, setError] = useState("");
    const [status, setStatus] = useState("loading");
    const { id } = useParams(); 
    

    useEffect(() => {       
        setStatus("loading");   
        fetch(`${process.env.REACT_APP_API_URL}/comment/user/${id}`, {
            method: "GET",
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
                setComments(data);
                setStatus("idle");                  
            }
            else {
                console.log(message);
                setError(status.toString());
                setStatus("error");                                                      
            }
        })
        .catch((error)=>{ 
            setError("500");              
            setStatus("error");               
        });     
    
  }, [id, authData?.token]);

    if (status ==="error") return <Error type={error}/>; 

    return (  
        <MainWrapper>  
            <Divider />      
            {status === 'loading' && <Spinner />}
            {status === 'idle' && <>
                {comments.map((comment)=>{
                    return(
                        <CommentItem key={comment._id} comment={comment}/>
                    )
                })}  
           </>  }             
        </MainWrapper>       
    );

};

const Divider = styled.div`
    height: 0;
    width: 100%;
    border-top: 1px solid ${COLORS.lightGray};
    margin: 0 0 10px 0;
`;

const MainWrapper = styled.div`
    margin: 0 auto;
    max-width: 800px;
    padding: 20px;
    display: flex;
    flex-direction: column;
 `;



export default Comments;