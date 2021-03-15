import React, { useCallback} from 'react';
import styled from 'styled-components';
import { MdMyLocation } from  "react-icons/md";
import { COLORS } from '../../../GlobalStyles';

const LocationButton = ({panTo})=>{

    const handleCurentPositionClick = useCallback((e)=>{
        e.preventDefault();
        navigator.geolocation.getCurrentPosition(
            (position) => {
                panTo({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            },
            () => null
        );
    }, [panTo]);

    return (
        <IconButton title="Show your location" onClick={handleCurentPositionClick}>
            <MdMyLocation size={25}  />
        </IconButton >
    )

}

const IconButton = styled.button`
    position: absolute;
    bottom: 120px;
    right: 15px;
    border: none;
    cursor: pointer; 
    border-radius: 10px;   
    background: white;
    display: flex;
    align-items: center;
    padding: 5px;
    box-shadow: 0 0 5px grey;
    color: ${COLORS.primary};

     &:hover {  
        color: #6a41ac;
    }  
    
    &:focus {
        outline: none;
    }
`;
export default LocationButton;