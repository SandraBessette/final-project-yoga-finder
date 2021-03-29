import React from 'react';
import styled from 'styled-components';
import  moment from 'moment'; 
import { useParams, useHistory, Link  } from "react-router-dom";
import ProfileInfo from './ProfileInfo';
import { COLORS } from '../../../GlobalStyles';
import Rating from '../../../components/rating/Rating'


const CommentItem = ({ comment })=>{
    
    
    return (
        <>
        <Divider />
        <ProfileInfo user={comment.userId}/>
        <RatingWrapper>
            <Rating         
                value={comment.rating} 
                disabled={true}
            />
            <Date>{moment(comment.createdAt).format('MMMM Do YYYY, HH:mm')}</Date>
         </RatingWrapper>       
        <Text>{comment.message}  </Text>
      </>
    )

};

const Divider = styled.div`
    height: 0;
    width: 100%;
    border-top: 1px solid ${COLORS.lightGray};
    margin: 0 0 10px 0;
`;

const Text = styled.p`
    margin: 0 0 20px 0;
`;

const Date = styled.p`
    margin: 0 15px;;
    font-size: 13px;
    text-align: right;
`;

const RatingWrapper = styled.div`
    display: flex;
    align-items: center;
    margin: 5px 15px 15px 0;

`;

export default CommentItem;