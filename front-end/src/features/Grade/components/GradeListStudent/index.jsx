// eslint-disable-next-line no-unused-vars
import React, { useEffect, useMemo, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import { getGradeOfStudent, postReviewRequest } from 'apis/grade.api';
import { Loading } from 'components';
import { useForm } from 'react-hook-form';
import { toast } from 'layout';
import { TOAST } from 'constant';
import AddReviewRequestDialog from './AddReviewRequestDialog';
import { footerComfirm } from 'utils/func';

export default function GradeListStudent() {
  const { classId, userId } = useParams();
  const navigate = useNavigate();
  //state
  const [visibleReviewRequestDialog, setVisibleReviewRequestDialog] = useState(false);

  // api
  const { mutate: reviewRequestMutate, isLoading: isReviewRequestLoading } =
    useMutation(postReviewRequest);

  const { data: gradeStudentListData, isLoading: isGradeStudentListLoading } = useQuery(
    ['gradeStudentListData', classId],
    () => getGradeOfStudent(classId, userId)
  );
  const gradeStudentList = useMemo(
    () => gradeStudentListData?.data?.result,
    [gradeStudentListData]
  );

  //form
  const {
    control,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function formatHeader() {
    return (
      <div className='flex align-items-center justify-content-between'>
        <div className='text-xl'>Grade List Of Student</div>
        <div className='card'>
          <div>{gradeStudentList?.studentDetails?.fullname}</div>
          <div>Total:{gradeStudentList?.total}</div>
        </div>
      </div>
    );
  }
  function formatActions(value) {
    console.log('value:', value);
    return (
      <div className='card flex flex-wrap justify-content-center gap-3'>
        <Button
          className='action'
          icon='pi pi-plus'
          data-pr-tooltip='Add review request'
          onClick={() => {
            setValue('gradeId', value?.gradeId);
            setValue('fullName', gradeStudentList?.studentDetails?.fullname);
            setValue('gradeCompositionName', value?.name);
            setVisibleReviewRequestDialog(true);
          }}
        />
        <Tooltip target='.action' className='text-sm' />
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
  async function onReviewRequest(data) {
    reviewRequestMutate(
      { gradeId: data.gradeId, explanation: data.explanation, expectedGrade: data.expectedGrade },
      {
        onSuccess() {
          toast(TOAST.SUCCESS, 'Update Grade Successfully!');
          reset();

          setVisibleReviewRequestDialog(false);
        },
        onError() {
          toast(TOAST.ERROR, 'Update GradeError!');
        },
      }
    );
  }
  //end call api
  const footerComfirmAddReviewRequest = footerComfirm({
    setVisible: setVisibleReviewRequestDialog,
    handleSubmit: handleSubmit(onReviewRequest),
    isLoading: isReviewRequestLoading,
  });
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
          <Column header='Actions' style={{ maxWidth: '2rem' }} body={formatActions} />
        </DataTable>
      </div>
      <AddReviewRequestDialog
        visible={visibleReviewRequestDialog}
        setVisible={setVisibleReviewRequestDialog}
        control={control}
        errors={errors}
        footer={footerComfirmAddReviewRequest}
      />
    </div>
  );
}

GradeListStudent.propTypes = {};
