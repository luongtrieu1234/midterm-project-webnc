import React from 'react';
import { Menu } from 'primereact/menu';
import { useEffect, useState } from 'react';
import axios from 'axios';
export default function Sidebar() {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/class/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setClasses(response.data);
        } else {
          console.log('Error occurred while fetching classes');
        }
      } catch (error) {
        console.error('An error occurred while fetching the classes:', error);
      }
    };

    fetchClasses();
  }, []);
  const items = [
    { label: 'Home', icon: 'pi pi-home' },
    { label: 'Landing Page', icon: 'pi pi-qrcode' },
    {
      label: 'Classes',
      items: classes.map((classItem) => ({
        label: classItem.name,
        icon: 'pi pi-calendar',
      })),
    },
    { label: 'Profile', icon: 'pi pi-user' },
    { label: 'Setting', icon: 'pi pi-cog' },
    { label: 'Log out', icon: 'pi pi-sign-out' },
  ];

  return <Menu model={items} />;
}
