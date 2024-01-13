import React, { useMemo } from 'react';
import qr from './qr.svg';
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';
import { Link } from 'react-router-dom';

export default function Header() {
  const token = useMemo(() => localStorage.getItem('token'), []);
  const homePageUrl = useMemo(() => (token ? '/home-page' : '/'), [token]);

  const itemTopbars = [
    { id: 'home', label: 'Home', to: homePageUrl },
    { id: 'about', label: 'About', to: '/' },
    { id: 'course', label: 'Course', to: '/' },
    { id: 'blog', label: 'Blog', to: '/' },
    { id: 'notification', label: 'Notification', to: '/notification' },
  ];
  return (
    <>
      <div className='topbar-container'>
        <div className='flex justify-content-between align-items-center'>
          <img src={qr} style={{ width: '50px' }} />
          <i className='pi pi-bars submenu border-round'></i>
        </div>
        <div className='nav'>
          {itemTopbars.map(({ id, label, to }) => (
            <Link key={id} className='item-nav' to={to}>
              {label}
            </Link>
          ))}
        </div>
        <div className='flex align-items-center justify-content-end gap-2 user-btns'>
          {token ? (
            <>
              <Link to='/me'>
                <Button icon='pi pi-user' size='large' className='btn-user' link></Button>
              </Link>
              <Link to='/'>
                <Button
                  icon='pi pi-sign-out'
                  size='large'
                  className='btn-user'
                  link
                  onClick={() => localStorage.removeItem('token')}
                />
              </Link>
            </>
          ) : (
            <>
              <Link to='/sign-in-admin'>
                <Button className='btn-sign'>Admin</Button>
              </Link>
              <Link to='/sign-in'>
                <Button className='btn-sign'>SignIn</Button>
              </Link>
              <Link to='/sign-up'>
                <Button className='btn-sign'>SignUp</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
