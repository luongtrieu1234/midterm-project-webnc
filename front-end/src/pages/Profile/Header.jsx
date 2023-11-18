import React from 'react';
import avt from './avt.jpg';

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
          <Link to='/'>
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
        <div className='card flex flex-wrap align-items-center justify-content-center gap-5 ml-8'>
          <Link to='/me'>
            <div>
              <img src={avt} alt='' className='w-3rem border-circle' />
            </div>
          </Link>
          <Link to='/sign-up'>
            <Button label='Sign Out' outlined />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
