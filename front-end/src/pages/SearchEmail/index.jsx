import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';

function SearchEmail() {
  const [email, setEmail] = useState('');
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
  const handleNextClick = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/reset-request`, {
        email,
      });
      console.log('response: ', response.data);
      if (response.data.status === 200) {
        showSuccess();
      } else {
        console.log('error: ', response.data.message);
        showError();
      }
    } catch (error) {
      console.error(error);
      showError();
    }
  };
  return (
    <div className='mt-8'>
      <div className='flex align-items-center justify-content-center'>
        <div className='surface-card p-4 shadow-2 border-round w-full lg:w-6'>
          <div className='mb-5'>
            <div className='text-center text-900 text-3xl font-medium mb-3'>Find your account</div>
            <span className='text-900 text-xl'>Please enter your email</span>
          </div>

          <div>
            <label htmlFor='email' className='block text-900 font-medium mb-2'>
              Email
            </label>
            <InputText
              id='email'
              type='text'
              placeholder='Email address'
              className='w-full mb-4'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className='flex align-items-center justify-content-end mr-4'>
              <Button label='Next' className='w-2' onClick={handleNextClick} />
            </div>
            <Toast ref={toast} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchEmail;
