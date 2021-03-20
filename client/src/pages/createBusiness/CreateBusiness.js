import React, {useState} from 'react';
import { useHistory  } from "react-router-dom";
import styled from 'styled-components';
import { HEADER_HEIGHT } from '../../GlobalStyles';
import UserHeader from '../../components/userHeader/UserHeader';
import TextBox from '../../components/textBox/TextBox.js';


const CreateBusiness = ()=>{
    const [name, setName] = useState("");
    const history = useHistory(); 
    const handleOnChanged = (ev)=>{
        setName(ev.target.value);
    }  

    return (
        <Wrapper>           
            <UserHeader title='Create Business'/>
            <MainWrapper>  
                <form>
                    <label>
                        Name
                        <TextBox 
                            handleOnChanged={handleOnChanged}                            
                            value={name}
                            width='300px'
                            placeholder='name'
                            />
                    </label>

                
                </form>              
               
            </MainWrapper>  
        </Wrapper>
    )
}

const Wrapper = styled.div`
   height: calc(100vh - ${HEADER_HEIGHT}); 

`;

const MainWrapper = styled.div`
    margin: 0 auto;
    max-width: 820px;
`;


export default CreateBusiness;