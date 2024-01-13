import React from 'react';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';

export default function ButtonLoginFacebook() {
  return (
    <div>
      <a href={`${process.env.REACT_APP_API_URL}/users/facebook`}>
        <Button
          label='Facebook'
          icon={classNames('pi', {
            'pi pi-facebook': true,
          })}
          type='button'
          className='mx-2'
          style={{ minWidth: '10rem', minHeight: '45px' }}
        />
      </a>
    </div>
  );
}
