import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../../GlobalStyles';
import SideBarItem from './SideBarItem';
import { VscSearchStop} from "react-icons/vsc";



const SideBar = ({ data, handleOnMouseEnter, handleOnMouseLeave })=>{  

    return(
        <Wrapper>
            {data && data.length === 0 &&
             <NoResultWrapper>
                 <p><strong>No results found.</strong></p>
                 <p>To see more results, try panning or zooming the map </p>
                <VscSearchStop color='lightgray' size={40}/>
            </NoResultWrapper>}
            {data && data.map((item)=>{
                return(
                    <SideBarItem 
                        key={item._id}
                        data={item}
                        handleOnMouseEnter={handleOnMouseEnter} 
                        handleOnMouseLeave={handleOnMouseLeave} 
                        
                    />                       
                );
            })}
        </Wrapper>      
    );
};

const Wrapper = styled.div`
    position: absolute;
    top: 80px;
    left: 20px;
    display: flex;
    flex-direction: column; 
   
    background-color: white;
    border-radius: 5px;
    border: 1px solid ${COLORS.lightGray};
    box-shadow: 0 0 5px lightgray;
    padding: 5px 10px;

    width: 360px;
    height: 600px;
    overflow-y: auto;
    &::-webkit-scrollbar {
        width: 5px;
    }
 
    &::-webkit-scrollbar-track {
        background: #ddd;
    }
 
    &::-webkit-scrollbar-thumb {
        background: #ae95d7;
    }
/*&::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	background-color: #F5F5F5;
    opacity: 0.5;
}

&::-webkit-scrollbar
{
	width: 5px;
	background-color: #F5F5F5;
}

&::-webkit-scrollbar-thumb
{
	background-color: #808080;
	border: 1px solid #808080;
}*/


   /* &::-webkit-scrollbar {
        display: none;
    }*/

    //-ms-overflow-style: none; /* IE and Edge */
    //scrollbar-width: none; /* Firefox */


`;

const NoResultWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 14px;
    padding: 15px;
    color: grey;
`;



export default SideBar;