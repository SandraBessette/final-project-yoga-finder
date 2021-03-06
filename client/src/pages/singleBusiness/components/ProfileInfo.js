import React from 'react';
import styled from 'styled-components';
import { useSelector } from "react-redux";
import { Link  } from "react-router-dom";
import { COLORS } from '../../../GlobalStyles';


const ProfileInfo = ({user, disabled = false})=>{
    const { authData } = useSelector((state)=>state.auth);

    return (  
            <ProfilWrapper> 
                <StyledLink className={!authData || disabled ? "disabled" : null} to={`/user/profile/${user._id}`}>                 
                <ProfilImage src={user.image || '/user.svg'} atl="userProfile"/> 
                <p>{user.userName}</p>
                </StyledLink>    
            </ProfilWrapper>
    );

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
    margin: 0 15px 15px 0;
`;

const StyledLink = styled(Link)`
    display: flex;
    text-decoration: none;
    color: inherit;
 
    &.disabled {
    pointer-events: none;
    cursor: default;
    } 
`;

export default ProfileInfo;