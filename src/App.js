import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';


import Header from './components/Header';
import Home from './pages/Home';

import Cart from './pages/Cart';



import './scss/app.scss';


export const SearchContext = React.createContext('');


function App() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="wrapper">

      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header></Header>
        <div className="content">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            {/* <Route path='/*' element={<NotFound></NotFound>} /> */}
          </Routes>
        </div>
      </SearchContext.Provider>

    </div>
  );
}

export default App;
