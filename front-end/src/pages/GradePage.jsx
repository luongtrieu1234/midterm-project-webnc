import { CurrentGradeStructure } from 'features/Grade/pages';
import Layout from 'layout';
import { LayoutProvider } from 'layout/context/layoutcontext';
import React from 'react';

export default function GradePage() {
  return (
    <LayoutProvider>
      <Layout>
        <CurrentGradeStructure />
      </Layout>
    </LayoutProvider>
  );
}
