import React from 'react';
import styled from 'styled-components';
import {
    GoogleMap,
    Marker
} from "@react-google-maps/api";
import MapStyled  from '../../MapStyled';

const mapContainerStyle = {
    width: '100%',
    height: '100%',  
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

const Map = ({lat, lng, type })=>{   
 
    return(
            <Wrapper> 
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
                    position={{lat:lat, lng:lng}}                
                    icon={{
                        url: icons[type].icon,                     
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(0, 35),
                        scaledSize: new window.google.maps.Size(35, 35),
                    }}                  
                />
                </GoogleMap>  
            </Wrapper>
        );  
};

const Wrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;

export default Map