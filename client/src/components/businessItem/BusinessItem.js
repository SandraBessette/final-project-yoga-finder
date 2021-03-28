import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { colors, isOpen} from '../../api/helper';
import Rating from '../rating/Rating';

const BusinessItem = ({data, height= null, handleOnMouseEnter = null, handleOnMouseLeave =null })=>{   

    const formatAdress = (address)=>{
        if (!address)
            return "";
        const addressArray = address.split(",");
        return (`${addressArray[0]}, ${addressArray[1]}`);
    }

    return(
        <StyledLink
            to={`/business/${data._id}`}          
            onMouseEnter={handleOnMouseEnter !== null ? (e)=>handleOnMouseEnter(e, data._id) : null } 
            onMouseLeave={handleOnMouseLeave} 
        >
            <Wrapper height={height} colorBorder={colors[data.type].color}>
                <ImageWrapper colorBorder={colors[data.type].color}>
                    <Image src={data.image[0] || '/noYogaImage.jpg'} alt="yogaImage" />
                </ImageWrapper >
                <ContentWapper>
                    <Title>{data.name}</Title>
                    <Content>
                        <Rating 
                            value={data.ratingResult}
                            disabled={true}
                            size={10}
                        />
                    </Content>
                    <MiddleContent>               
                    <Content>{formatAdress(data.address.formatted)}</Content>
                    <Content>{data.phone} - <Hour isOpen={isOpen(data.hours)}>{isOpen(data.hours) ? 'Open': 'Close'}</Hour></Content>
                    </MiddleContent>
                    <Dist>{data.dist?.calculated && data.dist.calculated.toFixed(2) + ' km'}</Dist>
                </ContentWapper>
            </Wrapper>
        </StyledLink>
    )

};
//{`${data.address.street} ${data.address.city} ${data.address.zip} ${data.address.province} ${data.address.country}`}
const Wrapper = styled.div`
    display: flex;
    border-radius: 5px;
    border: ${(p)=> ('1px solid' + p.colorBorder) };
    padding: 0; 
    min-height: ${(p)=>p.height? p.height : '125px'}; 
    margin: 5px 0;  
   

    &:hover img {      
        transform: scale(1.092);     
    }    
`;

const ImageWrapper = styled.div`
    width: 200px;
    border-bottom: ${(p)=> ('4px solid' + p.colorBorder) };  
    overflow: hidden;
`;

const Image = styled.img`
    width: 100%;
    height: 100%;  
    object-fit: cover;
    transition: transform 0.40s ease-in-out;
`;

const ContentWapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;   
    width: 100%;
    padding: 10px;      
`;

const Title = styled.p`
    font-size: 12px;
    font-weight: 600;
    margin: 0;   
`;

const MiddleContent = styled.div`
    margin: auto 0;
`;

const Content = styled.p`
    font-size: 11px;
    margin: 2px;
`;

const Hour = styled.span`
    color: ${(p=>p.isOpen ? 'green' : 'red')};
    font-weight: 600;
`;

const Dist = styled.p`
    position: absolute;
    right: 10px;
    bottom: 10px;
    font-size: 10px;
    color: black;    
    padding: 0;
    margin: 0;    
`;


const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  width: 100%;
`;

export default BusinessItem;