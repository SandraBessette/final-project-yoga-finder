import React, {useState, useEffect} from 'react';
import { useParams, useHistory, Link  } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from 'styled-components';
import CommentItem from './CommentItem';
import Rating from '../../../components/rating/Rating';
import TextArea from '../../../components/textArea/TextArea';
import Button from '../../../components/button/Button';
import Spinner from '../../../components/spinner/Spinner';
import Error from '../../error/Error';
import { COLORS } from '../../../GlobalStyles';

const intitialState = {rating: 0, message: ""}

const Comments = ()=>{  
    const { authData } = useSelector((state)=>state.auth);   
    const [formData, setFormData] = useState(intitialState);
    const [disabled, setDisabled] = useState(false);
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

    const handleOnClick = (e)=>{
        e.preventDefault();
        //setServerError("");
        //setDisabled(true);
       
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
                    console.log(data, data);
                    let newComment = [...comments];
                    newComment.push({...data, userId:{_id:authData.data._id, userName: authData.data.userName, image: authData.data.image} });
                    //setComments((previous)=>(previous.push(data)));
                    setComments(newComment);
                    
                }
                else{
                    setStatus("error");
                    console.log(message);
                   // setServerError(json.message);
                   // setDisabled(false);
                }
        })
        .catch((error)=>{
           // setServerError("unknown error");
            //setDisabled(false);
            setStatus("error");
        }); 
    }

    useEffect(() => { 
        console.log('id', id);
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
    
  }, []);

    if (status ==="error") return <Error type={error}/>; 

    return (
        <>
        <form>
            <RatingWrapper>          
            <Rating         
                value={formData.rating} 
                onChange={(e, newRating) => {handleChangeRating(e, newRating)}}
                size={30}
            />
             </RatingWrapper>
                                
            <TextArea
                handleOnChanged={(e)=>handleChange(e, 'message')}  
                value={formData.message}
                width='100%'
                height='200px'
                placeholder='Share details of your own experience at this place.'
                id='comment'
            /> 
            <ButtonWrapper>
                <Button width={'100px'} onclick={handleOnClick} disabled={disabled}>Submit</Button> 
            </ButtonWrapper> 
        </form>
        {status === 'loading' && <Spinner />}
        {status === 'idle' && <>
            {comments.map((comment)=>{
                return(
                    <CommentItem comment={comment}/>
                )
            })}  
           </> }      
       
        </>
    )

};

const Label = styled.label`  
    padding: 5px 10px 5px 0;
    color: ${COLORS.primary};
    display: block;
    min-width: 80px;
    //float: left;
    //margin-right: 15px; // remove with cell vue,,, same with the dropbox
    //text-align: start;

`;

const RatingWrapper = styled.div`
    display: flex;
    margin: 15px;

`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin: 15px 0px 15px auto;

`;

export default Comments;