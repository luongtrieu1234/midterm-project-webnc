import avt from './avt.jpg';
import React from 'react';
import { Button } from 'primereact/button';
import { Chip } from 'primereact/chip';
function Body() {
  return (
    <div className='mx-auto my-4 px-6 py-5 shadow-4 border-round-md' style={{ maxWidth: '50%' }}>
      <div className='surface-section '>
        <div className='flex align-items-center justify-content-start'>
          <div className='mr-4'>
            <img src={avt} alt='' style={{ width: '10rem' }} />
          </div>
          <div>
            <div className='font-medium text-3xl text-900 mb-3'>User Name</div>
            <div className='text-500 mb-5'>Morbi tristique blandit turpis.</div>
          </div>
        </div>
        <ul className='list-none p-0 m-0'>
          <li className='flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap'>
            <div className='text-500 w-6 md:w-2 font-medium'>Full Name</div>
            <div className='text-900 w-full md:w-8 md:flex-order-0 flex-order-1'>My dog</div>
            <div className='w-6 md:w-2 flex justify-content-end'>
              <Button label='Edit' icon='pi pi-pencil' className='p-button-text' />
            </div>
          </li>
          <li className='flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap'>
            <div className='text-500 w-6 md:w-2 font-medium'>Gender</div>
            <div className='text-900 w-full md:w-8 md:flex-order-0 flex-order-1'>
              <Chip label='Male' className='mr-2' />
              <Chip label='Female' className='bg-white' />
            </div>
            <div className='w-6 md:w-2 flex justify-content-end'>
              <Button label='Edit' icon='pi pi-pencil' className='p-button-text' />
            </div>
          </li>
          <li className='flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap'>
            <div className='text-500 w-6 md:w-2 font-medium'>Email</div>
            <div className='text-900 w-full md:w-8 md:flex-order-0 flex-order-1'>
              Mydog@gmail.com
            </div>
            <div className='w-6 md:w-2 flex justify-content-end'>
              <Button label='Edit' icon='pi pi-pencil' className='p-button-text' />
            </div>
          </li>
          <li className='flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap'>
            <div className='text-500 w-6 md:w-2 font-medium'>Password</div>
            <div className='text-900 w-full md:w-8 md:flex-order-0 flex-order-1'>**********</div>
            <div className='w-6 md:w-2 flex justify-content-end'>
              <Button label='Edit' icon='pi pi-pencil' className='p-button-text' />
            </div>
          </li>
          <li className='flex align-items-center py-3 px-2 border-top-1 border-bottom-1 surface-border flex-wrap'>
            <div className='text-500 w-6 md:w-2 font-medium'>Description</div>
            <div className='text-900 w-full md:w-8 md:flex-order-0 flex-order-1 line-height-3'>
              I am the best dog in the world!
            </div>
            <div className='w-6 md:w-2 flex justify-content-end'>
              <Button label='Edit' icon='pi pi-pencil' className='p-button-text' />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Body;
