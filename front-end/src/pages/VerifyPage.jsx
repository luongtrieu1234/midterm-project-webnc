import { Loading } from 'components';
import React from 'react';

const VerifyPage = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const jwt = searchParams.get('jwt');
  if (jwt) {
    localStorage.setItem('token', jwt);
    window.location.href = '/home-page';
  }

  return <Loading />;
};

export default VerifyPage;
