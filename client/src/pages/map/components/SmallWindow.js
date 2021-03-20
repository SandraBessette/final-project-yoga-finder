import React from 'react';
import styled from 'styled-components';
import { isOpen} from '../../../api/helper';

const SmallWindow = ({data})=>{
    return (
        <Wrapper>
        <Image src={data.image} alt="yogaImage"/>
        <div>
        <Title>{data.name}</Title>
        <Content>{data.ratingCount === 0 ? 'No rating': '⭐⭐⭐⭐⭐'}</Content>
        </div>
        <Content>{data.type}</Content>
       
        </Wrapper>
    );
};
// <Content>{data.phone} - <Hour isOpen={isOpen(data.hours)}>{isOpen(data.hours) ? 'Open': 'Close'}</Hour></Content>

const Wrapper = styled.div`
    width: 200px;
    height: 200px;   
`;

const Image = styled.img`
    width: 100%;
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
    margin: 2px;
`;

/*const Hour = styled.span`
    color: ${(p=>p.isOpen ? 'green' : 'red')};
    font-weight: 600;
`;*/
export default SmallWindow;