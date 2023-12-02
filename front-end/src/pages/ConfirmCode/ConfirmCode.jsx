import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';

function ConfirmCode() {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const toast = useRef(null);
  const showSuccess = () => {
    toast.current.show({
      severity: 'success',
      summary: 'Success',
      detail: 'Confirm Code Success',
      life: 5000,
    });
  };
  const showError = () => {
    toast.current.show({
      severity: 'error',
      summary: 'Error',
      detail: 'confirm code error',
      life: 5000,
    });
  };
  const handleEnterClick = async () => {
    try {
      const response = await axios.post('http://localhost:5000/users/confirm-code', {
        code,
      });
      console.log('response: ', response.data);
      if (response.data.statusCode === 200) {
        showSuccess();
        setTimeout(() => {
          navigate('/reset-password');
        }, 4000);
      } else {
        console.log('error: ', response.data.message);
        showError();
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className='mt-8'>
      <div className='flex align-items-center justify-content-center'>
        <div className='surface-card p-4 shadow-2 border-round w-full lg:w-6'>
          <div className='mb-5'>
            <div className='text-center text-900 text-3xl font-medium mb-3'>Confirm Code</div>
            <span className='text-900 text-xl'>Please enter the code sent to your email</span>
          </div>

          <div>
            <label htmlFor='email' className='block text-900 font-medium mb-2'>
              Code
            </label>
            <InputText
              id='code'
              type='text'
              placeholder='Enter Code'
              className='w-full mb-4'
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />

            <div className='flex align-items-center justify-content-end mr-4'>
              <Button label='Enter' className='w-2' onClick={handleEnterClick} />
            </div>
            <Toast ref={toast} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmCode;
