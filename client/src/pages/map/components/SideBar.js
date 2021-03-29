import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../../GlobalStyles';
import BusinessItem from '../../../components/businessItem/BusinessItem';
import Spinner from '../../../components/spinner/Spinner';
import { VscSearchStop} from "react-icons/vsc";


const SideBar = ({ data, handleOnMouseEnter, handleOnMouseLeave, status })=>{  

    return(
        <Wrapper>
            {status === 'loading' && <Spinner />}
            {status === 'error' && 
            <NoResultWrapper>
                <p><strong>Oups...</strong></p>
                <p>Something went wrong</p>
                <VscSearchStop color='lightgray' size={40}/>
            </NoResultWrapper>}
            {status === 'idle' && <>
            {data && data.length === 0 &&
             <NoResultWrapper>
                 <p><strong>No results found.</strong></p>
                 <p>To see more results, try panning or zooming the map </p>
                <VscSearchStop color='lightgray' size={40}/>
            </NoResultWrapper>}
            {data && data.map((item)=>{
                return(
                    <BusinessItem
                        key={item._id}
                        data={item}
                        handleOnMouseEnter={handleOnMouseEnter} 
                        handleOnMouseLeave={handleOnMouseLeave} 
                        
                    />                       
                );
            })} </>}
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
        width: 6px;
             
    }

    &:hover::-webkit-scrollbar {
       // width: 7px;

       
    }
 
    &::-webkit-scrollbar-track {
        background: #ddd;
       
    }
 
    &::-webkit-scrollbar-thumb {
        background: #ae95d7;
        border-radius: 10px;
       
    }
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