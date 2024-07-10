import React, { useContext } from 'react';
import ThemeContext from '../contexts/ThemeContext';

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className='navbar'>
      <h1 className='navbar-title'>Your App</h1>
      <button onClick={toggleTheme} className='theme-toggle-button'>
        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      </button>
    </nav>
  );
};

export default Navbar;
