import avt from './avt.jpg';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Chip } from 'primereact/chip';
import InputText from 'components/InputText';
import { useForm } from 'react-hook-form';
import { updateUser, getUserInfo } from 'apis/users.api';
import { useMutation, useQuery } from 'react-query';
import { Toast } from 'primereact/toast';
function Body() {
  const toast = useRef(null);
  const show = (message, severity = 'success') => {
    toast.current.show({ severity, summary: message });
  };
  const { control, handleSubmit, setValue } = useForm();
  const { mutate } = useMutation(updateUser);
  const { data: userInfoData } = useQuery(['userInfoData'], getUserInfo);
  const userInfo = useMemo(() => userInfoData?.data, [userInfoData]);
  const [isEdit, setIsEdit] = useState(() => false);
  const [gender, setGender] = useState(() => '');
  const disabled = useMemo(() => !isEdit, [isEdit]);
  const onSubmit = (data) => {
    mutate(
      { ...data, gender },
      {
        onSuccess: () => {
          console.log('vo');
          setIsEdit(false);
          show('Update profile success');
        },
        onError: () => {
          show('Update profile fail');
        },
      }
    );
  };
  useEffect(() => {
    setValue('fullname', userInfo?.fullname);
    // setValue('email', userInfo?.email);
    setValue('phone', userInfo?.phone);
    setValue('dob', userInfo?.dob);
    setGender(userInfo?.gender);
    setValue('studentId', userInfo?.studentId);
  }, [userInfo]);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='mx-auto my-4 px-6 py-5 shadow-4 border-round-md'
      style={{ maxWidth: '50%' }}
    >
      <Toast ref={toast} />
      <div className='surface-section '>
        <div className='flex align-items-center justify-content-start'>
          <div className='mr-4'>
            <img src={avt} alt='' style={{ width: '10rem' }} />
          </div>
          <div>
            <div className='font-medium text-3xl text-900 mb-3'>{userInfo?.email}</div>
            <div className='text-500 mb-5'>Morbi tristique blandit turpis.</div>
          </div>
        </div>
        <ul className='list-none p-0 m-0'>
          <li className='flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap'>
            <div className='text-500 w-6 md:w-2 font-medium'>Full Name</div>
            <div className='text-900 w-full md:w-8 md:flex-order-0 flex-order-1'>
              <InputText name='fullname' control={control} disabled={disabled} />
            </div>
          </li>
          <li className='flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap'>
            <div className='text-500 w-6 md:w-2 font-medium'>Gender</div>
            <div className='text-900 w-full md:w-8 md:flex-order-0 flex-order-1'>
              <Chip
                label='Male'
                onClick={() => setGender('male')}
                className={`${gender !== 'male' && 'bg-white'}  mr-2`}
              />
              <Chip
                label='Female'
                onClick={() => setGender('female')}
                className={`${gender !== 'female' && 'bg-white'}  mr-2`}
              />
            </div>
          </li>
          {/* <li className='flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap'>
            <div className='text-500 w-6 md:w-2 font-medium'>Email</div>
            <div className='text-900 w-full md:w-8 md:flex-order-0 flex-order-1'>
              <InputText name='email' control={control} disabled={disabled} />
            </div>
          </li> */}
          <li className='flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap'>
            <div className='text-500 w-6 md:w-2 font-medium'>Phone Number</div>
            <div className='text-900 w-full md:w-8 md:flex-order-0 flex-order-1'>
              <InputText name='phone' control={control} disabled={disabled} />
            </div>
          </li>
          <li className='flex align-items-center py-3 px-2 border-top-1 border-bottom-1 surface-border flex-wrap'>
            <div className='text-500 w-6 md:w-2 font-medium'>Date of birth</div>
            <div className='text-900 w-full md:w-8 md:flex-order-0 flex-order-1 line-height-3'>
              <InputText name='dob' control={control} disabled={disabled} />
            </div>
          </li>
          <li className='flex align-items-center py-3 px-2 border-top-1 border-bottom-1 surface-border flex-wrap'>
            <div className='text-500 w-6 md:w-2 font-medium'>Member ID</div>
            <div className='text-900 w-full md:w-8 md:flex-order-0 flex-order-1 line-height-3'>
              <InputText name='studentId' control={control} disabled={disabled} />
            </div>
          </li>
        </ul>
        <div className='flex justify-content-end mt-2 gap-2'>
          <div className='md:w-2 flex justify-content-end '>
            <Button
              onClick={() => setIsEdit(true)}
              label='Edit'
              type='button'
              icon='pi pi-pencil'
              className='p-button-text bg-primary '
            />
          </div>
          <div className='md:w-2 flex justify-content-end'>
            <Button
              label='Save'
              type='submit'
              icon='pi pi-save'
              className='p-button-text bg-primary '
            />
          </div>
        </div>
      </div>
    </form>
  );
}

export default Body;
