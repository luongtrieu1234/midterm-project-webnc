import React from 'react';
import { Body, Footer } from './components';
import Layout from 'layout';
import { LayoutProvider } from 'layout/context/layoutcontext';
const LandingPage = () => {
  return (
    <LayoutProvider>
      <Layout>
        <>
          <Body />
          <Footer />
        </>
      </Layout>
    </LayoutProvider>
  );
};

export default LandingPage;
