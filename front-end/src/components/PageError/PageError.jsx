import React from 'react';

import './PageError.css';
import { Link } from 'react-router-dom';

const PageError = () => {
  return (
    <div>
      <div id='notfound'>
        <div className='notfound '>
          <div className='notfound-404'>
            <h1>
              4<span>0</span>4
            </h1>
          </div>
          <h2>the page you requested could not found</h2>
          <Link to='/' className='link-style'>
            {' '}
            Go back to home page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageError;
