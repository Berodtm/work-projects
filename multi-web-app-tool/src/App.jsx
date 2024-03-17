import React from 'react';

import NavIndex from './components/nav/NavIndex';
import HomeToolContainer from './components/toolContainer/HomeToolContainer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {
  // Removed all theme-related logic

  return (
    <>
      <div className="app"> 
        <NavIndex /> {/* Removed the toggleTheme and theme props */}
        <HomeToolContainer /> {/* Removed the theme prop */}
      </div>
      
    </>
  );
}

export default App;
