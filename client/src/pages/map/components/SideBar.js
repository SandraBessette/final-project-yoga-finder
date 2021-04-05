import React, {useState, useCallback } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from "react-redux";
import { COLORS } from '../../../GlobalStyles';
import BusinessItem from '../../../components/businessItem/BusinessItem';
import Spinner from '../../../components/spinner/Spinner';
import { VscSearchStop} from "react-icons/vsc";
import { onSmallTabletMediaQuery, onPhoneMediaQuery } from '../../../utils/responsives';
import TypeButton from '../../../components/button/TypeButton';
import { updateTypeBusiness, updataAnimatedId, updateFilter } from '../../../store/reducers/map/actions';
import Checkbox from '../../createBusiness/components/Checkbox';
import Button from '../../../components/button/Button';

const SideBar = ({ data, status })=>{ 
    const { filters } = useSelector((state)=>state.map); 
    const [filterShow, setFilterShow] = useState(false);  
    const [tempFilter, setTempFilter] = useState({...filters.filter});  
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

    const handleChangeFilter = useCallback((ev, value, index) =>{
     
        setTempFilter(prev=>({...prev, [index]: {name: value, isChoosen: ev.target.checked}}))
       // dispatch(updataAnimatedId(id));
    }, []);

    const handleDoneClick = useCallback((ev) =>{
        ev.preventDefault();
        setFilterShow(false);        
        dispatch(updateFilter(tempFilter));
     
    }, [dispatch, tempFilter]);

    const handleCancelClick = useCallback((ev) =>{
        ev.preventDefault();
        setFilterShow(false);
        setTempFilter({...filters.filter});
       // dispatch(updataAnimatedId(id));
    }, [filters.filter]);

    const handleClickFilter = useCallback((ev) =>{
        ev.preventDefault();
        if (filterShow) {
            setTempFilter({...filters.filter});
        }
        setFilterShow((prev)=>(!prev));
       
    }, [filterShow, filters.filter]);

    const calculateNumFilter = useCallback(() =>{
        let num = 0;
        for (const item in filters.filter){
            if (filters.filter[item].isChoosen) num++;
        }
        return num
    }, [filters.filter]);
   
    return(
        <Wrapper>            
            <TopWrapper >           
                {Object.keys(filters.type).map(filterItem=>{               
                    return (
                        <TypeButton 
                            key={filterItem}
                            className={filters.type[filterItem] ? "selected" : null} 
                            type={filterItem}
                            margin='0 5px 5px 0'
                            onclick={(e)=>handleTypeButtonClick(e, filterItem)}
                            />
                    )
                })} 
                <FilterIconWrapper>
                    <TypeButton  
                        className={filterShow ? "selected" : null}
                        margin='0 5px 5px 0' 
                        onclick={handleClickFilter}
                        />   
                        { calculateNumFilter() > 0 &&
                            <SpanIcon color={COLORS.primary}>
                                <p>{calculateNumFilter()}</p>
                            </SpanIcon>
                        }
                    </FilterIconWrapper>
            </TopWrapper>
            {filterShow ? 
            <FilterWrapper>
                <CheckBoxWrapper>
                    {Object.values(tempFilter).map((tag, index)=>{
                                return(
                                
                                    <Checkbox
                                    key={tag.name}
                                    index={index}
                                    value= {tag.name}
                                    handleChange={handleChangeFilter}
                                    isChecked={tag.isChoosen}
                                    >
                                        {tag.name}
                                    </Checkbox>
                                
                                )
                            })}  
                      </CheckBoxWrapper>
                <ButtonWrapper>
                    <Button width={'100px'} onclick={handleCancelClick} >Cancel</Button> 
                    <Button width={'100px'} onclick={handleDoneClick} >Apply</Button>
                </ButtonWrapper>            
           </FilterWrapper> : <>
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
            })} </>}</>}
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
    padding: 0 10px 10px 10px;
 

    width: 360px;
    height: 700px;
    overflow-y: auto;
    //Firefox
    scrollbar-color: #ae95d7 transparent;
    scrollbar-width: thin;

    //Chrome
    &::-webkit-scrollbar {       
        width: 6px;       
        background: transparent;         
    }

    &:hover::-webkit-scrollbar {  
        &-thumb {
            background: #ae95d7;
        }
    }
  
 
    &::-webkit-scrollbar-thumb {
        background: transparent;
        border-radius: 10px;       
    }

    ${onSmallTabletMediaQuery()} {
        position: static;
        width: 100%;    
        height: 420px;
        padding: 0px 20px 20px 20px ;
        border-radius: 0px;
        border: none;      
    }
`;

const TopWrapper = styled.div`
    position: sticky;
    top: 0;
    left: 0;
    display: flex;  

    flex-wrap: wrap;
    align-items: center;  
    padding: 10px 0 5px 0;
    //background-color: white;
    backdrop-filter: blur(40px);
 background-color: rgba(255, 255, 255, 0.4);
    z-index: 4;  
    ${onSmallTabletMediaQuery()} {
        justify-content:center;    
    }
    ${onPhoneMediaQuery()} {
        justify-content: flex-start;   
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

const FilterWrapper = styled.div`
    display: flex;
    flex-direction: column; 
    justify-content: center;    
    height: 100%;
    margin-bottom: 20px;
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-evenly;   
    padding: 15px 0;  
    margin-top: auto;
`;

const CheckBoxWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;    
    flex-wrap: wrap;
    height: 100%;
    
    ${onSmallTabletMediaQuery()} {
        max-height: 200px;   
        margin: auto 0;     
    }

    ${onPhoneMediaQuery()} {
        max-height: none;
        height: auto;
        flex-wrap: nowrap;
    }
`;

const FilterIconWrapper = styled.div`
    position: relative;
`;

const SpanIcon = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
   
    top: 0;
    right: 0;
    border-radius: 50%; 
    background: ${(p)=> p.color};
    color: white;
    font-size: 9px;
    font-weight: bold;
    width: 15px;
    height: 15px;
  
    & p {
        padding: 0;
        margin: 0;
    }
`;

export default SideBar;