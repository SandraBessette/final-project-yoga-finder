import React, {useState} from 'react';
import styled from 'styled-components';
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { COLORS, HEADER_HEIGHT } from '../../GlobalStyles';
import { logout } from '../../store/reducers/auth/action'


const menuItem = [ "Profil", "Favorite", "Business"];

const Navbar = ()=>{
    const dispatch = useDispatch(); 
   
    const handleClick = (e)=>{
        e.preventDefault();
        dispatch(logout());
    }
  

    return(
        <>
        <ImageWrapper >
            <ProfilImage src='/user.svg' atl="userProfile"/>          
            <List>               
                {menuItem.map((item)=>{
                   return (
                    <li key={item}>
                        <StyledLink  activeClassName='active' to={`/user/${item.toLowerCase()}`}>
                            {item}
                        </StyledLink>            
                    </li>
                   ) 
                })}
                <li key="Logout">
                        <StyledLink onClick={handleClick} to={`/`}>
                            "Logout"
                        </StyledLink>            
                </li>
            </List>  
        </ImageWrapper> 
        
        </> 

    );
};

const ProfilImage = styled.img`
    width: 50px;
    height: 50px;    
    margin: 0;
    padding: 0px;
    background: white;
    border-radius: 50%;
`;

const ImageWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: ${HEADER_HEIGHT};
    border-radius: 50%;
    width: 85px;
    padding: 0;
    margin: 0;
    border: none;
    outline: none;
    cursor: pointer; 

    &:hover ul {
        display: block;

    }
`;

const List = styled.ul` 
    position: absolute;
    top: ${HEADER_HEIGHT};
    right: -20px;
    display: none;
    box-sizing: border-box; 
    background-color: white;
    border-radius: 5px;
    width: 100px;    
    box-shadow: 1px 3px 7px 3px #D3D3D3;
    
    //line-height: normal;
    padding: 0;  
    margin: 0px; 
    z-index: 2;
    color: ${COLORS.primary};
  
   li  {
    list-style-type: none;
    margin: 0; 
    padding: 0;
    height: 30px; 
    font-size: 14px;   
    
   }  
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
  
  width: 100%;
  height: 100%;
  padding: 0 15px;
  

  &.active {
    background-color: ${COLORS.primary};
    color: white;
  }

  &:hover {     
    background-color: ${COLORS.primary};
    color: white; 
  }
`;

export default Navbar;