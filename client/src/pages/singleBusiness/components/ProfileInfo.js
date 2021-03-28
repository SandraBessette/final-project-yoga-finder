import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory, Link  } from "react-router-dom";
import { COLORS } from '../../../GlobalStyles';


const ProfileInfo = ({user})=>{
    const { authData } = useSelector((state)=>state.auth);
    return (
        <>
        <StyledLink disabled={!authData} to={`/user/profile/${user._id}`}>
            <ProfilWrapper>                    
                <ProfilImage src={user.image || '/user.svg'} atl="userProfile"/> 
                        <p>{user.userName}</p>
            </ProfilWrapper>
        </StyledLink>
        </>
    )

};

const ProfilWrapper = styled.div`
    display: flex;

    & p {
        color: ${COLORS.primary}; 
        font-weight: 600;  
    }
`;

const ProfilImage = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: inline-block;
    margin: 0 15px 15px 0;
`;


const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;

    & a[disabled] {
    pointer-events: none;
}
`;

export default ProfileInfo;