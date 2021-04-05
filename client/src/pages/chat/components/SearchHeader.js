import React from 'react';
import styled from 'styled-components';
import { COLORS} from '../../../GlobalStyles';
import SearchBox from './SearchBox';

const SearchHeader = ()=>{
    return (
        <Header>
            <SearchBox></SearchBox>
        </Header>
    )
    }

    const Header = styled.div`    
    display: flex;   
    align-items: center;
    justify-content:center;
    min-height: 65px;  
    backdrop-filter: blur(40px);
    background-color: rgba(255, 255, 255, 0.9);
    z-index: 4;
    position: sticky;
    left: 0;
    top: 0;
    width: 100%;
    border-bottom: 1px solid ${COLORS.lightGray};

`;

    export default SearchHeader;