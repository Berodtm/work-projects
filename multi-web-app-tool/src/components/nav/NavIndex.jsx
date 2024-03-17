// NavIndex.jsx
import React from 'react';
import NavBar from './NavBar';

function NavIndex() {
  // Removed the theme and toggleTheme props
  return <NavBar />; // Props are no longer passed to NavBar since we're removing theme toggling
}

export default NavIndex;
