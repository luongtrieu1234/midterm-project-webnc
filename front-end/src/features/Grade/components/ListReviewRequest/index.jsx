// eslint-disable-next-line no-unused-vars
import React, { useEffect, useMemo, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getListReviewRequest } from 'apis/grade.api';
import { Loading } from 'components';

export default function ListReviewRequest() {
  const { classId } = useParams();
  const navigate = useNavigate();
  //state

  // api

  const { data: listReviewRequestData, isLoading: isListReviewRequestLoading } = useQuery(
    ['listReviewRequestData', classId],
    () => getListReviewRequest(classId)
  );
  const listReviewRequest = useMemo(
    () => listReviewRequestData?.data?.data,
    [listReviewRequestData]
  );

  //form

  function formatHeader() {
    return (
      <div className='flex align-items-center justify-content-between'>
        <div className='text-xl'>List Review Request</div>
      </div>
    );
  }
  function formatActions(value) {
    console.log('value:', value);
    return (
      <div className='card flex flex-wrap justify-content-center gap-3'>
        <Button
          className='action'
          icon='pi pi-eye'
          data-pr-tooltip='View detail review request'
          onClick={() => {
            navigate(`/course/${classId}/grade-student/grade/${value?.gradeId}`);
          }}
        />
        <Tooltip target='.action' className='text-sm' />
      </div>
    );
  }

  // handle call api
  //end call api

  // before render

  return (
    <div>
      {isListReviewRequestLoading && <Loading />}
      <div className='mt-2'>
        <DataTable
          header={formatHeader}
          value={listReviewRequest || []}
          showGridlines
          stripedRows
          style={{ maxWidth: '50rem' }}
        >
          <Column
            field='gradeCompositionName'
            header='Grade composition'
            style={{ maxWidth: '2rem' }}
          />
          <Column
            field='expectationGrade'
            header='Expectation Grade'
            style={{ maxWidth: '2rem' }}
          />
          <Column field='explanation' header='Explanation' style={{ maxWidth: '2rem' }} />
          <Column header='Actions' style={{ maxWidth: '2rem' }} body={formatActions} />
        </DataTable>
      </div>
    </div>
  );
}

ListReviewRequest.propTypes = {};
