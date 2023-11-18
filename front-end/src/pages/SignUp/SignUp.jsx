import React, { useRef, useState } from 'react';

import { useForm, Controller } from 'react-hook-form';

import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios'; // Import Axios library

import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
// import Loading from '../../components/Loading';

const SignUp = () => {
  const navigate = useNavigate();

  // Logic
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);

  const toast = useRef(null);

  const show = (message, severity = 'success') => {
    toast.current.show({ severity, summary: message });
  };

  const defaultValues = {
    fullname: '',
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
      const response = await axios.post('http://localhost:5000/users/signup', {
        fullname: data.fullname,
        email: data.email,
        password: data.password,
      });
      setLoading(false); // Start loading state

      if (response.status === 200 || response.status === 201) {
        show('Form submitted successfully', 'success');
        console.log('success');
        // Redirect to signin page
        navigate('/sign-in');
        reset();
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
  // End Logic
  // if (loading) {
  //   return <Loading />;
  // }

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
            <div className='text-900 text-3xl font-medium mb-3'>Sign Up Account</div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-column gap-2'>
            <Toast ref={toast} />

            {/* Full name */}
            <label htmlFor='fullname' className='block text-900 font-medium'>
              Full Name
            </label>
            <Controller
              name='fullname'
              control={control}
              rules={{ required: 'Full name is required.' }}
              render={({ field, fieldState }) => (
                <>
                  <label
                    htmlFor={field.name}
                    className={classNames({ 'p-error': errors.value })}
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
              <Button label='Sign Up' icon='pi pi-user' type='submit' className='w-full mt-5' />
              <div className='text-center mt-5'>
                <span className='text-600 font-medium line-height-3'>Do have an account?</span>
                <Link
                  to='/sign-in'
                  className='font-medium no-underline ml-2 text-blue-500 cursor-pointer'
                >
                  Sign In
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
