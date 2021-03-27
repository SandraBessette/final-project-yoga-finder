import React, {useState, useEffect, useCallback} from 'react';
import { useParams, useHistory  } from "react-router-dom";
import styled from 'styled-components';
import { useSelector } from "react-redux";
import FileBase from 'react-file-base64';
import { COLORS, HEADER_HEIGHT } from '../../GlobalStyles';
import UserHeader from '../../components/userHeader/UserHeader';
import TextBox from '../../components/textBox/TextBox.js';
import SearchBox from '../map/components/SearchBox';
import DropDown from './components/DropDown';
import Checkbox from './components/Checkbox';
import TextArea from './components/TextArea';
import Map from '../../components/map/Map';
import Button from '../../components/button/Button';
import Spinner from '../../components/spinner/Spinner';
import Error from '../error/Error';

const typeArray = ["Yoga", "Meditation", "Accessory"];
const daysArray = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday","sunday"];
const typeHourArray = ["Open", "Close"];

const tagObject = {
     0: { name: "Online", isChoosen: false },
     1: { name: "Corporate", isChoosen: false },
     2: { name: "Hot yoga", isChoosen: false },
     3: { name: "Therapeutic yoga", isChoosen: false },
     4: { name: "Hatha Yoga", isChoosen: false },
     5: { name: "Ashtanga Yoga", isChoosen: false },
     6: { name: "Vinyasa/Flow Yoga", isChoosen: false },
     7: { name: "Yin Yoga", isChoosen: false },
     8: { name: "Kundalini Yoga", isChoosen: false },
     9: { name: "Prenatal Yoga", isChoosen: false },
     10: { name: "Kripalu Yoga", isChoosen: false },  
};

const formDataInit = {
    name: "",
    type: "Yoga",
    phone: "",
    address: {
        formatted: "",
        zip: "",
        app: "",
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
            start: "08:00",
            end: "17:00",
            type: "Open"
        },
        tuesday:{
            start: "08:00",
            end: "17:00",
            type: "Open"
        },
        wednesday:{
            start: "08:00",
            end: "17:00",
            type: "Open"
        },
        thursday:{
            start: "08:00",
            end: "17:00",
            type: "Open"
        },
        friday:{
            start: "08:00",
            end: "17:00",
            type: "Open"
        },
        saturday:{
            start: "08:00",
            end: "17:00",
            type: "Open"
        },
        sunday:{
            start: "08:00",
            end: "17:00",
            type: "Open"
        }
    }
};

const center = {
    lat: 45.501690,
    lng: -73.567253
};
const CreateBusiness = ({type})=>{
    const { authData } = useSelector((state)=>state.auth);   

    const [formData, setFormData] = useState(formDataInit);
    const [status, setStatus] = useState("idle");
    const [error, setError] = useState("");
    const [disabled, setDisabled] = useState(false); 
    const [validPhoneError, setValidPhoneError] = useState(""); 
    const [validZipError, setValidZipError] = useState("");   
    const [serverError, setServerError] = useState("");   
    const { id } = useParams();
    const history = useHistory(); 
      
    const  handleChange = (ev, item)=>{
        setFormData({...formData, [item]: ev.target.value});
    };

    const  handleChangeApp = (ev)=>{
        setFormData({...formData, address: { ...formData.address, app: ev.target.value}});
    };

    const  handleHoursChange = (ev, day, item)=>{
        setFormData({...formData, hours: {...formData.hours, [day]: {...formData.hours[day], [item]: ev.target.value } } });
    };

    const handleImages = (base64)=>{ 
        setFormData({ ...formData, image: [ base64 ] });
    };

    const handleOnClick =(ev) =>{
        ev.preventDefault();
        setServerError("");
        setDisabled(true);
        const endpoint = type === 'New' ? '/business/': `/business/${id}`;
        const method = type === 'New' ? 'POST': 'PUT';
        const confirmationLink = type === 'New' ? '/user/new/confirmation': '/user/confirmation';
        fetch(endpoint, {
            method: method,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authData?.token}`
            },
            body: JSON.stringify({ ...formData }),
        })
        .then((res)=>res.json())
        .then((json)=>{
            const {status, data} = json;
                if (status === 201) {
                    localStorage.setItem("business", data._id);
                    history.push(confirmationLink);
                }
                else{
                    setServerError(json.message);
                    setDisabled(false);
                }
        })
        .catch((error)=>{
            setServerError("unknown error");
            setDisabled(false);
        });       
        
    };

    const handleTags = (ev, value)=>{
        
      let tagsArray = [ ...formData.tags];
        if (ev.target.checked)
            tagsArray.push(value);
        else {
            tagsArray = tagsArray.filter((tag)=>(tag !== value))
        }
        setFormData({ ...formData, tags: tagsArray});
    };


    const hoursArray = useCallback(()=>{
        const halfHours = ["00", "30"];
        const times = [];
        for(let i = 0; i < 24; i++){
            for(let j = 0; j < 2; j++){       
                times.push( ('0' + i).slice(-2) + ":" + halfHours[j] );
            }
        }
        return times;
    }, []);

    const panTo = useCallback(({ lat, lng, bounds, formatAddress, zipCode }) => {      
        setFormData({...formData, address: {formatted: formatAddress, zip: zipCode}, location: {type: "Point", coordinates: [lng, lat]}});      
       
    }, [formData]);

    const formZipValidation = useCallback(() => {       
        let isValid = true;

        if (formData.address.zip === "" )
            return false;
       
        if (!(/^[ABCEGHJ-NPRSTVXY][0-9][ABCEGHJ-NPRSTV-Z] [0-9][ABCEGHJ-NPRSTV-Z][0-9]$/.test(formData.address.zip))){
            setValidZipError("The zip code is not a valid zip code in Canada. Try to choose a more precise location in Canada");
            isValid = false;           
        }  
        else
            setValidZipError("");
        
        return isValid;
      }, [formData.address.zip]);

    const formPhoneValidation = useCallback(() => {       
        let isValid = true;

        if (formData.phone === "")
            return false;
     
        if (!(/\d{3}-\d{3}-\d{4}/.test(formData.phone)) || formData.phone.length > 12){
            setValidPhoneError( "The phone number should have a 999-999-9999 format");          
            isValid = false;
        }
        else 
            setValidPhoneError("");      
      
        return isValid;
      }, [formData.phone]);

    useEffect(() => {
        if (type === 'Modify' && id) {
        setStatus("loading");
        fetch(`/business/${id}`)
          .then((res) => res.json())
          .then((json) => {
            const { status, data} = json;     
            if (status === 200) {  
                setFormData({...data}); 
                setStatus("idle");
            } else {    
                setError(status.toString());     
                setStatus("error");
                console.log(json.message);
            }
          })
          .catch((e) => {    
                setError("500");    
                setStatus("error");
          });
        }

     },[type, id]);

    useEffect(() => { 
        let isDisabled = false;
      
        if (!formZipValidation() || 
            formData.name === "" || 
            formData.location.coordinates === [0,0] ||
            formData.address.formatted === "" ||
            !formPhoneValidation())
                isDisabled = true;
    
         setDisabled(isDisabled);
      }, [ formData.name, formData.location.coordinates, formData.address.formatted,  formZipValidation, formPhoneValidation, setDisabled]);

    if (status ==="error") return <Error type={error}/>;;

    return (
        <Wrapper>           
            <UserHeader title={type=='New' ? 'Create Business' : 'Modify Business'}/> 
            <MainWrapper>  
            {status === 'loading' && <Spinner />}
            {status === 'idle' && 
                <Form>
                    <Image src={formData.image[0] || '/noYogaImage.jpg'} alt="yogaPicture"></Image>
                    <TextBoxWrapper>
                    <Label htmlFor='name' >Image </Label>                     
                    <div >
                        <FileBase type="file" multiple={false} onDone={({ base64 }) => handleImages(base64)} />
                    </div>   
                    </TextBoxWrapper>
                    <TextBoxWrapper>
                    <Label htmlFor='name' >Name * </Label>                     
                        <TextBox 
                            handleOnChanged={(e)=>handleChange(e, 'name')}                            
                            value={formData.name}
                            width='100%'
                            placeholder='name'
                            id='name'
                            /> 
                    </TextBoxWrapper>
                    <DropDown 
                        id='type'
                        label='Type'
                        width='150px'                     
                        defaultValue={formData.type}
                        handleSelect={(e)=>handleChange(e, 'type')}
                        valueArray={typeArray}
                    /> 
                    <TextBoxWrapper>
                    <Label htmlFor='phone'>Phone *</Label>                     
                        <TextBox 
                            handleOnChanged={(e)=>handleChange(e, 'phone')}                            
                            value={formData.phone}
                            width='150px'
                            placeholder='514-999-9999'
                            id='phone'
                            /> 
                    </TextBoxWrapper>
                    <ErrorMessage>{validPhoneError}</ErrorMessage >
                    <Divider/>
                    < SearchBoxWrapper>                                   
                        <SearchBox 
                            panTo={panTo}
                            top='0'
                            left='0%'
                            width='95%'
                            /> 
                    </ SearchBoxWrapper> 
                    <TextBoxWrapper>
                    <Label htmlFor='address'>Address*</Label>                     
                        <TextBox 
                            handleOnChanged={null}                            
                            value={formData.address.formatted}
                            width='100%'                            
                            id='address'
                            disabled={true}
                            /> 
                     </TextBoxWrapper>
                     <TextBoxWrapper>
                    <Label htmlFor='zipCode'>Zip code *</Label>                     
                        <TextBox 
                            handleOnChanged={null}                            
                            value={formData.address.zip}
                            width='100px'                            
                            id='zipCode'
                            disabled={true}
                            /> 
                    </TextBoxWrapper>
                    <TextBoxWrapper>
                    <Label htmlFor='app'>App</Label>                     
                        <TextBox 
                            handleOnChanged={(e)=>handleChangeApp(e)}                            
                            value={formData.app}
                            width='200px'
                            placeholder='appartement number'
                            id='app'
                            /> 
                    </TextBoxWrapper>
                    < MapWrapper>
                        <Map 
                            lat={formData.location.coordinates[1] === 0 ? center.lat : formData.location.coordinates[1]}
                            lng={formData.location.coordinates[0] === 0 ? center.lng : formData.location.coordinates[0]}
                            type={formData.type}                              
                            />
                    </ MapWrapper> 
                    <ErrorMessage>{validZipError}</ErrorMessage >
                    <Divider />
                    <TextAreaWrapper>
                    <Label htmlFor='description'>Description</Label>                     
                        <TextArea
                            handleOnChanged={(e)=>handleChange(e, 'description')}  
                            value={formData.description}
                            width='100%'
                            height='200px'
                            placeholder='Description of my business.'
                            id='description'
                            /> 
                    </TextAreaWrapper>     
                    <TextBoxWrapper>
                    <Label htmlFor='website'>Website</Label>                     
                        <TextBox 
                            handleOnChanged={(e)=>handleChange(e, 'website')}                            
                            value={formData.website}
                            width='100%'
                            placeholder='http://www.mywebsite.com'
                            id='website'
                            /> 
                    </TextBoxWrapper>   
                    <Divider />
                    <TextAreaWrapper>
                    <Label htmlFor='hours'>Hours</Label> 
                    {daysArray.map((day)=>{
                        return (< >
                            <Label key={day}><strong>{day}</strong></Label> 
                            <HoursWrapper>                   
                                <DropDown 
                                    id={`${day}From`}
                                    label='from'
                                    width='80px'
                                    labelWidth='20px'
                                    defaultValue={formData.hours[day].start}
                                    handleSelect={(e)=>handleHoursChange(e, day, 'start')}
                                    valueArray={hoursArray()}
                                    disabled={formData.hours[day].type === 'Close'}
                                /> 
                                <DropDown 
                                    id={`${day}To`}
                                    label='to'
                                    width='80px'
                                    labelWidth='20px'
                                    defaultValue={formData.hours[day].end}
                                    handleSelect={(e)=>handleHoursChange(e, day, 'end')}
                                    valueArray={hoursArray()}
                                    disabled={formData.hours[day].type === 'Close'}
                                /> 
                                <DropDown 
                                    id={`${day}Type`}
                                    label='type'
                                    width='80px'
                                    labelWidth='20px'
                                    defaultValue={formData.hours[day].type}
                                    handleSelect={(e)=>handleHoursChange(e, day, 'type')}
                                    valueArray={typeHourArray}
                                /> 
                            </HoursWrapper>  </> 
                        )
                    })}                   
                    </TextAreaWrapper> 
                    <Divider />   
                    <TextAreaWrapper>
                    <Label>Tags</Label>  
                    {Object.values(tagObject).map((tag)=>{
                        return(
                            <Checkbox
                            key={tag.name}
                            value= {tag.name}
                            handleChange={handleTags}
                            isChecked={formData.tags.includes(tag.name)}
                            >
                                {tag.name}
                            </Checkbox>
                        )
                    })}                   
                       
                    </TextAreaWrapper> 
                    <Divider />   
                    <Button width={'100%'} onclick={handleOnClick} disabled={disabled}>Submit</Button>  
                    <ErrorMessage>{serverError}</ErrorMessage >                                   
                </Form> }             
               
            </MainWrapper>  
        </Wrapper>
    )
}

const Wrapper = styled.div`
   height: calc(100vh - ${HEADER_HEIGHT}); 
   font-size: 15px;

`;
const Divider = styled.div`
    height: 0;
    width: 100%;
    border-top: 1px solid ${COLORS.lightGray};
    margin: 20px 0;
`;

const MainWrapper = styled.div`
    margin: 0 auto;
    max-width: 700px;
    padding: 20px;
    display: flex;
    justify-content: center;
`;

const Label = styled.label`  
    padding: 5px 10px 5px 0;
    color: ${COLORS.primary};
    display: block;
    min-width: 80px;
    float: left;
    margin-right: 15px; // remove with cell vue,,, same with the dropbox
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

const TextAreaWrapper = styled.div`    
    margin: 10px 0;   
    display: flex;
    flex-direction: column;
`;
    
const Form = styled.form`
  border: 1px solid ${COLORS.primary};
  border-radius: 5px;
  margin: 20px 0;
  padding: 25px;
  display: block;
  width: 100%;
`;

const MapWrapper = styled.div`
    height: 300px;
    margin: 15px 0;
`;

const Image = styled.img`
    width: 300px;
    height: 300px;
    display: block;
    margin: auto;
    object-fit: cover;
    border-radius: 10px;
`;

const HoursWrapper = styled.div`
    display: flex;  
    flex-wrap: wrap;
    justify-content: space-between;

    align-items: center;
`;

const ErrorMessage = styled.div`
    font-size: 13px;
    color: red;
`;

export default CreateBusiness;