import React from 'react';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Main from './components/Main';

import { ScrollTop } from 'primereact/scrolltop';

const HomePage = () => {
    return (
        <div class="" style={{ height: '100vh'}}>
            <div class="block font-bold text-center p-4 mb-3">
                <Header/>
            </div>
            <hr className='mx-0 border-left-1 border-bottom-none border-200' />
            <div class="flex">
                <div class="flex justify-content-center font-bold m-2 px-4 py-2 w-3">
                    <Sidebar/>
                </div>
                <hr className='mx-0 border-left-1 border-bottom-none border-200' />
                <div class="flex font-bold m-2 px-5 py-3 border-round w-full">
                    <Main/>
                </div>
            </div>
        </div>
    );
};

export default HomePage;