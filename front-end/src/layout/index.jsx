import PropTypes from 'prop-types';
import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
  return (
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      <Header />
      <div className='flex'>
        <div className='flex justify-content-center font-bold m-2 px-4 py-2 w-3'>
          <Sidebar />
        </div>
        <hr className='mx-0 border-left-1 border-bottom-none border-200' />
        <div className='flex font-bold px-5 border-round w-full'>{children}</div>
      </div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};
