import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from "react-redux";
import { COLORS } from '../../../GlobalStyles';
import BusinessItem from '../../../components/businessItem/BusinessItem';
import Spinner from '../../../components/spinner/Spinner';
import { VscSearchStop} from "react-icons/vsc";
import { onSmallTabletMediaQuery } from '../../../utils/responsives';
import TypeButton from '../../../components/button/TypeButton';
import { updateTypeBusiness, updataAnimatedId } from '../../../store/reducers/map/actions'


const SideBar = ({ data, status })=>{ 
    const { filters } = useSelector((state)=>state.map);  
    const dispatch = useDispatch(); 

    const handleTypeButtonClick = useCallback((e, type)=>{
        e.preventDefault();
       dispatch(updateTypeBusiness(type));       
    }, [dispatch]);

    const handleOnMouseEnter = useCallback((e, id) =>{
        dispatch(updataAnimatedId(id));
    }, [dispatch]);

    const handleOnMouseLeave = useCallback(() =>{
        dispatch(updataAnimatedId(null));

    }, [dispatch]);
   
    return(
        <Wrapper>
            <TypeWrapper>
                {Object.keys(filters.type).map(filterItem=>{               
                    return (
                        <TypeButton 
                            className={filters.type[filterItem] ? "selected" : null} 
                            type={filterItem}
                            margin='0 5px 0 0'
                            onclick={(e)=>handleTypeButtonClick(e, filterItem)}
                            />
                    )
                })}              
            </TypeWrapper>
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

    ${onSmallTabletMediaQuery()} {
        position: static;
        width: 100%;
        height: 600px;
        padding: 10px 20px 20px 20px ;
        border-radius: 0px;
        border: none;      
    }
`;

const TypeWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin: 5px 0;

    ${onSmallTabletMediaQuery()} {
        margin: 0;      
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