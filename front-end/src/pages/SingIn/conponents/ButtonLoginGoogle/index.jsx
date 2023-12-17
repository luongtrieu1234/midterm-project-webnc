import React from 'react';
import { Button } from 'primereact/button';

export default function ButtonLoginFacebook() {
  return (
    <div>
      <a href={`${process.env.REACT_APP_API_URL}/users/facebook`}>
        <Button
          label='Google'
          icon='pi pi-google'
          type='button'
          className='mx-2'
          style={{
            minWidth: '10rem',
            minHeight: '45px',
            backgroundColor: '#D0463B',
            border: 'none',
          }}
        />
      </a>
    </div>
  );
}
