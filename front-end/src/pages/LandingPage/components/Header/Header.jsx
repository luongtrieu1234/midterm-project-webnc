import React from 'react';

import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';
        

const Header = () => {
    return (
      <div>
        <div className="card flex flex-wrap justify-content-center mt-5 gap-8">
          <div className="card flex flex-wrap justify-content-center gap-3 ml-6" >
            <i className="pi pi-twitter" style={{ fontSize: '2.5rem', color: 'blue' }}></i>
          </div>
          <div className="card flex flex-wrap justify-content-center gap-3 ml-8 ">
            <Button label="Home" link />
            <Button label="About" link />
            <Button label="Course" link />
            <Button label="Blog" link />
            <Button label="Contact" link />
          </div>
          <div className="card flex flex-wrap justify-content-center gap-5 ml-8" >
            <Button label="Sign Up" outlined />
            <Button label="Sign In" raised />
          </div>
        </div>
      </div>
    );
  };
  
  export default Header;