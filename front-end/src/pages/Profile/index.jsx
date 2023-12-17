import React from 'react';
import Body from './Body';
import Layout from 'layout';
import { LayoutProvider } from 'layout/context/layoutcontext';

const Profile = () => {
  return (
    <LayoutProvider>
      <Layout>
        <Body />
      </Layout>
    </LayoutProvider>
  );
};

export default Profile;
