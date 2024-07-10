import React from 'react';
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom';

import bestLogo from './assets/bestLogo.png'; // Importing the JPG file
import { Home, CreatePost } from './pages';
import d1 from './assets/d1.jpg'; // Importing the background image
import e1Background from './assets/e1.jpg'; // Importing the new background image

const App = () => {
  return (
    <BrowserRouter>
      <header className="w-full flex justify-between items-center bg-gradient-to-r from-black via-blue-950 to-black sm:px-6 px-4 border-b border-b-[#e6ebf4]">
      <Link to="/">
          <div className="flex items-center">
            <img src={bestLogo} alt="logo" className="w-28 object-contain mr-2" />
            <p className="text-xl font-bold text-white">FeatherFrame</p>
          </div>
        </Link>
        <div>
          <NavigationButtons />
          {/* <Link to="/create-post" className="font-inter font-medium bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-md ml-4">
            Create
          </Link> */}
        </div>
      </header>
      <main className='sm:p-8 px-4 py-8 w-full min-h-[calc(100vh-73px)]' style={{ backgroundImage: `url(${d1})`, backgroundSize: 'cover' }}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create-post' element={<CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

const NavigationButtons = () => {
  const location = useLocation();

  // Render "Home" button only on pages other than Home
  if (location.pathname !== '/') {
    return (
      <Link to="/" className='font-inter font-medium bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-md mr-4'>
        Home
      </Link>
    );
  }

  if (location.pathname !== 'create-post') {
    return (
      <Link to="/create-post" className='font-inter font-medium bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-md mr-4'>
        Create
      </Link>
    );
  }
  return null;
};

export default App;
