import React, {useState} from 'react';
import styled from 'styled-components';
import {
    GoogleMap,
    useLoadScript,
    marker

} from "@react-google-maps/api";
import MapStyled  from './MapStyled';
import { COLORS } from '../../GlobalStyles';
import { MdMyLocation } from  "react-icons/md";
import InputText from '../../components/inputText/InputText';

const mapContainerStyle = {
    width: '100%',
    height: '100%',    
   
};
const center = {
    lat: 45.501690,
    lng: -73.567253
};

const options ={
 styles: MapStyled,
 disableDefaultUI: true,
 zoomControl: true
}
const Map = ()=>{
    const [ libraries ] = useState(['places']);
    const {isLoaded, loadError} = useLoadScript ({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
        libraries,
    });
   

    if(loadError) return "error loading map";
    if(!isLoaded) return "loading map";
    return(
       <Wrapper>
            <GoogleMap 
                mapContainerStyle={mapContainerStyle} 
                zoom={15}
                center={center}
                options={options}
            >
            </GoogleMap>
            <SearchWrapper>
                <InputText width={'300px'} />
                <IconButton>
                <MdMyLocation size={25} color= {COLORS.primary} />
                </IconButton>
            </SearchWrapper>
      </Wrapper>
    )

};
// <Wrapper>

const Wrapper = styled.div`
    position: relative;
    width: 100%;
     height: calc(100vh - 74px);
`;

const SearchWrapper = styled.div`
    position: absolute;
    top: 20px;
    left: 10px;
    display: flex;
    align-items: center;
`;

const IconButton = styled.button`
    border: none;
    cursor: pointer;    
    background: transparent;
    display: flex;
    align-items: center;
    padding: 0;
    
    &:focus {
        outline: none;
    }
`;

export default Map