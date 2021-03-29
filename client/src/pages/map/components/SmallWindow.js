import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { currentOpenHours, isOpen} from '../../../api/helper';
import Rating from '../../../components/rating/Rating';
import { onSmallTabletMediaQuery } from '../../../utils/responsives';

const SmallWindow = ({data})=>{    
   
    return (
        <StyledLink       
            to={`/business/${data._id}`}
        >
        <Wrapper >
            <Image src={data.image[0] || '/noYogaImage.jpg'} alt="yogaImage"/>
            <div>
            <Title>{data.name}</Title>
            <Content>
                <Rating 
                    value={data.ratingResult}
                    disabled={true}
                    size={12}
                />
            </Content>
            </div>
            <Content>{data.type}</Content>
            <Content><Hour isOpen={isOpen(data.hours)}>{isOpen(data.hours) ? 'Open': 'Close'}</Hour> - {currentOpenHours(data.hours)}</Content>    
        </Wrapper>
        </StyledLink>
    );
};

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.div`
    width: 200px;
    height: 200px;   
    overflow: hidden !important;

    ${onSmallTabletMediaQuery()} {
        width: 175px;
        height: 150px;
    }
`;

const Image = styled.img`   
    width: 200px;
    height: 100px;
    object-fit: cover;  
    margin-bottom: 5px;

    ${onSmallTabletMediaQuery()} {
        width: 175px;
        height: 65px;
    }
`;

const Title = styled.p`
    font-size: 12px;
    font-weight: 600;
    margin: 0;   
`;

const Content = styled.p`
    font-size: 11px;
    margin: 5px 0;
`;

const Hour = styled.span`
    color: ${(p=>p.isOpen ? 'green' : 'red')};
    font-weight: 600;
`;
export default SmallWindow;