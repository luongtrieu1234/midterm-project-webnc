import React from 'react';
import { Menu } from 'primereact/menu';

export default function Sidebar() {
  const items = [
    {
      label: 'Options',
      items: [
        {
          label: 'Update',
          icon: 'pi pi-refresh',
        },
        {
          label: 'Delete',
          icon: 'pi pi-times',
        },
      ],
    },
    {
      label: 'Links',
      items: [
        {
          label: 'React Website',
          icon: 'pi pi-external-link',
        },
        {
          label: 'Upload',
          icon: 'pi pi-upload',
        },
      ],
    },
    {
      label: 'Options',
      items: [
        {
          label: 'Update',
          icon: 'pi pi-refresh',
        },
        {
          label: 'Delete',
          icon: 'pi pi-times',
        },
      ],
    },
    {
      label: 'Options',
      items: [
        {
          label: 'Update',
          icon: 'pi pi-refresh',
        },
        {
          label: 'Delete',
          icon: 'pi pi-times',
        },
      ],
    },
  ];

  return (
    <div className='card flex justify-content-center'>
      <Menu model={items} />
    </div>
  );
}
