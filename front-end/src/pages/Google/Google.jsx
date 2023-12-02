import React, { useRef, useState } from 'react';

import { useForm } from 'react-hook-form';
// import { useLocation, useHistory } from 'react-router-dom';

// import { Link } from 'react-router-dom';

import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

const Google = () => {
  // Logic
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  // const [token, setToken] = useState('');
  const searchParams = new URLSearchParams(window.location.search);
  const jwt = searchParams.get('jwt');
  console.log('check jwt ', jwt);
  if (jwt) {
    // show('Form submitted successfully', 'success');
    console.log('success');
    // Save token to localStorage
    localStorage.setItem('token', jwt);
    // Redirect to signin page
    window.location.href = '/home-page';
  }
  // setToken(jwt);
  const toast = useRef(null);

  const show = (message, severity = 'success') => {
    toast.current.show({ severity, summary: message });
  };

  const defaultValues = {
    email: '',
    password: '',
  };

  const { handleSubmit } = useForm({ defaultValues });

  const onSubmit = async () => {
    setLoading(true); // Start loading state
    try {
      window.open(`${process.env.REACT_APP_API_URL}/users/google`, '_self', 'width=600,height=600');
    } catch (error) {
      show('Form submission failed', 'error');
      console.log('no success catch', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-column gap-2'>
      <Toast ref={toast} />
      <div>
        <Button
          label='Google'
          icon='pi pi-google'
          type='submit'
          style={{ minWidth: '10rem', backgroundColor: '#D0463B' }}
          className='w-full'
          severity='warning'
        />
      </div>
    </form>
  );
};

export default Google;
