import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Button } from 'primereact/button';
import { ScrollPanel } from 'primereact/scrollpanel';

const Main = () => {
  const [classList, setClassList] = useState([]);
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

  return (
    <div className='grid mb-5'>
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
                      <i
                        className='pi pi-stopwatch'
                        style={{ fontSize: '1rem', color: '#0000CD' }}
                      ></i>
                      <div className='text-600'>{course._id}</div>
                    </li>
                  </div>
                  <hr className='my-3 mx-0 border-top-1 border-bottom-none border-300' />
                  <div className='flex align-items-center'>
                    {/* <span className='font-bold text-2xl text-900'>${course.price}</span> */}
                    <span className='ml-2 font-medium text-600'>per month</span>
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
                  <Button label='Enter Class' className='p-3 w-full' />
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
