import React from 'react';
import { Routes, Route } from 'react-router-dom';

import {
  SignIn,
  HomePage,
  LandingPage,
  SignUp,
  Profile,
  VerifyPage,
  SearchEmail,
  ResetPassword,
  ConfirmCode,
  ConfirmCodeSignUp,
  ClassDetailPage,
  TestPage,
  GradePage,
  HomePageAdminPage,
  GradeStudentPage,
  GradeStudentDetailPage,
  NotificationPage,
} from './pages';
import { PageError, Loading, NotLogged } from './components';

import SignInAdmin from 'features/Admin/pages/SignInAdmin';

import './App.css';

function App() {
  //logic

  const token = localStorage.getItem('token');

  //end logic

  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/test' element={<TestPage />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/sign-in-google' element={<VerifyPage />} />
      <Route path='/search-email' element={<SearchEmail />} />
      <Route path='/reset-password' element={<ResetPassword />} />
      <Route path='/confirm-code' element={<ConfirmCode />} />
      <Route path='/confirm-code-sign-up' element={<ConfirmCodeSignUp />} />
      <Route path='/me' element={<Profile />} />
      <Route path='/loading' element={<Loading />} />
      {token && <Route path='/home-page' element={<HomePage />} />}
      {token && <Route path='/course/:id' element={<ClassDetailPage />} />}
      <Route path='/course/:classId/grade' element={<GradePage />} />
      <Route path='/course/:classId/grade-student' element={<GradeStudentPage />} />
      <Route path='/course/:classId/grade-student/:userId' element={<GradeStudentPage />} />
      <Route
        path='/course/:classId/grade-student/grade/:gradeId'
        element={<GradeStudentDetailPage />}
      />
      <Route path='/notification' element={<NotificationPage />} />
      {!token && <Route path='/home-page' element={<NotLogged />} />}
      <Route path='*' element={<PageError />} />

      {/* Admin */}
      <Route path='/sign-in-admin' element={<SignInAdmin />} />
      <Route path='/admin' element={<HomePageAdminPage />} />
    </Routes>
  );
}

export default App;
