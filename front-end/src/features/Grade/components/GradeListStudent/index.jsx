// eslint-disable-next-line no-unused-vars
import React, { useEffect, useMemo, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
// import { useForm } from 'react-hook-form';
import { getGradeOfStudent } from 'apis/grade.api';
import { Loading } from 'components';

export default function GradeListStudent() {
  const { classId } = useParams();
  const navigate = useNavigate();
  //state

  // api

  const {
    data: gradeStudentListData,
    isLoading: isGradeStudentListLoading,
    // refetch,
  } = useQuery(['gradeStudentListData', classId], () => getGradeOfStudent(classId));
  const gradeStudentList = useMemo(
    () => gradeStudentListData?.data?.result,
    [gradeStudentListData]
  );

  //form
  // const {
  //   control,
  //   setValue,
  //   handleSubmit,
  //   reset,
  //   formState: { errors },
  // } = useForm();

  function formatHeader() {
    return (
      <div className='flex align-items-center justify-content-between'>
        <div className='text-xl'>Grade List</div>
        <div className='card'>
          <div>{gradeStudentList?.studentDetails?.total}</div>
          {/* <Tooltip target='.add-grade-composition' className='text-sm' />
          <Button
            className='add-grade-composition'
            icon='pi pi-download'
            data-pr-tooltip='Download file full grade'
          /> */}
        </div>
      </div>
    );
  }
  function formatActions() {
    return (
      <div className='card flex flex-wrap justify-content-center gap-3'>
        <Button icon='pi pi-pencil' severity='warning' />
        <Button icon='pi pi-trash' severity='danger' />
      </div>
    );
  }

  function formatGrade(value) {
    return (
      <>
        <div
          className='grade cursor-pointer'
          data-pr-tooltip='Edit grade'
          onClick={() => navigate(`/course/${classId}/grade-student/grade/${value.gradeId}`)}
        ></div>
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
          value={gradeStudentList?.gradeCompositions || []}
          showGridlines
          stripedRows
          style={{ maxWidth: '50rem' }}
        >
          <Column
            field=''
            header='Grade composition'
            style={{ maxWidth: '3rem' }}
            bodyClassName='text-center'
          />
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
