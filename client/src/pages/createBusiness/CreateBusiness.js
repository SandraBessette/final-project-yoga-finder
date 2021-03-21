import React, {useState, useCallback} from 'react';
import { useHistory  } from "react-router-dom";
import styled from 'styled-components';
import { COLORS, HEADER_HEIGHT } from '../../GlobalStyles';
import UserHeader from '../../components/userHeader/UserHeader';
import TextBox from '../../components/textBox/TextBox.js';
import SearchBox from '../map/components/SearchBox';
import DropDown from './DropDown';
import Map from '../../components/map/Map';

const typeArray = ["Yoga", "Meditation", "Accessory"];
const formDataInit = {
    nameBusiness: "",
    type: "Yoga",
    phone: "",
    address: {
        formatted: "",
        zip: "",
    },
    location: {
        type: "Point",
        coordinates: [0,0]
    },
    image: [],
    tags: [],
    description:"",
    website:"",
    hours: {
        monday:{
            start: "8:00",
            end: "17:00",
            type: "Open"
        },
        tuesday:{
            start: "8:00",
            end: "17:00",
            type: "Open"
        },
        wednesday:{
            start: "8:00",
            end: "17:00",
            type: "Open"
        },
        thursday:{
            start: "8:00",
            end: "17:00",
            type: "Open"
        },
        friday:{
            start: "8:00",
            end: "17:00",
            type: "Open"
        },
        saturday:{
            start: "8:00",
            end: "17:00",
            type: "Open"
        },
        sunday:{
            start: "8:00",
            end: "17:00",
            type: "Open"
        }
    }
};

const center = {
    lat: 45.501690,
    lng: -73.567253
};
const CreateBusiness = ()=>{
    const [formData, setFormData] = useState(formDataInit);
    const mapRef = React.useRef();
    const markerRef = React.useRef();
    const history = useHistory(); 
      
    const  handleChange = (ev, item)=>{
        setFormData({...formData, [item]: ev.target.value});
    } 
    
    const panTo = useCallback(({ lat, lng, bounds, formatAddress, zipCode }) => {      
        setFormData({...formData, address: {formatted: formatAddress, zip: zipCode}, location: {type: "Point", coordinates: [lng, lat]}});
        if (mapRef?.current && markerRef?.current){
            mapRef.current.panTo({ lat, lng });
            const latlng = new window.google.maps.LatLng(lat, lng);
            markerRef.current.setPosition(latlng);
        }      
       
    }, [formData]);

    return (
        <Wrapper>           
            <UserHeader title='Create Business'/>
            <MainWrapper>  
                <Form>
                    <TextBoxWrapper>
                    <Label htmlFor='name' >Name </Label>                     
                        <TextBox 
                            handleOnChanged={(e)=>handleChange(e, 'nameBusiness')}                            
                            value={formData.nameBusiness}
                            width='500px'
                            placeholder='name'
                            id='name'
                            /> 
                    </TextBoxWrapper>
                    <DropDown 
                        id='type'
                        label='Type'
                        handleSortSelect={(e)=>handleChange(e, 'type')}
                        valueArray={typeArray}
                    /> 
                    <TextBoxWrapper>
                    <Label htmlFor='phone'>Phone</Label>                     
                        <TextBox 
                            handleOnChanged={(e)=>handleChange(e, 'phone')}                            
                            value={formData.phone}
                            width='150px'
                            placeholder='514-999-9999'
                            id='phone'
                            /> 
                    </TextBoxWrapper>
                    <Divider/>
                    < SearchBoxWrapper>                                   
                        <SearchBox 
                            panTo={panTo}
                            top='0'
                            left='16%'
                            /> 
                    </ SearchBoxWrapper> 
                    <TextBoxWrapper>
                    <Label htmlFor='address'>Address</Label>                     
                        <TextBox 
                            handleOnChanged={null}                            
                            value={formData.address.formatted}
                            width='500px'                            
                            id='address'
                            disabled={true}
                            /> 
                     </TextBoxWrapper>
                     <TextBoxWrapper>
                    <Label htmlFor='zipCode'>Zip code</Label>                     
                        <TextBox 
                            handleOnChanged={null}                            
                            value={formData.address.zip}
                            width='100px'                            
                            id='zipCode'
                            disabled={true}
                            /> 
                    </TextBoxWrapper>
                    < MapWrapper>
                        <Map lat={center.lat} lng={center.lng} type={formData.type} mapRef={mapRef} markerRef={markerRef}/>
                    </ MapWrapper> 
                    <Divider />                                         
                </Form>              
               
            </MainWrapper>  
        </Wrapper>
    )
}

const Wrapper = styled.div`
   height: calc(100vh - ${HEADER_HEIGHT}); 

`;
const Divider = styled.div`
    height: 0;
    width: 100%;
    border-top: 1px solid ${COLORS.lightGray};
    margin: 20px 0;
`;

const MainWrapper = styled.div`
    margin: 0 auto;
    max-width: 820px;
    padding: 20px;
    display: flex;
    justify-content: center;
`;

const Label = styled.label`
    padding-right: 10px;
    color: ${COLORS.primary};
    display: block;
    width: 80px;
    float: left;
    margin-right: 15px;
    text-align: start;

`;

const SearchBoxWrapper = styled.div`
    position: relative;   
    height: 30px;
    width: 100%;
`;

const TextBoxWrapper = styled.div`    
    margin: 10px 0;
    display: flex;
    align-items: center;
`;
    
const Form = styled.form`
  border: 1px solid ${COLORS.primary};
  border-radius: 5px;
  margin: 20px 0;
  padding: 25px;
`;

const MapWrapper = styled.div`
    height: 300px;
    margin: 15px 0;
`;
export default CreateBusiness;