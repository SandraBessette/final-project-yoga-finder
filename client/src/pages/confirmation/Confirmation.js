import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { HEADER_HEIGHT, HEADER_HEIGHT_SMALL } from '../../GlobalStyles';
import UserHeader from '../../components/userHeader/UserHeader';
import BusinessItem from '../../components/businessItem/BusinessItem';
import Spinner from '../../components/spinner/Spinner';
import Error from '../error/Error';
import { onSmallTabletMediaQuery } from '../../utils/responsives';


const Confirmation = ({type})=>{
    const [status, setStatus] = useState("loading");
    const [business, setBusiness] = useState(null);
    const [error, setError] = useState("");
    
    useEffect(() => {
        const businessID = window.localStorage.getItem('business');
        if (businessID) { 
            setStatus("loading");   
            fetch(`/business/${businessID}`)
            .then((res) => res.json())
            .then((json) => {
                const { status, data } = json;            
                if (status === 200) {               
                    setBusiness(data);
                    setStatus("idle");                  
                }
                else {
                    setError(status.toString());
                    setStatus("error"); 
                    window.localStorage.removeItem("business");                   
                }
            })
            .catch((error)=>{ 
                setError("500");              
                setStatus("error");
                window.localStorage.removeItem("business");
            });
        }
        else { 
            setError("500");              
            setStatus("error"); 
        }  
      }, [setBusiness]);

      if (status === 'error'){
            return <Error type={error}/>;
      }

    return(
        <Wrapper>           
            <UserHeader title="Confirmation"/> 
            {status === 'loading' && <Spinner />}
            {status === 'idle' && 
            <MainWrapper> 
            {type === 'New' ?
                <p>Your business has been created successfully!</p> :
                <p>Your business has been modified successfully!</p>
            }
                <BusinessItem data={business} height='150px'/>
            </MainWrapper>
            }
        </Wrapper>
    )


};

const Wrapper = styled.div`
   height: calc(100vh - ${HEADER_HEIGHT}); 
   font-size: 15px;
   
   ${onSmallTabletMediaQuery()} {   
        height: calc(100vh - ${HEADER_HEIGHT_SMALL});
    }
`;

const MainWrapper = styled.div`
    margin: 0 auto;
    max-width: 700px;
    padding: 20px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    flex: 1;
    align-items: center;
`;
export default Confirmation;