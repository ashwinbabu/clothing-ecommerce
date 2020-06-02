import React from 'react';
import {HomePage} from './Pages/Homepage/homepage.component';
import ShopPage from './Pages/Shop/shop.component';
import {Switch , Route} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div> 
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route exact path='/shop' component={ShopPage}/>
      </Switch>
    </div>
  );
}

export default App;
