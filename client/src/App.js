import React, {useState, useEffect} from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route
 } from 'react-router-dom';
 import {  
  useLoadScript,
} from "@react-google-maps/api";
 import styled from 'styled-components';
 import Map from './pages/map/Map';
 import SingleBusiness from './pages/singleBusiness/SingleBusiness';
 import Business from './pages/business/Business';
 import Confirmation from './pages/confirmation/Confirmation';
 import CreateBusiness from './pages/createBusiness/CreateBusiness';
 import SignIn from './pages/signIn/SignIn';
 import Header from './components/header/Header';
 import GlobalStyles from './GlobalStyles';
 import Spinner from './components/spinner/Spinner';

 import { HEADER_HEIGHT } from './GlobalStyles'

const App= () => {  
  const [ libraries ] = useState(['places', 'geometry' ]); 
    const {isLoaded, loadError} = useLoadScript ({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
        libraries,
    });
    

   


  return (
    <> 
      <GlobalStyles />     
      <Router>
       <Header />
       {loadError ?  <Wrapper><p>error</p></Wrapper> :
       <>
        {!isLoaded && <Wrapper><Spinner /></Wrapper>}
        {isLoaded &&
        <Switch>
          <Route exact path="/">           
            <Map />
          </Route> 
          <Route exact path="/Business/:id">           
            <SingleBusiness />
          </Route> 
          <Route exact path="/user/business">           
            <Business />
          </Route> 
          <Route exact path="/user/new/business">           
            <CreateBusiness type='New'/>
          </Route> 
          <Route exact path="/user/business/:id">           
            <CreateBusiness type='Modify'/>
          </Route>
          <Route exact path="/user/new/confirmation">           
            <Confirmation type='New' />
          </Route>  
          <Route exact path="/user/confirmation">           
            <Confirmation type='Modify' />
          </Route>
          <Route exact path="/user/auth">           
            <SignIn />
          </Route>       
        </Switch>
        }
      </>
      }
      </Router>
    </>
  );
}


const Wrapper = styled.div`    
    width: 100%;
    height: calc(100vh - ${HEADER_HEIGHT});
`;

export default App; 
