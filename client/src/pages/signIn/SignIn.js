import React, {useState, useEffect, useCallback} from 'react';
import styled from 'styled-components';
import { COLORS, HEADER_HEIGHT } from '../../GlobalStyles';
import UserHeader from '../../components/userHeader/UserHeader';
import FileBase from 'react-file-base64';
import TextBox from '../../components/textBox/TextBox.js';
import IconButton from '../../components/button/IconButton';
import Button from '../../components/button/Button';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'


const initialState = { userName: '', email: '', password: '', confirmPassword: '', type: "Client", image: ""};

const SignIn = ({title})=>{
    const [status, setStatus] = useState("loading");   
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const [disabled, setDisabled] = useState(false); 
    const [isHidden, setIsHidden] = useState(true); 
    const [isHiddenConfirm, setIsHiddenConfirm] = useState(true); 
    const [validPassword, setValidPassword] = useState(""); 
    const [validPasswordLenght, setValidPasswordLenght] = useState("");  
    const [serverError, setServerError] = useState("");   
   

    const  handleChange = (ev, item)=>{
        setFormData({...formData, [item]: ev.target.value});
    };

    const handleImages = (base64)=>{ 
        setFormData({ ...formData, image: [ base64 ] });
    };
    
    const handleIconClick = (e)=>{ 
        e.preventDefault();
        setIsHidden(!isHidden);
    };
    const handleIconConfirmClick = (e)=>{ 
        e.preventDefault();
        setIsHiddenConfirm(!isHiddenConfirm);
    };

    const handleTextButton = (e)=>{ 
        e.preventDefault();
        setIsSignup(!isSignup);
        setValidPasswordLenght("");  
        setValidPassword(""); 
    };

    const handleSubmit =(ev) =>{
        ev.preventDefault();
        if (!formValidation())
            return;
       /* setServerError("");
        setDisabled(true);
     
        fetch('/enterprises/', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...formData }),
        })
        .then((res)=>res.json())
        .then((json)=>{
            const {status, data} = json;
                if (status === 201) {
                    localStorage.setItem("business", data._id);
                    history.push("/user/newBusiness");
                }
                else{
                    setServerError(json.message);
                    setDisabled(false);
                }
        })
        .catch((error)=>{
            setServerError("unknown error");
            setDisabled(false);
        }); */      
        
    };

    const formValidation = useCallback(() => {  
        if (!isSignup){
            return true;
        } 
           

        let isValid = true;

        if (formData.password.length < 8) {
            setValidPasswordLenght( "The Password must have 8 caracters or more");  
            isValid = false;
        }
        else {
            setValidPasswordLenght("");
        }

        if (formData.password !== formData.confirmPassword) {
            setValidPassword( "The Password and confirm password must be the same"); 
            isValid = false; 
        }        
        else 
            setValidPassword("");      
      
        return isValid;
      }, [formData.password, formData.confirmPassword, isSignup]);

   useEffect(() => { 
        let isDisabled = false;      
        if (formData.userName === "" || 
            formData.password === "" ||
            (formData.confirmPassword === "" &&  isSignup))
            isDisabled = true;
    
         setDisabled(isDisabled);
      }, [formData, isSignup, setDisabled]);
    

    useEffect(() => {
       
      }, []);

      if(status === 'error'){
          return <p>"Error in loading your user account</p>
      }

    return(
        <Wrapper>           
            <UserHeader title={isSignup ? "Sign up" : "Sign In"}/>            
            <MainWrapper> 
            <Form>
                <Image src={formData.image || '/user.svg'} alt="userPicture"></Image>
                { isSignup && <TextBoxWrapper>
                    <Label htmlFor='name' >Image </Label>                     
                    <div >
                        <FileBase type="file" multiple={false} onDone={({ base64 }) => handleImages(base64)} />
                    </div>   
                </TextBoxWrapper>}
                <TextBoxWrapper>
                    <Label htmlFor='username' >Username * </Label>                     
                    <TextBox 
                        handleOnChanged={(e)=>handleChange(e, 'userName')}                            
                        value={formData.name}
                        width='100%'
                        placeholder='username'
                        id='username'
                        /> 
                </TextBoxWrapper>
                <TextBoxWrapper>
                    <Label htmlFor='password' >Password * </Label>
                    <InputWrapper>
                        <TextBox
                            handleOnChanged={(e)=>handleChange(e, 'password')}  
                            type={isHidden ? "password" : "text"} 
                            width='100%'
                            id="password"   
                            value={formData.password}        
                            placeholder="password"  
                            />
                            <IconButton width='30px' margin='0 5px' onclick={handleIconClick}>
                                {isHidden ? < AiOutlineEye size={25}/> : <AiOutlineEyeInvisible size={25}/>}
                            </IconButton>                            
                    </InputWrapper>  
                </TextBoxWrapper>
                <Error >{validPasswordLenght}</Error> 
                { isSignup && <>
                <TextBoxWrapper>
                    <Label htmlFor='confirmPassword' >Confirm * </Label>
                    <InputWrapper>
                        <TextBox
                            handleOnChanged={(e)=>handleChange(e, 'confirmPassword')}  
                            type={isHiddenConfirm ? "password" : "text"} 
                            width='100%'
                            id="confirmPassword"   
                            value={formData.confirmPassword}        
                            placeholder="confirm password"  
                            />
                            <IconButton width='30px' margin='0 5px' onclick={handleIconConfirmClick}>
                                {isHiddenConfirm ? < AiOutlineEye size={25}/> : <AiOutlineEyeInvisible size={25}/>}
                            </IconButton>                            
                    </InputWrapper>  
                </TextBoxWrapper>
                <Error >{validPassword}</Error> </> }
                <Button width={'100%'} onclick={handleSubmit} disabled={disabled}>Submit</Button> 
                <TextButton onClick={handleTextButton}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
                </TextButton> 
                <Error >{serverError}</Error>                 
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
    max-width: 550px;
   // height: 100%;
    padding: 20px;
    display: flex;
    justify-content: center;
   
`;

const Form = styled.form`
  border: 1px solid ${COLORS.primary};
  border-radius: 5px;
  margin: 20px 0;
  padding: 35px 35px 20px 35px;
  display: block;
  width: 100%;
`;

const Label = styled.label`  
    padding: 5px 10px 5px 0;
    color: ${COLORS.primary};
    display: block;
    min-width: 100px;
    float: left;
   // margin-right: 15px; // remove with cell vue,,, same with the dropbox
    text-align: start;
`;

const TextBoxWrapper = styled.div`    
    margin: 15px 0;
    display: flex;
    align-items: center;
`;

const Image = styled.img`
    width: 200px;
    height: 200px;
    display: block;
    margin: 20px auto 35px auto;
    object-fit: cover;
    border-radius: 50%;
`;

const InputWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
`;

const Error= styled.div`
    font-size: 13px;
    color: red;
    margin: 8px 0;
`;

const TextButton = styled.button`
    padding: 5px 0;
    margin: 10px 0 0 0 ;
    background: transparent;    
    border-color: transparent;
    color: ${COLORS.primary};   
    font-size: 14px;
    cursor: pointer;

    &:focus {
        outline: none;
    }

`;


export default SignIn;