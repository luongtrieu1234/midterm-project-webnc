import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';

function ResetPassword() {
  const toast = useRef(null);
  const showSuccess = () => {
    toast.current.show({
      severity: 'success',
      summary: 'Success',
      detail: 'Please check your email',
      life: 5000,
    });
  };
  const showError = () => {
    toast.current.show({
      severity: 'error',
      summary: 'Error',
      detail: 'Email is incorrect',
      life: 5000,
    });
  };
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [passwordConfirmed, setPasswordConfirmed] = useState('');
  const [message, setMessage] = useState('');
  console.log(message);

  const handleChangePassword = async () => {
    if (password !== passwordConfirmed) {
      setMessage('Passwords do not match');
      console.log('Passwords do not match');
      return;
    }
    console.log('Passwords match');
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/reset`,
        {
          password,
          passwordConfirmed,
        }
      );
      setMessage('Password has been reset');
      if (response.data.statusCode === 200) {
        console.log('Password has been reset');
        showSuccess();
        setTimeout(() => {
          navigate('/sign-in');
        }, 2000);
      } else {
        console.log('Password has not been reset');
        showError();
      }
    } catch (error) {
      setMessage('Error resetting password');
      showError();
    }
  };
  return (
    <div className='mt-8'>
      <Toast ref={toast} />
      <div className='flex align-items-center justify-content-center'>
        <div className='surface-card p-4 shadow-2 border-round w-full lg:w-6'>
          <div className='mb-5'>
            <div className='text-center text-900 text-3xl font-medium mb-3'>
              Change New Password
            </div>
          </div>

          <div>
            <label
              htmlFor='password'
              className='block text-900 font-medium mb-2'
            >
              New Password
            </label>
            <InputText
              id='password'
              type='password'
              placeholder='Password'
              className='w-full mb-3'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <label
              htmlFor='password'
              className='block text-900 font-medium mb-2'
            >
              Confirm Password
            </label>
            <InputText
              id='passwordConfirmed'
              type='password'
              placeholder='Confirm Password'
              className='w-full mb-3'
              value={passwordConfirmed}
              onChange={(e) => setPasswordConfirmed(e.target.value)}
            />

            <div className='flex align-items-center justify-content-end mr-4'>
              <Button
                label='Change'
                className='w-2'
                onClick={handleChangePassword}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
