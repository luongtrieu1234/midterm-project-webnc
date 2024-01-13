import React, { useMemo } from 'react';
import { Menu } from 'primereact/menu';
import { useQuery } from 'react-query';
import { getAllClass } from 'apis/class.api';
import { Loading } from 'components';
export default function Sidebar() {
  const { data: classesData, isLoading } = useQuery(['classesData'], () => getAllClass());
  const classes = useMemo(() => classesData?.data, [classesData]);

  const items = [
    { label: 'Home', icon: 'pi pi-home' },
    { label: 'Landing Page', icon: 'pi pi-qrcode' },
    {
      label: 'Classes',
      items: classes?.map((classItem) => ({
        label: classItem.name,
        icon: 'pi pi-calendar',
      })),
    },
    { label: 'Profile', icon: 'pi pi-user' },
    { label: 'Setting', icon: 'pi pi-cog' },
    { label: 'Log out', icon: 'pi pi-sign-out' },
  ];

  return (
    <>
      {isLoading && <Loading />}
      <Menu model={items} />
    </>
  );
}
