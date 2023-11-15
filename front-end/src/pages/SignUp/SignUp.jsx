/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './SignUp.css';

const SignUp = () => {
    return (
        <div>
            <section class="img">
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
                    <p class=" mt-6 text-2xl font-bold text-center text-gray-900">
                        Sign Up
                    </p>
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <form class="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label for="fullname" class="block mb-2 text-sm font-medium text-gray-900 ">Full Name</label>
                                <input type="fullname" name="fullname"  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  " required=""/>
                            </div>
                            <div>
                                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                                <input type="email" name="email"  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  " required=""/>
                            </div>
                            <div>
                                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                                <input type="password" name="password"  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  " required=""/>
                            </div>
                            <div class="flex items-center justify-between">
                            </div>
                            <button type="submit" class="w-full h-10  text-white bg-blue-500 hover:bg-blue-700 rounded-lg">Sign up</button>
                            <p class="text-sm font-light text-gray-500 ">
                            You already have an account <a href="/sign-in" class="font-medium text-blue-600">Sign in</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
            </section>
        </div>
    );
};

export default SignUp;