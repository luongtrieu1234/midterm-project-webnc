/* eslint-disable react/prop-types */
import React from 'react';
import ReactLoading from 'react-loading';

// eslint-disable-next-line no-unused-vars
const Loading = ({ type, color }) => (
  <ReactLoading
    className='fixed top-0 bottom-0 left-0 right-0'
    type={'spokes'}
    color={'#00CC00'}
    height={'6%'}
    width={'6%'}
  />
);

export default Loading;
