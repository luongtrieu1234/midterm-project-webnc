import React, { useRef, useState } from 'react';

import { useForm, Controller } from 'react-hook-form';

import { Link } from 'react-router-dom';

import axios from 'axios';

import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import Google from '../Google/Google';
import { ButtonLoginFacebook } from './conponents';

const SignIn = () => {
  // Logic
  const [checked, setChecked] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);

  const toast = useRef(null);

  const show = (message, severity = 'success') => {
    toast.current.show({ severity, summary: message });
  };

  const defaultValues = {
    email: '',
    password: '',
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });

  const onSubmit = async (data) => {
    setLoading(true); // Start loading state
    try {
      // eslint-disable-next-line no-undef
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/login`, {
        email: data.email,
        password: data.password,
      });
      setLoading(false); // Start loading state

      if (response.status === 200) {
        show('Form submitted successfully', 'success');
        console.log('success');

        const token = response?.data.jwt; // Assuming the token is returned in response.data.jwt
        // Save token to localStorage
        localStorage.setItem('token', token);

        // Redirect to signin page
        setTimeout(() => {
          window.location.href = '/home-page';
          reset();
        }, 4000);
      } else {
        show('Form submission failed', 'error');
        console.log('no success');
      }
    } catch (error) {
      show('Form submission failed', 'error');
      console.log('no success catch');
    }
  };

  const getFormErrorMessage = (name) => {
    return errors[name] ? (
      <small className='p-error'>{errors[name].message}</small>
    ) : (
      <small className='p-error'>&nbsp;</small>
    );
  };

  return (
    <div>
      <div
        className='flex align-items-center justify-content-center mt-10 fixed top-0 bottom-0 left-0 right-0'
        style={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
      >
        <div className='surface-card p-4 shadow-2 border-round w-full lg:w-6'>
          <div className='text-center mb-3'>
            <i
              className='pi pi-user mb-3'
              style={{ fontSize: '2.5rem', color: 'var(--primary-color)' }}
            ></i>
            <div className='text-900 text-3xl font-medium mb-2'>Sign In</div>
          </div>
          {/* <div className='text-center mb-5'>
            <Google />
          </div> */}

          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-column gap-2'>
            <Toast ref={toast} />

            {/* Email */}
            <label htmlFor='fullname' className='block text-900 font-medium'>
              Email
            </label>
            <Controller
              name='email'
              control={control}
              rules={{ required: 'Email is required.', pattern: /^\S+@\S+$/i }}
              render={({ field, fieldState }) => (
                <>
                  <label
                    htmlFor={field.name}
                    className={classNames({ 'p-error': errors.email })}
                  ></label>
                  <span className='p-float-label'>
                    <InputText
                      id={field.name}
                      value={field.value}
                      className={classNames({ 'p-invalid': fieldState.error }, 'w-full')}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </span>
                  {getFormErrorMessage(field.name)}
                </>
              )}
            />

            {/* Password */}
            <label htmlFor='fullname' className='block text-900 font-medium'>
              Password
            </label>
            <Controller
              name='password'
              control={control}
              rules={{ required: 'Password is required.', minLength: 6 }}
              render={({ field, fieldState }) => (
                <>
                  <label
                    htmlFor={field.name}
                    className={classNames({ 'p-error': errors.password })}
                  ></label>
                  <span className='p-float-label'>
                    <InputText
                      id={field.name}
                      value={field.value}
                      type='password'
                      className={classNames({ 'p-invalid': fieldState.error }, 'w-full')}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </span>
                  {getFormErrorMessage(field.name)}
                </>
              )}
            />
            <div>
              <div className='flex align-items-center justify-content-between mb-3'>
                <div className='flex align-items-center'>
                  <Checkbox
                    id='rememberme'
                    onChange={(e) => setChecked(e.checked)}
                    checked={checked}
                    className='mr-2'
                  />
                  <label htmlFor='rememberme'>Remember me</label>
                </div>
                <Link
                  to='/search-email'
                  className='font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer'
                >
                  Forgot your password?
                </Link>
              </div>

              <Button label='Sign In' icon='pi pi-user' type='submit' className='w-full' />

              <div className='text-center mt-3'>
                <span className='text-600 font-medium line-height-3'>Don't have an account?</span>
                <Link
                  to='/sign-up'
                  className='font-medium no-underline ml-2 text-blue-500 cursor-pointer'
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </form>
          <hr className='mx-2 border-left-1 border-bottom-none border-100 mt-3' />
          <div className='text-center mt-3 mb-5'>
            <div className='my-2'>Or login with</div>
            <div className='flex justify-content-center align-items-center mt-3 gap-3'>
              <ButtonLoginFacebook></ButtonLoginFacebook>
              <Google />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
