import React, {useState, useEffect, useCallback} from 'react';
import styled from 'styled-components';
import {
    GoogleMap,
    useLoadScript,
    Marker,

} from "@react-google-maps/api";
import MapStyled  from './MapStyled';
import Button from '../../components/button/Button';
import SearchBox from './components/SearchBox';
import SideBar from './components/SideBar';
import LocationButton from './components/LocationButton';

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
    const onMapLoad = useCallback((map) => {     
        //setMap(map);
        mapRef.current = map; 
    }, []);

    const markerUrl = useCallback((type)=>{
        let url = '/yogaMarker2.svg';
        if( type === "Meditation")
            url = '/MarkerMeditation.svg';
        if (type === 'Accessory')
            url = '/MarkerAccessory.svg';
        return url;
    }, []);

    const updateCoordinates = useCallback(() => {
        //console.log("map in hangle change", mapRef.current);
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

    const panTo = useCallback(({ lat, lng, bounds = null }) => {
        mapRef.current.panTo({ lat, lng });
       // console.log(' bounds',  bounds);
      //  if (bounds)
       //     mapRef.current.fitBounds(bounds); 
    //    else
            mapRef.current.setZoom(14);
        updateCoordinates();
    }, [updateCoordinates]);
    
   /* const fitMapToData = useCallback((data) => {
        const bounds = new window.google.maps.LatLngBounds();
        data.forEach((marker)=>{
            bounds.extend(new window.google.maps.LatLng(marker.location.coordinates[1], marker.location.coordinates[0]));
        });

        if (data.length > 0) {
            bounds.extend(mapRef.current.getCenter());
            mapRef.current.fitBounds(bounds);
            
        }    // faut que ca retourne une promise.... pour que ca marche avec le bouton sera this area

    }, []);*/

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
                   // fitMapToData([...data]);
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
                    icon={{
                        url: markerUrl(marker.type),                   
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(0, 40),
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
            </GoogleMap>
            <SearchBox panTo={panTo}/>               
            <LocationButton panTo={panTo}/>          
            {areaButtonVisible && <AreaWrapper >
                <Button width={'175px'} radius={'15px'} onclick={handleAreaButtonClick }>
                    Search this area...
                </Button>
            </AreaWrapper>}
            <SideBar data={business}/>
            
        </Wrapper>
    )

};

const Wrapper = styled.div`
    position: relative;
    width: 100%;
    height: calc(100vh - 74px);
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