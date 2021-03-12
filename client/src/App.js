import React from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route, 
 } from 'react-router-dom';
 import Map from './pages/map/Map';
 import Header from './components/header/Header';
 import GlobalStyles from './GlobalStyles';

const App= () => {
  return (
    <> 
      <GlobalStyles />     
      <Router>
       <Header />
        <Switch>
          <Route exact path="/">           
            <Map/>
          </Route>          
        </Switch>
      </Router>
    </>
  );
}
//tes

export default App; 
