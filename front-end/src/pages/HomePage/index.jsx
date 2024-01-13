import React from 'react';
import Layout from 'layout';
import ViewListClass from 'features/Class/pages/ViewList';
import { LayoutProvider } from 'layout/context/layoutcontext';

const HomePage = () => {
  return (
    <LayoutProvider>
      <Layout>
        <ViewListClass />
      </Layout>
    </LayoutProvider>
  );
};

export default HomePage;
