// Dependencies
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import Landing from './Pages/Landing/Landing';
import Home from './Pages/Home/Home';
import Show from './Pages/Show/Show';
import WatchlistsView from './Pages/WatchlistsView/WatchlistsView.jsx';
import Error from './Pages/Error/Error';

const App = () => {
  return (
    <main className='app'>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/fish/:id' element={<Show/>}/>
        <Route path='/mywatchlists' element={<WatchlistsView/>}/>
        <Route path='*' element={<Error/>}/>
      </Routes>
    </main>
  );
};

export default App;