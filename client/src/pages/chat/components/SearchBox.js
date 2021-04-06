import React, {useState} from 'react';
import styled from 'styled-components';
import { useHistory } from "react-router-dom";
import { useSelector} from "react-redux";
import useOnclickOutside from "react-cool-onclickoutside";
import { AiFillCloseCircle } from  "react-icons/ai"; 
import TextBox from '../../../components/textBox/TextBox';
import IconButton from '../../../components/button/IconButton';
import { COLORS} from '../../../GlobalStyles';


const SearchBox = ()=>{  
    const { authData } = useSelector((state)=>state.auth); 
    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0); 
    const [value, setValue] = useState("");
    const [data, setData] = useState(null);
    const [status, setStatus] = useState("loading");  
    const history = useHistory();  
 

     const ref = useOnclickOutside(() => {      
        setValue("");
        setData(null);
        setSelectedSuggestionIndex(0);
      });

      const isListShown = ()=>{
          return status === "idle" && data && data.length !== 0;   
      }

      if (isListShown() && selectedSuggestionIndex > data.length -1)
        setSelectedSuggestionIndex(data.length -1);

    const handleOnChanged = (ev) => {
        setValue(ev.target.value); 
        if (ev.target.value !== "") {
            setStatus("loading");   
        
            fetch(`/user/?search=${ev.target.value}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authData?.token}`
                }               
            })
            .then((res) => res.json())
            .then((json) => {
                const { status, data } = json;            
                if (status === 200) { 
                    setData(data)                             
                    setStatus("idle");                
                }
                else {            
                    setStatus("error");                 
                    console.log(json.message);                                                    
                }
            })
            .catch((error)=>{                        
                setStatus("error");
                console.log("error");                              
            });   
        }
        else {
            clearSearch();
        }    
    };

    const clearSearch = () =>{
        setValue("");
        setData(null);      
        setSelectedSuggestionIndex(0);
    }
    const handleClickClose = (ev) =>{
        ev.preventDefault();
        clearSearch();   
        
    }

    const handleKeyDown = (ev) =>{
           
        switch (ev.key) {
            case "Enter": {   
                if (isListShown())                       
                    handleSelect(data[selectedSuggestionIndex]);
                break;
            }
            case "ArrowUp": {
                if ( isListShown() && selectedSuggestionIndex > 0)
                    setSelectedSuggestionIndex(selectedSuggestionIndex - 1);
                break;
            }
            case "ArrowDown": {
                if (isListShown() && selectedSuggestionIndex < data.length - 1)
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

    const handleSelect = (suggestion) => {   
        clearSearch();
        history.push(`/user/chat/${suggestion._id}`);       
    };
    
    const renderSuggestions = () =>
        data.map((suggestion, index) => {
        const {
            id,
            userName,
            image
        } = suggestion;

        const jonctionIndex = userName.toLowerCase().indexOf(value.toLowerCase()) + value.length;
        const firstHalf = userName.slice(0, jonctionIndex);
        const secondHalf = userName.slice(jonctionIndex);

        const isSelected = selectedSuggestionIndex === index;
        return (
            <li 
                key={id}
                onClick={()=>handleSelect(suggestion)}
                onMouseEnter={()=>(setSelectedSuggestionIndex(index))}           
                style={{
                    background: isSelected ? '#f2eef8' : 'transparent',
                }}
            >
            <ProfilWrapper>                           
                <ProfilImage src={image || '/user.svg'} atl="userProfile"/> 
                <p>{firstHalf}<strong>{secondHalf}</strong></p>               
            </ProfilWrapper>
           
            </li>
            );
        });

    return (
        <SearchWrapper ref={ref} > 
            <TextBoxWrapper>          
                <TextBox 
                    handleOnChanged={handleOnChanged}
                    value={value}
                    width='100%'
                    disabled={false}
                    handleKeyDown={handleKeyDown}
                    placeholder="Search a user" 
                />
                <IconButton title="Clear search" margin='0 5px' onclick={handleClickClose} >
                    <AiFillCloseCircle size={23}  />
                </IconButton > 
            </TextBoxWrapper>       
            { isListShown() && <List>{renderSuggestions()}</List>}                            
        </SearchWrapper>
    );
};

const SearchWrapper = styled.div`
    position: absolute;
    box-sizing: border-box;
    top: 17px;
    left: 10px;
    right: 5px;  
    display: flex;
    flex-direction: column;    
`;

const List = styled.ul`    
    box-sizing: border-box; 
    background-color: white;
    border-radius: 5px;
    width: calc(100% - 33px); 
    box-shadow: 1px 3px 7px 3px #D3D3D3;
    margin-bottom: 20px;   
    line-height: normal;
    padding: 0;   
    z-index: 2;
  
   li {
    list-style-type: none;
    margin: 0;  
    padding: 10px 10px; 
    font-size: 13px;   
     cursor: pointer;   
   }  
`;

const TextBoxWrapper = styled.div`
    display: flex; 
    align-items: center;   
    width: 100%;
`;

const ProfilWrapper = styled.div`
    display: flex;
    align-items: center;

    & p {
        color: ${COLORS.primary}; 
        font-weight: 600;  
    }
`;

const ProfilImage = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%; 
   margin: 0 10px;
`;


export default SearchBox;