import React, { useRef, useState } from 'react';

import { useForm } from 'react-hook-form';
// import { useLocation, useHistory } from 'react-router-dom';

// import { Link } from 'react-router-dom';

// import axios from 'axios'; // Import Axios library

import { Button } from 'primereact/button';
// import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
// import { InputText } from 'primereact/inputtext';
// import { Checkbox } from 'primereact/checkbox';
// import Loading from '../../components/Loading';

const Google = () => {
  // Logic
  // const [checked, setChecked] = useState(false);

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

  const {
    // control,
    // formState: { errors },
    handleSubmit,
    // reset,
  } = useForm({ defaultValues });

  const onSubmit = async () => {
    setLoading(true); // Start loading state
    try {
      window.open('http://localhost:5000/users/google/', '_self', 'width=600,height=600');
      // const response = await axios.get('http://localhost:5000/users/google', {
      //   withCredentials: true,
      // });
      // setLoading(false)

      // if (response.status === 200) {
      //   show('Form submitted successfully', 'success');
      //   console.log('success');

      //   const token = response?.data.jwt; // Assuming the token is returned in response.data.jwt

      //   // Save token to localStorage
      //   localStorage.setItem('token', token);

      // Redirect to signin page
      // window.location.href = '/home-page';
      //   reset();
      // } else {
      //   show('Form submission failed', 'error');
      //   console.log('no success');
      // }
    } catch (error) {
      show('Form submission failed', 'error');
      console.log('no success catch', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-column gap-2'>
      <Toast ref={toast} />
      <div>
        <Button label='Login with Google' icon='pi pi-user' type='submit' className='w-full' />
      </div>
    </form>
  );
};

export default Google;
