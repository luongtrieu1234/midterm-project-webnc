// eslint-disable-next-line no-unused-vars
import React, { useEffect, useMemo, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getGradeOfStudent } from 'apis/grade.api';
import { Loading } from 'components';

export default function GradeListStudent() {
  const { classId, userId } = useParams();
  const navigate = useNavigate();
  //state

  // api

  const { data: gradeStudentListData, isLoading: isGradeStudentListLoading } = useQuery(
    ['gradeStudentListData', classId],
    () => getGradeOfStudent(classId, userId)
  );
  const gradeStudentList = useMemo(
    () => gradeStudentListData?.data?.result,
    [gradeStudentListData]
  );

  function formatHeader() {
    return (
      <div className='flex align-items-center justify-content-between'>
        <div className='text-xl'>Grade List</div>
        <div className='card'>
          <div>{gradeStudentList?.studentDetails?.fullname}</div>
          <div>{gradeStudentList?.total}</div>
        </div>
      </div>
    );
  }
  function formatActions() {
    return (
      <div className='card flex flex-wrap justify-content-center gap-3'>
        <Button icon='pi pi-pencil' severity='warning' disabled />
        <Button icon='pi pi-trash' severity='danger' disabled />
      </div>
    );
  }

  function formatGrade(value) {
    return (
      <>
        <div
          className='grade cursor-pointer'
          data-pr-tooltip='View detail'
          onClick={() => navigate(`/course/${classId}/grade-student/grade/${value.gradeId}`)}
        >
          {value.grade}
        </div>
        <Tooltip target='.grade' className='text-sm' />
      </>
    );
  }

  // handle call api

  //end call api

  // before render

  return (
    <div>
      {isGradeStudentListLoading && <Loading />}
      <div className='mt-2'>
        <DataTable
          header={formatHeader}
          value={gradeStudentList?.gradeComposition || []}
          showGridlines
          stripedRows
          style={{ maxWidth: '50rem' }}
        >
          <Column field='name' header='Grade composition' style={{ maxWidth: '2rem' }} />
          <Column
            body={(value) => formatGrade(value)}
            header='Grade'
            style={{ maxWidth: '2rem' }}
            bodyClassName='text-center'
          />
          <Column header='Actions' style={{ maxWidth: '4rem' }} body={formatActions} />
        </DataTable>
      </div>
    </div>
  );
}

GradeListStudent.propTypes = {};
