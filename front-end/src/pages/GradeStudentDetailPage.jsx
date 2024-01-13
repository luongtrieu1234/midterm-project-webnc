import { GradeStudentDetail } from 'features/Grade/pages';
import Layout from 'layout';
import { LayoutProvider } from 'layout/context/layoutcontext';
import React from 'react';

export default function GradeStudentDetailPage() {
  return (
    <LayoutProvider>
      <Layout>
        <GradeStudentDetail />
      </Layout>
    </LayoutProvider>
  );
}
