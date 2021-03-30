import React, { useState, useEffect } from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route
 } from 'react-router-dom';
 import {  
  useLoadScript,
} from "@react-google-maps/api";
import { useSelector, useDispatch } from "react-redux";
 import styled from 'styled-components';
 import Map from './pages/map/Map';
 import SingleBusiness from './pages/singleBusiness/SingleBusiness';
 import Business from './pages/business/Business';
 import Confirmation from './pages/confirmation/Confirmation';
 import Favorites from './pages/favorites/Favorites';
 import Profile from './pages/profile/Profile';
 import CreateBusiness from './pages/createBusiness/CreateBusiness';
 import SignIn from './pages/signIn/SignIn';
 import Error from './pages/error/Error';
 import Header from './components/header/Header';
 import GlobalStyles from './GlobalStyles';
 import Spinner from './components/spinner/Spinner';
 import { onSmallTabletMediaQuery } from './utils/responsives';
 import { requestFilterInfo, receiveFilterInfo, receiveFilterInfoError } from './store/reducers/map/actions'

 import { HEADER_HEIGHT, HEADER_HEIGHT_SMALL } from './GlobalStyles'

const App= () => {  
  const { authData } = useSelector((state)=>state.auth); 
  const { status, error } = useSelector((state)=>state.map);
  const [ libraries ] = useState(['places', 'geometry' ]); 
    const {isLoaded, loadError} = useLoadScript ({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
        libraries,
    });
    const dispatch = useDispatch();

    useEffect(() => {  
      dispatch(requestFilterInfo());
      fetch(`/business/filters/metadata`)
        .then((res) => res.json())
        .then((json) => {
          const { status, data} = json;     
          if (status === 200) {           
              dispatch(receiveFilterInfo(data));             
          } else {    
            dispatch(receiveFilterInfoError("error"));  
          }
        })
        .catch((e) => { 
          dispatch(receiveFilterInfoError("error"));  
         
        });
    }, [dispatch]);


  return (
    <> 
      <GlobalStyles />     
      <Router>
       <Header />     
       {(loadError || error === "error") ?  <Wrapper><Error type='500'/></Wrapper> :
       <>
        {(!isLoaded || status === "loading") && <Wrapper><Spinner /></Wrapper>}
        {isLoaded && status === "idle" &&
        <Switch>
          <Route exact path="/">           
            <Map />
          </Route> 
          <Route exact path="/Business/:id">           
            <SingleBusiness />
          </Route> 
          <Route exact path="/user/business">           
            {authData ? <Business /> : <Error type='401'/>}
          </Route> 
          <Route exact path="/user/new/business">           
            {authData ? <CreateBusiness type='New'/> : <Error type='401'/>} 
          </Route> 
          <Route exact path="/user/business/:id">           
            {authData ? <CreateBusiness type='Modify'/> : <Error type='401'/>} 
          </Route>
          <Route exact path="/user/new/confirmation">           
            {authData ? <Confirmation type='New' /> : <Error type='401'/>} 
          </Route>  
          <Route exact path="/user/confirmation">           
            {authData ? <Confirmation type='Modify' /> : <Error type='401'/>}
          </Route>
          <Route exact path="/user/favorites">           
            {authData ? <Favorites /> : <Error type='401'/>}
          </Route>          
          <Route exact path="/user/auth">           
            <SignIn />
          </Route>
          <Route exact path="/user/profile/:id">           
            {authData ? <Profile /> : <Error type='401'/>}
          </Route> 
          <Route path="/*">           
            <Error type='404'/>
          </Route>       
        </Switch>
        }
      </>
      }
      </Router>
    </>
  );
};

const Wrapper = styled.div`    
    width: 100%;
    height: calc(100vh - ${HEADER_HEIGHT});

    ${onSmallTabletMediaQuery()} {   
        height: calc(100vh - ${HEADER_HEIGHT_SMALL});
    } 
`;

export default App; 
