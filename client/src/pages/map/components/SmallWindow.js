import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { currentOpenHours, isOpen} from '../../../api/helper';

const SmallWindow = ({data})=>{
    const windowRef = useRef(null);

    useEffect(()=>{
        if (windowRef.current){
            windowRef.current.focus();
            console.log("useEffect", windowRef.current);
        }
            

    }, []);

    const handleOnBlur = (e)=>{
        console.log('blur');
        console.log("test", e);
        if (windowRef.current){
            windowRef.current.focus();
            
        }

    };
    return (
        <StyledLink ref={windowRef}       
            to={`/business/${data._id}`}
        >
        <Wrapper >
            <Image src={data.image[0] || '/noYogaImage.jpg'} alt="yogaImage"/>
            <div>
            <Title>{data.name}</Title>
            <Content>{data.ratingCount === 0 ? 'No rating': '⭐⭐⭐⭐⭐'}</Content>
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
`;

const Image = styled.img`
   
    width: 200px;
    height: 100px;
    object-fit: cover;  
    margin-bottom: 5px;
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