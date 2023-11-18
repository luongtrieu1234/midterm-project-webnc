import React from 'react';

import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';
import { Link } from 'react-router-dom';

const Header = () => {
  // Logic

  // End Logic

  return (
    <div>
      <div className='card flex flex-wrap justify-content-center mt-5 gap-8 text-gray'>
        <div className='card flex flex-wrap justify-content-center gap-3 ml-6'>
          <i className='pi pi-qrcode' style={{ fontSize: '2.5rem', color: '#0000CD' }}></i>
        </div>
        <div className='card flex flex-wrap justify-content-center gap-3 ml-8 '>
          <Link to='/home-page'>
            <Button label='Home' link />
          </Link>
          <Link to='/'>
            <Button label='About' link />
          </Link>
          <Link to='/'>
            <Button label='Course' link />
          </Link>
          <Link to='/'>
            <Button label='Blog' link />
          </Link>
          <Link to='/'>
            <Button label='Contact' link />
          </Link>
        </div>
        <div className='card flex flex-wrap justify-content-center gap-5 ml-8'>
          <Link to='/sign-up'>
            <Button label='Sign Up' outlined />
          </Link>
          <Link to='/sign-in'>
            <Button label='Sign In' raised />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
