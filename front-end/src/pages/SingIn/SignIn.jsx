/* eslint-disable no-undef */
/* eslint-disable react/style-prop-object */
import React from 'react';
import { useState } from 'react';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { Link } from 'react-router-dom';

const SignIn = () => {
  // Logic
  const [checked, setChecked] = useState(false);
  // End Logic

  return (
    <div>
      <div
        className='flex align-items-center justify-content-center mt-10 fixed top-0 bottom-0 left-0 right-0'
        style={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
      >
        <div className='surface-card p-4 shadow-2 border-round w-full lg:w-6'>
          <div className='text-center mb-5'>
            <i
              className='pi pi-user mb-3'
              style={{ fontSize: '2.5rem', color: 'var(--primary-color)' }}
            ></i>
            <div className='text-900 text-3xl font-medium mb-3'>Sign In</div>
          </div>

          <div>
            <label htmlFor='email' className='block text-900 font-medium mb-2'>
              Email
            </label>
            <InputText id='email' type='text' placeholder='Email address' className='w-full mb-3' />

            <label htmlFor='password' className='block text-900 font-medium mb-2'>
              Password
            </label>
            <InputText
              id='password'
              type='password'
              placeholder='Password'
              className='w-full mb-3'
            />

            <div className='flex align-items-center justify-content-between mb-6'>
              <div className='flex align-items-center'>
                <Checkbox
                  id='rememberme'
                  onChange={(e) => setChecked(e.checked)}
                  checked={checked}
                  className='mr-2'
                />
                <label htmlFor='rememberme'>Remember me</label>
              </div>
              <a className='font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer'>
                Forgot your password?
              </a>
            </div>

            <Button label='Sign In' icon='pi pi-user' className='w-full' />

            <div className='text-center mt-5'>
              <span className='text-600 font-medium line-height-3'>Don't have an account?</span>
              <Link
                to='/sign-up'
                className='font-medium no-underline ml-2 text-blue-500 cursor-pointer'
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
