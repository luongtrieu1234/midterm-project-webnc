import React from 'react';
import Main from './components/Main';
import Layout from 'layout';
import { LayoutProvider } from 'layout/context/layoutcontext';

const ClassDetail = () => {
  return (
    <LayoutProvider>
      <Layout>
        <Main />
      </Layout>
    </LayoutProvider>
  );
};

export default ClassDetail;
