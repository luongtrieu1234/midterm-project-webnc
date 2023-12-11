// @ts-nocheck
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { Button } from 'primereact/button';
import { ScrollPanel } from 'primereact/scrollpanel';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';

const Main = () => {
  //Call API to get class list
  const [classList, setClassList] = useState([]);
  const toast = useRef(null);
  const showSuccess = () => {
    toast.current.show({
      severity: 'success',
      summary: 'Success',
      detail: 'Class created successfully!',
      life: 3000,
    });
  };
  const showError = () => {
    toast.current.show({
      severity: 'error',
      summary: 'Error',
      detail: 'Class created error',
      life: 3000,
    });
  };
  console.log(classList);
  useEffect(() => {
    const fetchClassList = async () => {
      try {
        const token = localStorage.getItem('token'); // replace 'token' with your actual key
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/class/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setClassList(response.data);
        } else {
          console.log('Error occurred while fetching class list');
        }
      } catch (error) {
        console.error('An error occurred while fetching the class list:', error);
      }
    };

    fetchClassList();
  }, []);

  //Add class
  const [visible, setVisible] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const addClass = async (data) => {
    try {
      const token = localStorage.getItem('token'); // replace 'token' with your actual key
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/class`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      // Handle successful response
      if (response.status === 201) {
        console.log(response);
        setVisible(false);
        reset();
        showSuccess();
      } else {
        showError();
      }
    } catch (error) {
      showError();
    }
  };

  const Action = (
    <div>
      <Button
        label='Cancel'
        icon='pi pi-times'
        onClick={() => setVisible(false)}
        className='p-button-text'
      />
      <Button label='Create' icon='pi pi-check' onClick={handleSubmit(addClass)} autoFocus />
    </div>
  );

  return (
    <div className='grid mb-5'>
      <Toast ref={toast} />
      <div className='card flex justify-content-center ml-6 mb-2'>
        <Button label='Create Class' icon='pi pi-plus' onClick={() => setVisible(true)} />
        <Dialog
          header='Create Class'
          visible={visible}
          style={{ width: '50vw' }}
          onHide={() => setVisible(false)}
          footer={Action}
        >
          <p className='mb-3'>Class Name</p>
          <Controller
            name='name'
            control={control}
            defaultValue=''
            rules={{ required: 'This field is required' }}
            render={({ field }) => <InputText {...field} style={{ width: '70%' }} />}
          />
          {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
        </Dialog>
      </div>
      <ScrollPanel style={{ width: '100%', height: '550px' }}>
        <div className='grid ml-3'>
          {classList.map((course) => (
            <div className='col-12 lg:col-4' key={course._id}>
              <div className='p-3 h-full'>
                <div
                  className='shadow-2 p-3 h-full flex flex-column'
                  style={{ borderRadius: '6px' }}
                >
                  <div className=''>
                    <div className='text-900 font-medium text-xl mb-2'>{course.name}</div>
                    <li className='flex align-items-center gap-2'>
                      <div className='text-600'>{course._id}</div>
                    </li>
                  </div>
                  <hr className='my-3 mx-0 border-top-1 border-bottom-none border-300' />
                  <div className='flex align-items-center'>
                    {/* <span className='font-bold text-2xl text-900'>${course.price}</span> */}
                    <span className='ml-2 font-medium text-600'>welcome to course</span>
                  </div>
                  <hr className='my-3 mx-0 border-top-1 border-bottom-none border-300' />
                  {/* <ul className='list-none p-0 m-0 flex-grow-1'>
                    {course.features.map((feature) => (
                      <li className='flex align-items-center mb-3' key={feature}>
                        <i className='pi pi-check-circle text-green-500 mr-2'></i>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul> */}
                  <hr className='mb-3 mx-0 border-top-1 border-bottom-none border-300 mt-auto' />
                  <Link to={`/course/${course._id}`}>
                    <Button label='Enter Class' className='p-3 w-full' />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollPanel>
    </div>
  );
};

export default Main;
