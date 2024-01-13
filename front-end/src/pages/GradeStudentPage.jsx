import { GradeStudent } from 'features/Grade/pages';
import Layout from 'layout';
import { LayoutProvider } from 'layout/context/layoutcontext';
import React from 'react';

export default function GradeStudentPage() {
  return (
    <LayoutProvider>
      <Layout>
        <GradeStudent />
      </Layout>
    </LayoutProvider>
  );
}
