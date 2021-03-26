import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { COLORS, HEADER_HEIGHT } from '../../GlobalStyles';
import UserHeader from '../../components/userHeader/UserHeader';
import BusinessItem from '../../components/businessItem/BusinessItem';
import Spinner from '../../components/spinner/Spinner';


const Confirmation = ({type})=>{
    const [status, setStatus] = useState("loading");
    const [business, setBusiness] = useState(null);
    
    useEffect(() => {
        const businessID = window.localStorage.getItem('business');
        if (businessID) { 
            setStatus("loading");   
            fetch(`/business/${businessID}`)
            .then((res) => res.json())
            .then((json) => {
                const { status, data, message } = json;            
                if (status === 200) {               
                    setBusiness(data);
                    setStatus("idle");                  
                }
                else {
                    setStatus("error"); 
                    window.localStorage.removeItem("business");                   
                }
            })
            .catch((error)=>{               
                setStatus("error");
                window.localStorage.removeItem("business");
            });
        }
        else {           
            setStatus("error"); 
        }  
      }, [setBusiness]);

      if(status === 'error'){
          return <p>"Error in loading your reservation</p>
      }

    return(
        <Wrapper>           
            <UserHeader title="Confirmation"/> 
            {status === 'loading' && <Spinner />}
            {status === 'idle' && 
            <MainWrapper> 
            {type === 'New' ?
                <p>Your business has been created succesfully!</p> :
                <p>Your business has been modified succesfully!</p>
            }
                <BusinessItem data={business} height='150px'/>
            </MainWrapper>
            }
        </Wrapper>
    )


};

const Wrapper = styled.div`
   //height: calc(100vh - ${HEADER_HEIGHT}); 
   font-size: 15px;

`;

const MainWrapper = styled.div`
    margin: 0 auto;
    max-width: 700px;
    height: 100%;
    padding: 20px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    flex: 1;
    align-items: center;
`;
export default Confirmation;