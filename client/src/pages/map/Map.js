import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {
    GoogleMap,
    useLoadScript,
    Marker,

} from "@react-google-maps/api";
import MapStyled  from './MapStyled';
import { COLORS } from '../../GlobalStyles';
import { MdMyLocation } from  "react-icons/md";
import TextBox from '../../components/textBox/TextBox';
import Button from '../../components/button/Button';

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
    const [ libraries ] = useState(['places', 'geometry' ]);
    console.log(libraries);
    const {isLoaded, loadError} = useLoadScript ({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
        libraries,
    });
   
    const [business, setBusiness] = useState(null);
    const [status, setStatus] = useState("idle");
    const [coordinates, setCoordinates] = useState(null);
    const [areaButtonVisible, setAreaButtonVisible] = useState(false);
   //const [map, setMap] = React.useState(null)  

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {     
        //setMap(map);
        mapRef.current = map; 
    }, []);

    const updateCoordinates = React.useCallback(() => {
        console.log("map in hangle change", mapRef.current);
        const NECorner = mapRef.current.getBounds().getNorthEast();
        const SWCorner = mapRef.current.getBounds().getSouthWest();
   
        setCoordinates({center: [mapRef.current.getCenter().lng(), mapRef.current.getCenter().lat()], 
                    bounds: {nw: [SWCorner.lng(), NECorner.lat()], 
                            ne: [NECorner.lng(), NECorner.lat()], 
                            se: [NECorner.lng(), SWCorner.lat()],
                            sw:[SWCorner.lng(), SWCorner.lat()]}
                    });
    }, []);

    const handleAreaButtonClick = React.useCallback((e)=>{
        e.preventDefault();
        updateCoordinates();
    }, [updateCoordinates]);

    const panTo = React.useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(13);
        updateCoordinates();
    }, [updateCoordinates]);

    const handleCurentPositionClick = React.useCallback((e)=>{
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

    useEffect(()=>{
        if(!coordinates)
            return;
        console.log('coordinates', coordinates)
        setStatus("loading")
        fetch('/enterprises/filters', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...coordinates }),
        })
        .then((res)=>res.json())
        .then((json)=>{
            const {status, data} = json;
                if (status === 201) {
                    setBusiness([...data]);
                    setStatus("idle");
                    setAreaButtonVisible(false);
                }
                else{
                    setStatus("error");
                }
        })
        .catch((error)=>{
            setStatus("error");
        })
    }, [coordinates]);


    if(loadError) return "error loading map";
    if(!isLoaded) return "loading map";
    
    return(
        <Wrapper>
            <GoogleMap 
                mapContainerStyle={mapContainerStyle} 
                zoom={15}
                center={center}
                options={options}
                onLoad={onMapLoad}                
                onBoundsChanged={ () => {                
                    if (!coordinates) {                      
                        updateCoordinates();
                    }
                    else {
                        setAreaButtonVisible(true);
                    }
                        
                 
                 /*   console.log("newbound", map.getBounds().getNorthEast().toJSON());
                    console.log("newbcenter", map.getCenter().toJSON());
                    const test =  window.google.maps.geometry.spherical.computeDistanceBetween(
                        new window.google.maps.LatLng(map.getCenter().lat(), map.getCenter().lng()),
                         new window.google.maps.LatLng(map.getBounds().getNorthEast().lat(), map.getBounds().getNorthEast().lng()));
                    console.log('dist', test);   */                 
                 
                }
            }
            >
                {business && business.map((marker) => (
                <Marker
                    key={marker._id}
                    position={{ lat: marker.location.coordinates[1], lng: marker.location.coordinates[0] }}                   
                />
                ))}
            </GoogleMap>
            <SearchWrapper>
                <TextBox width={'300px'} />                
            </SearchWrapper>
            <IconButton title="Show your location" onClick={handleCurentPositionClick}>
                <MdMyLocation size={25} color= {COLORS.primary} />
            </IconButton >
            {areaButtonVisible && <AreaWrapper >
                <Button width={'175px'} radius={'15px'} onclick={handleAreaButtonClick }>
                    Search this area...
                </Button>
            </AreaWrapper>}
            
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

const AreaWrapper = styled.div`
    position: absolute;
    bottom: 20px;
    left: 50% ;
    display: flex;
    align-items: center;
    transform: translate(-50%);
`;

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
    
    &:focus {
        outline: none;
    }
`;

export default Map