import React, {useCallback} from 'react';
import styled from 'styled-components';
import {
    GoogleMap,
    useLoadScript,
    Marker,

} from "@react-google-maps/api";
import { HEADER_HEIGHT } from '../../GlobalStyles'
import MapStyled  from '../../MapStyled';

import Spinner from '../../components/spinner/Spinner';

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

const icons = {
    Yoga: {
        icon: '/yogaMarker2.svg'
    },
    Accessory: {
        icon: '/MarkerMeditation.svg'
    },
    Meditation: {
        icon: '/MarkerAccessory.svg'
    }
};

const Map = ({lat, lng, type})=>{
    
  /*  const {isLoaded, loadError} = useLoadScript ({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,      
    });  
    
    if(loadError) return "error loading map"; */
    
    return(
        <Wrapper>
            {/*!isLoaded && <Spinner />*/}
            {/*isLoaded && */
                <GoogleMap 
                    mapContainerStyle={mapContainerStyle} 
                    zoom={15}
                    center={{
                        lat: lat,
                        lng: lng
                    }}
                    options={options}                     
                >
                    <Marker                    
                    position={{ lat: lat, lng: lng }} 
                    icon={{
                        url: icons[type].icon,                     
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(0, 35),
                        scaledSize: new window.google.maps.Size(35, 35),
                      }}                  
                />
                  
                
                       
                </GoogleMap>   
            }                  
        </Wrapper>
    );  

};

const Wrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;

export default Map