import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { COLORS, HEADER_HEIGHT } from '../../GlobalStyles';
import UserHeader from '../../components/userHeader/UserHeader';
import TextBox from '../../components/textBox/TextBox.js';


const initialState = { userName: '', email: '', password: '', confirmPassword: '', type: "Client", image: ""};

const SignIn = ({title})=>{
    const [status, setStatus] = useState("loading");
    const [business, setBusiness] = useState(null);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const [disabled, setDisabled] = useState(false); 
   

    const  handleChange = (ev, item)=>{
        setFormData({...formData, [item]: ev.target.value});
    };

    const handleImages = (base64)=>{ 
        setFormData({ ...formData, image: [ base64 ] });
    };
    
    useEffect(() => {
       
      }, []);

      if(status === 'error'){
          return <p>"Error in loading your reservation</p>
      }

    return(
        <Wrapper>           
            <UserHeader title={isSignup ? "Sign up" : "Sign In"}/>            
            <MainWrapper> 
            <Form>
            </Form>
            </MainWrapper>           
        </Wrapper>
    )


};

const Wrapper = styled.div`
   height: calc(100vh - ${HEADER_HEIGHT}); 
   font-size: 15px;

`;

const MainWrapper = styled.div`
    margin: 0 auto;
    max-width: 700px;
    height: 100%;
    padding: 20px;
    display: flex;
    justify-content: center;
   
`;

const Form = styled.form`
  border: 1px solid ${COLORS.primary};
  border-radius: 5px;
  margin: 20px 0;
  padding: 25px;
  display: block;
  width: 100%;
`;

export default SignIn;