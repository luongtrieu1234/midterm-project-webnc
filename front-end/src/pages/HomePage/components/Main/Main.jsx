import React from 'react';

import { Button } from 'primereact/button';
import { ScrollPanel } from 'primereact/scrollpanel';

const Main = () => {
  return (
    <div className='grid mb-5'>
      <ScrollPanel style={{ width: '100%', height: '550px' }}>
        <div className='grid ml-3'>
          <div className='col-12 lg:col-4'>
            <div className='p-3 h-full'>
              <div
                className='shadow-2 p-3 h-full flex flex-column '
                style={{ borderRadius: '6px' }}
              >
                <div className=''>
                  <div className='text-900 font-medium text-xl mb-2 '>Java Core</div>
                  <li className='flex align-items-center gap-2'>
                    <i
                      className='pi pi-stopwatch'
                      style={{ fontSize: '1rem', color: '#0000CD' }}
                    ></i>
                    <div className='text-600'>8h 34m</div>
                  </li>
                </div>
                <hr className='my-3 mx-0 border-top-1 border-bottom-none border-300' />
                <div className='flex align-items-center'>
                  <span className='font-bold text-2xl text-900'>$10</span>
                  <span className='ml-2 font-medium text-600'>per month</span>
                </div>
                <hr className='my-3 mx-0 border-top-1 border-bottom-none border-300' />
                <ul className='list-none p-0 m-0 flex-grow-1'>
                  <li className='flex align-items-center mb-3'>
                    <i className='pi pi-check-circle text-green-500 mr-2'></i>
                    <span>Learn basic java core</span>
                  </li>
                  <li className='flex align-items-center mb-3'>
                    <i className='pi pi-check-circle text-green-500 mr-2'></i>
                    <span>Write restfull API</span>
                  </li>
                </ul>
                <hr className='mb-3 mx-0 border-top-1 border-bottom-none border-300 mt-auto' />
                <Button label='Buy Now' className='p-3 w-full' />
              </div>
            </div>
          </div>

          <div className='col-12 lg:col-4'>
            <div className='p-3 h-full'>
              <div className='shadow-2 p-3 h-full flex flex-column' style={{ borderRadius: '6px' }}>
                <div className='text-900 font-medium text-xl mb-2'>Front-End Developer</div>
                <li className='flex align-items-center gap-2'>
                  <i className='pi pi-stopwatch' style={{ fontSize: '1rem', color: '#0000CD' }}></i>
                  <div className='text-600'>23h 34m</div>
                </li>
                <hr className='my-3 mx-0 border-top-1 border-bottom-none border-300' />
                <div className='flex align-items-center'>
                  <span className='font-bold text-2xl text-900'>$29</span>
                  <span className='ml-2 font-medium text-600'>per month</span>
                </div>
                <hr className='my-3 mx-0 border-top-1 border-bottom-none border-300' />
                <ul className='list-none p-0 m-0 flex-grow-1'>
                  <li className='flex align-items-center mb-3'>
                    <i className='pi pi-check-circle text-green-500 mr-2'></i>
                    <span>Learn HTML and CSS</span>
                  </li>
                  <li className='flex align-items-center mb-3'>
                    <i className='pi pi-check-circle text-green-500 mr-2'></i>
                    <span>Basic javascript </span>
                  </li>
                </ul>
                <hr className='mb-3 mx-0 border-top-1 border-bottom-none border-300' />
                <Button label='Buy Now' className='p-3 w-full' />
              </div>
            </div>
          </div>

          <div className='col-12 lg:col-4'>
            <div className='p-3 h-full'>
              <div className='shadow-2 p-3 flex flex-column' style={{ borderRadius: '6px' }}>
                <div className='text-900 font-medium text-xl mb-2'>Back-End Developer</div>
                <li className='flex align-items-center gap-2'>
                  <i className='pi pi-stopwatch' style={{ fontSize: '1rem', color: '#0000CD' }}></i>
                  <div className='text-600'>20h 34m</div>
                </li>
                <hr className='my-3 mx-0 border-top-1 border-bottom-none border-300' />
                <div className='flex align-items-center'>
                  <span className='font-bold text-2xl text-900'>$49</span>
                  <span className='ml-2 font-medium text-600'>per month</span>
                </div>
                <hr className='my-3 mx-0 border-top-1 border-bottom-none border-300' />
                <ul className='list-none p-0 m-0 flex-grow-1'>
                  <li className='flex align-items-center mb-3'>
                    <i className='pi pi-check-circle text-green-500 mr-2'></i>
                    <span>Learn basic typescript</span>
                  </li>
                  <li className='flex align-items-center mb-3'>
                    <i className='pi pi-check-circle text-green-500 mr-2'></i>
                    <span>SQL database and no SQL</span>
                  </li>
                </ul>
                <hr className='mb-3 mx-0 border-top-1 border-bottom-none border-300' />
                <Button label='Buy Now' className='p-3 w-full ' />
              </div>
            </div>
          </div>
        </div>

        <div className='grid ml-3'>
          <div className='col-12 lg:col-4'>
            <div className='p-3 h-full'>
              <div
                className='shadow-2 p-3 h-full flex flex-column '
                style={{ borderRadius: '6px' }}
              >
                <div className=''>
                  <div className='text-900 font-medium text-xl mb-2 '>Java Core</div>
                  <li className='flex align-items-center gap-2'>
                    <i
                      className='pi pi-stopwatch'
                      style={{ fontSize: '1rem', color: '#0000CD' }}
                    ></i>
                    <div className='text-600'>8h 34m</div>
                  </li>
                </div>
                <hr className='my-3 mx-0 border-top-1 border-bottom-none border-300' />
                <div className='flex align-items-center'>
                  <span className='font-bold text-2xl text-900'>$10</span>
                  <span className='ml-2 font-medium text-600'>per month</span>
                </div>
                <hr className='my-3 mx-0 border-top-1 border-bottom-none border-300' />
                <ul className='list-none p-0 m-0 flex-grow-1'>
                  <li className='flex align-items-center mb-3'>
                    <i className='pi pi-check-circle text-green-500 mr-2'></i>
                    <span>Learn basic java core</span>
                  </li>
                  <li className='flex align-items-center mb-3'>
                    <i className='pi pi-check-circle text-green-500 mr-2'></i>
                    <span>Write restfull API</span>
                  </li>
                </ul>
                <hr className='mb-3 mx-0 border-top-1 border-bottom-none border-300 mt-auto' />
                <Button label='Buy Now' className='p-3 w-full' />
              </div>
            </div>
          </div>

          <div className='col-12 lg:col-4'>
            <div className='p-3 h-full'>
              <div className='shadow-2 p-3 h-full flex flex-column' style={{ borderRadius: '6px' }}>
                <div className='text-900 font-medium text-xl mb-2'>Front-End Developer</div>
                <li className='flex align-items-center gap-2'>
                  <i className='pi pi-stopwatch' style={{ fontSize: '1rem', color: '#0000CD' }}></i>
                  <div className='text-600'>23h 34m</div>
                </li>
                <hr className='my-3 mx-0 border-top-1 border-bottom-none border-300' />
                <div className='flex align-items-center'>
                  <span className='font-bold text-2xl text-900'>$29</span>
                  <span className='ml-2 font-medium text-600'>per month</span>
                </div>
                <hr className='my-3 mx-0 border-top-1 border-bottom-none border-300' />
                <ul className='list-none p-0 m-0 flex-grow-1'>
                  <li className='flex align-items-center mb-3'>
                    <i className='pi pi-check-circle text-green-500 mr-2'></i>
                    <span>Learn HTML and CSS</span>
                  </li>
                  <li className='flex align-items-center mb-3'>
                    <i className='pi pi-check-circle text-green-500 mr-2'></i>
                    <span>Basic javascript </span>
                  </li>
                </ul>
                <hr className='mb-3 mx-0 border-top-1 border-bottom-none border-300' />
                <Button label='Buy Now' className='p-3 w-full' />
              </div>
            </div>
          </div>

          <div className='col-12 lg:col-4'>
            <div className='p-3 h-full'>
              <div className='shadow-2 p-3 flex flex-column' style={{ borderRadius: '6px' }}>
                <div className='text-900 font-medium text-xl mb-2'>Back-End Developer</div>
                <li className='flex align-items-center gap-2'>
                  <i className='pi pi-stopwatch' style={{ fontSize: '1rem', color: '#0000CD' }}></i>
                  <div className='text-600'>20h 34m</div>
                </li>
                <hr className='my-3 mx-0 border-top-1 border-bottom-none border-300' />
                <div className='flex align-items-center'>
                  <span className='font-bold text-2xl text-900'>$49</span>
                  <span className='ml-2 font-medium text-600'>per month</span>
                </div>
                <hr className='my-3 mx-0 border-top-1 border-bottom-none border-300' />
                <ul className='list-none p-0 m-0 flex-grow-1'>
                  <li className='flex align-items-center mb-3'>
                    <i className='pi pi-check-circle text-green-500 mr-2'></i>
                    <span>Learn basic typescript</span>
                  </li>
                  <li className='flex align-items-center mb-3'>
                    <i className='pi pi-check-circle text-green-500 mr-2'></i>
                    <span>SQL database and no SQL</span>
                  </li>
                </ul>
                <hr className='mb-3 mx-0 border-top-1 border-bottom-none border-300' />
                <Button label='Buy Now' className='p-3 w-full ' />
              </div>
            </div>
          </div>
        </div>

        <div className='grid ml-3'>
          <div className='col-12 lg:col-4'>
            <div className='p-3 h-full'>
              <div
                className='shadow-2 p-3 h-full flex flex-column '
                style={{ borderRadius: '6px' }}
              >
                <div className=''>
                  <div className='text-900 font-medium text-xl mb-2 '>Java Core</div>
                  <li className='flex align-items-center gap-2'>
                    <i
                      className='pi pi-stopwatch'
                      style={{ fontSize: '1rem', color: '#0000CD' }}
                    ></i>
                    <div className='text-600'>8h 34m</div>
                  </li>
                </div>
                <hr className='my-3 mx-0 border-top-1 border-bottom-none border-300' />
                <div className='flex align-items-center'>
                  <span className='font-bold text-2xl text-900'>$10</span>
                  <span className='ml-2 font-medium text-600'>per month</span>
                </div>
                <hr className='my-3 mx-0 border-top-1 border-bottom-none border-300' />
                <ul className='list-none p-0 m-0 flex-grow-1'>
                  <li className='flex align-items-center mb-3'>
                    <i className='pi pi-check-circle text-green-500 mr-2'></i>
                    <span>Learn basic java core</span>
                  </li>
                  <li className='flex align-items-center mb-3'>
                    <i className='pi pi-check-circle text-green-500 mr-2'></i>
                    <span>Write restfull API</span>
                  </li>
                </ul>
                <hr className='mb-3 mx-0 border-top-1 border-bottom-none border-300 mt-auto' />
                <Button label='Buy Now' className='p-3 w-full' />
              </div>
            </div>
          </div>

          <div className='col-12 lg:col-4'>
            <div className='p-3 h-full'>
              <div className='shadow-2 p-3 h-full flex flex-column' style={{ borderRadius: '6px' }}>
                <div className='text-900 font-medium text-xl mb-2'>Front-End Developer</div>
                <li className='flex align-items-center gap-2'>
                  <i className='pi pi-stopwatch' style={{ fontSize: '1rem', color: '#0000CD' }}></i>
                  <div className='text-600'>23h 34m</div>
                </li>
                <hr className='my-3 mx-0 border-top-1 border-bottom-none border-300' />
                <div className='flex align-items-center'>
                  <span className='font-bold text-2xl text-900'>$29</span>
                  <span className='ml-2 font-medium text-600'>per month</span>
                </div>
                <hr className='my-3 mx-0 border-top-1 border-bottom-none border-300' />
                <ul className='list-none p-0 m-0 flex-grow-1'>
                  <li className='flex align-items-center mb-3'>
                    <i className='pi pi-check-circle text-green-500 mr-2'></i>
                    <span>Learn HTML and CSS</span>
                  </li>
                  <li className='flex align-items-center mb-3'>
                    <i className='pi pi-check-circle text-green-500 mr-2'></i>
                    <span>Basic javascript </span>
                  </li>
                </ul>
                <hr className='mb-3 mx-0 border-top-1 border-bottom-none border-300' />
                <Button label='Buy Now' className='p-3 w-full' />
              </div>
            </div>
          </div>
        </div>
      </ScrollPanel>
    </div>
  );
};

export default Main;
