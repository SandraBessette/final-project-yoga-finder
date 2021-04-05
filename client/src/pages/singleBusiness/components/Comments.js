import React, {useState, useEffect, useCallback} from 'react';
import { useParams  } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from 'styled-components';
import CommentItem from './CommentItem';
import Rating from '../../../components/rating/Rating';
import TextArea from '../../../components/textArea/TextArea';
import Button from '../../../components/button/Button';
import Spinner from '../../../components/spinner/Spinner';
import Error from '../../error/Error';


const intitialState = {rating: 0, message: ""}

const Comments = ({onRatingChange})=>{  
    const { authData } = useSelector((state)=>state.auth);   
    const [formData, setFormData] = useState(intitialState);
    const [disabled, setDisabled] = useState(false);
    const [valid, setValid] = useState("");
    const [comments, setComments] = useState(null);
    const [error, setError] = useState("");
    const [status, setStatus] = useState("loading");
    const { id } = useParams();

    const  handleChange = (ev, item)=>{
        setFormData({...formData, [item]: ev.target.value});
    };

    const handleChangeRating = (ev, newRating)=>{
        setFormData({...formData, rating: newRating});
    };

    const formValidation = useCallback(() => {  
        let isValid = true;
        if (formData.rating === 0) {
            setValid( "Don't forget to rate this business.");  
            isValid = false;
        }
        else {
            setValid("");
        }
        return isValid;
      }, [formData.rating]);

    const handleOnClick = useCallback((e)=>{
        e.preventDefault();
        if (!formValidation())
            return;
       
        setDisabled(true);       
        fetch(`/comment/${id}`, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authData?.token}`
            },
            body: JSON.stringify({ ...formData }),
        })
        .then((res)=>res.json())
        .then((json)=>{
            const {status, data, message} = json;
                if (status === 201) {                
                    setComments((previous)=>([ {...data.comment, userId:{_id:authData.data._id, userName: authData.data.userName, image: authData.data.image} }, ...previous]));
                    onRatingChange(data.business);
                    setFormData(intitialState);
                    setDisabled(false);
                }
                else{
                    setStatus("error");
                    console.log(message);              
                    setDisabled(false);
                }
        })
        .catch((error)=>{         
            setStatus("error");
            setDisabled(false);           
        }); 
    },[authData, formData, formValidation, id, onRatingChange]);

    useEffect(() => {       
        setStatus("loading");   
        fetch(`/comment/business/${id}`)
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
    
  }, [id]);

    if (status ==="error") return <Error type={error}/>; 

    return (
        <>
        <form>
            <RatingWrapper>          
            <Rating         
                value={formData.rating} 
                onChange={(e, newRating) => {handleChangeRating(e, newRating)}}
                size={30}
                disabled={!authData}
            />
             </RatingWrapper>
             <ErrorMessage>{valid}</ErrorMessage >               
            <TextArea
                handleOnChanged={(e)=>handleChange(e, 'message')}  
                value={formData.message}
                width='100%'
                height='200px'
                placeholder='Share details of your own experience at this place.'
                id='comment'
                disabled={!authData}
            /> 
            <ButtonWrapper>
                <Button width={'100px'} onclick={handleOnClick} disabled={disabled || !authData}>Send</Button> 
            </ButtonWrapper>             
        </form>
        {status === 'loading' && <Spinner />}
        {status === 'idle' && <>
            {comments.map((comment)=>{
                return(
                    <CommentItem key={comment._id} comment={comment}/>
                )
            })}  
           </> }      
       
        </>
    )

};

const RatingWrapper = styled.div`
    display: flex;
    margin: 15px 15px 15px 0px;
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin: 15px 0px 15px auto;
`;

const ErrorMessage = styled.div`
    font-size: 14px;
    color: red;
`;

export default Comments;