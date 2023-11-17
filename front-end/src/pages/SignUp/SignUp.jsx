/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef, useState  } from 'react';

import { useForm, Controller } from 'react-hook-form';

// import axios from 'axios'; // Import Axios library

import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
import { InputText } from "primereact/inputtext";
    
import { Link } from 'react-router-dom';
const SignUp = () => {

    // Logic 
    // End Logic

    return (
        <div>
            <div className="flex align-items-center justify-content-center mt-10">
                <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
                    <div className="text-center mb-5">
                        <i className="pi pi-user mb-3" style={{ fontSize: '2.5rem', color: 'var(--primary-color)' }}></i>
                        <div className="text-900 text-3xl font-medium mb-3">Sign Up Account</div>
                    </div>

                    <div>
                        <label htmlFor="fullname" className="block text-900 font-medium mb-2">Full Name</label>
                        <InputText id="fullname" type="text" placeholder="Full name" className="w-full mb-3" />

                        <label htmlFor="email" className="block text-900 font-medium mb-2">Email</label>
                        <InputText id="email" type="text" placeholder="Email address" className="w-full mb-3" />

                        <label htmlFor="password" className="block text-900 font-medium mb-2">Password</label>
                        <InputText id="password" type="password" placeholder="Password" className="w-full mb-3" />

                        <Button label="Sign Up" icon="pi pi-user" type="submit" className="w-full mt-5" />

                        <div className="text-center mt-5">
                            <span className="text-600 font-medium line-height-3">Do have an account?</span>
                            <Link to = "/sign-in" className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Sign In</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;