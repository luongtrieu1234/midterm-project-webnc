import React from 'react';
import { Routes, Route } from 'react-router-dom';

import {
  SignIn,
  HomePage,
  LandingPage,
  SignUp,
  Profile,
  Google,
  SearchEmail,
  ResetPassword,
  ConfirmCode,
  ConfirmCodeSignUp,
  ClassDetail,
} from './pages';
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
      <Route path='/sign-in-google' element={<Google />} />
      <Route path='/search-email' element={<SearchEmail />} />
      <Route path='/reset-password' element={<ResetPassword />} />
      <Route path='/confirm-code' element={<ConfirmCode />} />
      <Route path='/confirm-code-sign-up' element={<ConfirmCodeSignUp />} />
      <Route path='/me' element={<Profile />} />
      <Route path='/loading' element={<Loading />} />
      {token && <Route path='/home-page' element={<HomePage />} />}
      {token && <Route path='/course/:id' element={<ClassDetail />} />}
      {!token && <Route path='/home-page' element={<NotLogged />} />}
      <Route path='*' element={<PageError />} />
    </Routes>
  );
}

export default App;
