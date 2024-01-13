import Layout from 'layout';
import { LayoutProvider } from 'layout/context/layoutcontext';
import React from 'react';
import HomePageAdmin from 'features/Admin/pages/HomePage';

export default function TestPage() {
  return (
    <LayoutProvider>
      <Layout>
        <HomePageAdmin />
      </Layout>
    </LayoutProvider>
  );
}
