import React from 'react';
import Layout from 'layout';
import { LayoutProvider } from 'layout/context/layoutcontext';
import { ClassDetail } from 'features/Class/pages';

const ClassDetailPage = () => {
  return (
    <LayoutProvider>
      <Layout>
        <ClassDetail />
      </Layout>
    </LayoutProvider>
  );
};

export default ClassDetailPage;
