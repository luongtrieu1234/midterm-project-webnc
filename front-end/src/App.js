import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { SignIn, HomePage, LandingPage, SignUp, Profile } from './pages';
import { PageError, Loading, NotLogged } from './components';

import './App.css';

function App() {
  //logic

  const token = localStorage.getItem('token');

  //end logic

  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/me' element={<Profile />} />
      <Route path='/loading' element={<Loading />} />
      {token && <Route path='/home-page' element={<HomePage />} />}
      {!token && <Route path='/home-page' element={<NotLogged />} />}
      <Route path='*' element={<PageError />} />
    </Routes>
  );
}

export default App;
