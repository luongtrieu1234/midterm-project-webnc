import React, { useEffect, useState } from 'react';
import avt from './avt.jpg';
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';
import { Link } from 'react-router-dom';

export default function Header() {
  // Logic
  // State to store the retrieved data
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Retrieve data from local storage on component mount
    const token = localStorage.getItem('token');

    // Update state with the retrieved data
    setToken(token);
  }, []);
  // End Logic

  return (
    <div>
      <div className='card flex flex-wrap justify-content-center mt-5 gap-8 text-gray'>
        <div className='card flex flex-wrap justify-content-center gap-3 ml-6'>
          <i className='pi pi-qrcode' style={{ fontSize: '2.5rem', color: '#0000CD' }}></i>
        </div>
        <div className='card flex flex-wrap justify-content-center gap-3 ml-8 '>
          <Link to={token ? '/home-page' : '/'}>
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
        {token ? (
          <div className='card flex flex-wrap align-items-center justify-content-center gap-5 ml-8'>
            <Link to='/me'>
              <div>
                <img src={avt} alt='' className='w-3rem border-circle' />
              </div>
            </Link>
            <Link to='/'>
              <Button label='Sign Out' outlined onClick={() => localStorage.removeItem('token')} />
            </Link>
          </div>
        ) : (
          <div className='card flex flex-wrap justify-content-center gap-5 ml-8'>
            <Link to='/sign-up'>
              <Button label='Sign Up' outlined />
            </Link>
            <Link to='/sign-in'>
              <Button label='Sign In' raised />
            </Link>
          </div>
        )}
      </div>
      <hr className='mx-0 border-left-1 border-bottom-none border-200' />
    </div>
  );
}
