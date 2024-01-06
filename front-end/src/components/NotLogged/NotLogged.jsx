import React from 'react';

import './NotLogged.css';
import { Link } from 'react-router-dom';

const NotLogged = () => {
  return (
    <div>
      <div id='notlogged'>
        <div className='notlogged '>
          <div className='notlogged-403'>
            <h1>
              4<span>0</span>3
            </h1>
          </div>
          <h2>
            You are not logged in, please log in before entering this page!
          </h2>
          <Link to='/sign-in' className='link-style'>
            {' '}
            Go to sign-in page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotLogged;
