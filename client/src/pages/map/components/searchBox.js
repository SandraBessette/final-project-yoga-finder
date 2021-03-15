import React, {useState} from 'react';
import styled from 'styled-components';
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng
  } from "use-places-autocomplete";
import { AiFillCloseCircle } from  "react-icons/ai"; 
import TextBox from '../../../components/textBox/TextBox';
import { COLORS } from '../../../GlobalStyles';

const SearchBox = ({panTo})=>{  
    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0); 
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
      } = usePlacesAutocomplete({
        requestOptions: {
            location: { lat: () => 45.501690, lng: () => -73.567253 },
            radius: 300 * 1000,
        }
       
      });

    const handleOnChanged = (ev) => {
        setValue(ev.target.value);      
    };

    const clearSearch = () =>{
        clearSuggestions();        
        setSelectedSuggestionIndex(0);
    }
    const handleClickClose = (ev) =>{
        ev.preventDefault();
        clearSearch();   
        setValue("", false);
    }

    const handleKeyDown = (ev) =>{       
        switch (ev.key) {
            case "Enter": {   
                if (status === "OK")                       
                    handleSelect(data[selectedSuggestionIndex]);
                break;
            }
            case "ArrowUp": {
                if ( status === "OK" && selectedSuggestionIndex > 0)
                    setSelectedSuggestionIndex(selectedSuggestionIndex - 1);
                break;
            }
            case "ArrowDown": {
                if (status === "OK" && selectedSuggestionIndex < data.length - 1)
                    setSelectedSuggestionIndex(selectedSuggestionIndex + 1);
                break;
            }
            case "Escape": {
                clearSearch();
                break;
            }
            default:
                break;
        }
    }

    const handleSelect = async ({description}) => {
        console.log('description', description);
        setValue(description, false);
        clearSuggestions();
        setSelectedSuggestionIndex(0);  
    
        try {
            const results = await getGeocode({ address: description });
            const { lat, lng } = await getLatLng(results[0]);  
            console.log(results);
            const bounds = results[0]?.geometry?.bounds;
            panTo({ lat, lng, bounds });
        } catch (error) {
            console.log("😱 Error: ", error);
        }
    };
    
    const renderSuggestions = () =>
        data.map((suggestion, index) => {
        const {
            place_id,
            structured_formatting: { main_text, secondary_text },
        } = suggestion;

        const isSelected = selectedSuggestionIndex === index;
        return (
            <li 
                key={place_id}
                onClick={()=>handleSelect(suggestion)}
                onMouseEnter={()=>(setSelectedSuggestionIndex(index))}           
                style={{
                    background: isSelected ? '#f2eef8' : 'transparent',
                }}
            >
            <strong>{main_text}</strong> <small>{secondary_text}</small>
            </li>
            );
        });

    return (
        <SearchWrapper>            
            <TextBox 
                handleOnChanged={handleOnChanged}
                value={value}
                width='320px'
                disabled={!ready}
                handleKeyDown={handleKeyDown}
                placeholder="Search a location" />
                <IconButton title="Clear search" onClick={handleClickClose} >
                    <AiFillCloseCircle size={23}  />
                </IconButton >       
            {status === "OK" && <List>{renderSuggestions()}</List>}                            
        </SearchWrapper>
    )

}

const SearchWrapper = styled.div`
    position: absolute;
    box-sizing: border-box;
    top: 20px;
    left: 15px;
    display: flex;
    flex-direction: column;
    width: 320px;
`;

const List = styled.ul`    
    box-sizing: border-box; 
    background-color: white;
    border-radius: 5px;
    width: 100%;    
    box-shadow: 1px 3px 7px 3px #D3D3D3;
    margin-bottom: 20px;   
    line-height: normal;
    padding: 0;
    margin: 0 15px;
  
   li {
    list-style-type: none;
    margin: 0;  
    padding: 10px 15px; 
    font-size: 14px;   
     cursor: pointer;   
   }  
`;

const IconButton = styled.button` 
    position: absolute;
    top: 15px;
    left: 335px;
    border: none;
    cursor: pointer;    
    background: transparent;
    display: flex;
    align-items: center;
    padding: 4px;   
    color: ${COLORS.primary};

     &:hover {  
        color: #6a41ac;
    }  
    
    &:focus {
        outline: none;
    }
`;

export default SearchBox;