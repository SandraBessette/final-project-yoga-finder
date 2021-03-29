import React, {useState, useEffect, useCallback} from 'react';
import styled from 'styled-components';
import {
    GoogleMap,
    Marker,
    InfoWindow

} from "@react-google-maps/api";
import { HEADER_HEIGHT } from '../../GlobalStyles'
import MapStyled  from '../../MapStyled';
import Button from '../../components/button/Button';
import SearchBox from './components/SearchBox';
import SideBar from './components/SideBar';
import LocationButton from './components/LocationButton';
import SmallWindow from './components/SmallWindow';

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

const Map = ()=>{ 
   
    const [business, setBusiness] = useState(null);
    const [animatedId, setAnimatedId] = useState(null);
    const [status, setStatus] = useState("idle");
    const [coordinates, setCoordinates] = useState(null);
    const [areaButtonVisible, setAreaButtonVisible] = useState(false);
    const [selected, setSelected] = useState(null);
   //const [map, setMap] = React.useState(null)  

    const mapRef = React.useRef();  
    const onMapLoad = useCallback((map) => {     
       
        mapRef.current = map; 
    }, []);  
   

    const onUnmount = useCallback((map) =>{       
        mapRef.current = null;
    }, [])

    const updateCoordinates = useCallback(() => {    
        const NECorner = mapRef.current.getBounds().getNorthEast();
        const SWCorner = mapRef.current.getBounds().getSouthWest();
   
        setCoordinates({center: [mapRef.current.getCenter().lng(), mapRef.current.getCenter().lat()], 
                    bounds: {nw: [SWCorner.lng(), NECorner.lat()], 
                            ne: [NECorner.lng(), NECorner.lat()], 
                            se: [NECorner.lng(), SWCorner.lat()],
                            sw:[SWCorner.lng(), SWCorner.lat()]}
                    });
    }, []);

    const handleAreaButtonClick = useCallback((e)=>{
        e.preventDefault();
        updateCoordinates();
    }, [updateCoordinates]);

    const handleOnMouseEnter = useCallback((e, id) =>{
        setAnimatedId(id);
    }, []);

    const handleOnMouseLeave = useCallback(() =>{
        setAnimatedId(null);
    }, []);

    const handleClickMarker = useCallback((marker) =>{       
        setSelected({...marker});         
    }, []);

    const panTo = useCallback(({ lat, lng, bounds = null }) => {
        mapRef.current.panTo({ lat, lng });       
        mapRef.current.setZoom(14);
        updateCoordinates();
    }, [updateCoordinates]);    
   

    useEffect(()=>{
        if(!coordinates)
            return;       
        setStatus("loading");
        fetch('/business/filters', {
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
    
    return(
        <Wrapper> 
            <GoogleMap 
                mapContainerStyle={mapContainerStyle} 
                zoom={15}
                center={center}
                options={options}
                onLoad={onMapLoad} 
                onUnmount={onUnmount}                          
                onBoundsChanged={ () => {                
                    if (!coordinates) {                      
                        updateCoordinates();
                    }
                    else {                       
                        setAreaButtonVisible(true);
                    }   
                }
            }
            >
                {business && business.map((marker) => (              
                <Marker
                    key={marker._id}
                    position={{ lat: marker.location.coordinates[1], lng: marker.location.coordinates[0] }} 
                    animation={animatedId === marker._id ? window.google.maps.Animation.BOUNCE: null}                     
                    onClick={() => { handleClickMarker(marker)}}  
                      icon={{
                        url: icons[marker.type].icon,                 
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(20, 40),
                        scaledSize: new window.google.maps.Size(40, 40),
                      }}                  
                />
                ))}
               {coordinates &&
                <Marker                    
                    position={{ lat: coordinates.center[1], lng: coordinates.center[0] }} 
                    icon={{
                        url: '/pinCenter.svg',                     
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(0, 35),
                        scaledSize: new window.google.maps.Size(35, 35),
                      }}                  
                />}
                {selected ? (                   
                <InfoWindow                  
                    position={{ lat: selected.location.coordinates[1], lng: selected.location.coordinates[0] }}  
                    options={{pixelOffset: new window.google.maps.Size(0, -42)}}                                
                    onCloseClick={() => {                
                        setSelected(null);
                    }} 
                >
                <SmallWindow data={selected}/>
                </InfoWindow>
                ) : null}
            </GoogleMap>
            <SearchBox panTo={panTo}/>               
            <LocationButton panTo={panTo}/>          
            {areaButtonVisible && <AreaWrapper >
                <Button width={'175px'} radius={'15px'} onclick={handleAreaButtonClick }>
                    Search this area...
                </Button>
            </AreaWrapper>}
            <SideBar 
                data={business}
                handleOnMouseEnter={handleOnMouseEnter}
                handleOnMouseLeave={handleOnMouseLeave}
                status={status}
            />                  
        </Wrapper>
    );

};

const Wrapper = styled.div`
    position: relative;
    width: 100%;
    height: calc(100vh - ${HEADER_HEIGHT});

    & *:focus {
        outline: none;
    }
`;

const AreaWrapper = styled.div`
    position: absolute;
    bottom: 20px;
    left: 50% ;
    display: flex;
    align-items: center;
    transform: translate(-50%);
`;

export default Map