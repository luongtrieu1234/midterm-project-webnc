import React from "react";
import { Routes, Route } from "react-router-dom";

import { SignIn, HomePage, LandingPage, SignUp } from './pages';
import { PageError } from "./components";

import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" exact element={<LandingPage />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/home-page" element={<HomePage />} />
      <Route path="*" element={<PageError />} />
    </Routes>
  );
}

export default App;
