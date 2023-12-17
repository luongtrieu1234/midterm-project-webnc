import Layout from 'layout';
import { LayoutProvider } from 'layout/context/layoutcontext';
import React from 'react';

export default function TestPage() {
  return (
    <LayoutProvider>
      <Layout>
        <span>{'abc'}</span>
      </Layout>
    </LayoutProvider>
  );
}
