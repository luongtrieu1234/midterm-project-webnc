import React from 'react';

import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';
        

const Header = () => {

  // Logic

  const handleClickSignUp = (event) => {
    // Chuyển đến trang Sign Up
    window.location.href = "/sign-up";
  };

  const handleClickSignIn = (event) => {
    // Chuyển đến trang Sign Up
    window.location.href = "/sign-in";
  };

  // End Logic

    return (
      <div>
        <div className="card flex flex-wrap justify-content-center mt-5 gap-8 text-gray">
          <div className="card flex flex-wrap justify-content-center gap-3 ml-6" >
            <i className="pi pi-qrcode text-blue-500" style={{ fontSize: '2.5rem' }}></i>
          </div>
          <div className="card flex flex-wrap justify-content-center gap-3 ml-8 ">
            <Button label="Home" link />
            <Button label="About" link />
            <Button label="Course" link />
            <Button label="Blog" link />
            <Button label="Contact" link />
          </div>
          <div className="card flex flex-wrap justify-content-center gap-5 ml-8" >
            <Button label="Sign Up" outlined  onClick = {handleClickSignUp}>
            </Button>
            <Button label="Sign In" raised onClick = {handleClickSignIn}/>
          </div>
        </div>
      </div>
    );
  };
  
  export default Header;