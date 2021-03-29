import React from 'react';
import styled from 'styled-components';
import  moment from 'moment'; 
import Rating from '../../../components/rating/Rating';
import { colors } from '../../../api/helper';
import { onSmallTabletMediaQuery} from '../../../utils/responsives';


const CommentItem = ({ comment })=>{
    
    return (
        <>       
        <TitleWrapper color={colors[comment.businessId.type].color}>
            <p>{comment.businessId.name}</p>
        </TitleWrapper>      
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

const Text = styled.p`
    margin: 0 0 20px 0;
    ${onSmallTabletMediaQuery()} {
        font-size: 14px;
    }
`;

const Date = styled.p`
    margin: 0 15px;;
    font-size: 13px;
    text-align: right;

    ${onSmallTabletMediaQuery()} {
        font-size: 12px;
    }
`;

const RatingWrapper = styled.div`
    display: flex;
    align-items: center;
    margin: 5px 15px 15px 0;

`;

const TitleWrapper = styled.div`
    background-color: ${(p)=>p.color};
    color: white;
    padding: 0 20px;
    margin: 15px 0;

    & p {
        font-size: 20px;
        font-weight: 600;
    }

    ${onSmallTabletMediaQuery()} {       
        & p {
            font-size: 16px;
            font-weight: 600;
        }
    }
`;

export default CommentItem;