import { Notification } from 'features/Notification/pages';
import Layout from 'layout';
import { LayoutProvider } from 'layout/context/layoutcontext';
import React from 'react';

export default function NotificationPage() {
  return (
    <LayoutProvider>
      <Layout>
        <Notification />
      </Layout>
    </LayoutProvider>
  );
}
