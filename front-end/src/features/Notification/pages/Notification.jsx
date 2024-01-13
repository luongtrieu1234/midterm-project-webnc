import { getListNotifications } from 'apis/users.api';
import { Card } from 'primereact/card';
import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router';

export default function Notification() {
  const navigate = useNavigate();
  const { data: notisData } = useQuery(['notisData'], () => getListNotifications());
  const notis = useMemo(() => notisData?.data?.notifications, [notisData]);
  console.log('notis:', notis);
  return (
    <div style={{ height: '300px', overflowY: 'scroll' }}>
      {notis?.map(({ message, currentPath, _id }) => (
        <div className='cursor-pointer' key={_id} onClick={() => navigate(currentPath)}>
          <Card
            title={<div className='text-base'>{message}</div>}
            className='mt-1 border-1 surface-border'
          />
        </div>
      ))}
    </div>
  );
}
