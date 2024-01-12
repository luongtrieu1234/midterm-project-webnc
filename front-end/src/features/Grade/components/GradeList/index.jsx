// eslint-disable-next-line no-unused-vars
import React, { useEffect, useMemo, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { useParams } from 'react-router-dom';
import {
  getClassGrades,
  getExcelTemplateList,
  getGradeStructure,
  postUploadFileList,
  updateGrade,
} from 'apis/grade.api';
import { useMutation, useQuery } from 'react-query';
import { classNames } from 'primereact/utils';
import { useForm } from 'react-hook-form';
import AddFileStudentListDialog from './AddFileStudentListDialog';
import { footerComfirm, handleDownloadError, handleDownloadSuccess } from 'utils/func';
import { toast } from 'layout';
import { TOAST } from 'constant';
import UpdateGradeDialog from './UpdateGradeDialog';

export default function GradeList() {
  const { classId } = useParams();
  //state
  const [visibleAddFileStudentListDialog, setVisibleAddFileStudentListDialog] = useState(false);
  const [visibleUpdateGradeDialog, setVisibleUpdateGradeDialog] = useState(false);

  // api
  const { mutate: downloadExcelTemplateMutate, isLoading: isDownloadExcelTemplateLoading } =
    useMutation(getExcelTemplateList);
  const {
    mutate: uploadStudentListExcelFileMutate,
    isLoading: isUploadStudentListExcelFileLoading,
  } = useMutation(postUploadFileList);
  const { mutate: updateGradeMutate, isLoading: isUpdateGradeLoading } = useMutation(updateGrade);

  const {
    data: gradeListData,
    isLoading: isGradeListLoading,
    refetch,
  } = useQuery(['gradeListData', classId], () => getClassGrades(classId));
  const gradeList = useMemo(() => gradeListData?.data?.result, [gradeListData]);

  const { data: gradeStructureData, isLoading: isGradeStructureLoading } = useQuery(
    ['gradeStructureData', classId],
    () => getGradeStructure(classId),
    {
      enabled: !!classId,
    }
  );
  const gradeStructure = useMemo(() => gradeStructureData?.data, [gradeStructureData]);
  //form
  const {
    control,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  function formatHeader() {
    return (
      <div className='flex align-items-center justify-content-between'>
        <div className='text-xl'>Grade List</div>
        <div className='card'>
          <Tooltip target='.add-grade-composition' className='text-sm' />
          <Button
            disabled
            className='add-grade-composition'
            icon='pi pi-plus'
            data-pr-tooltip='Add Grade Composition'
            onClick={() => setVisibleAddFileStudentListDialog(true)}
          />
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

  function formatGrade(value, gradeCompositionId) {
    return (
      <>
        <div
          className='grade cursor-pointer'
          data-pr-tooltip='Edit grade'
          onClick={() => {
            setValue('fullName', value.studentDetails.fullname);
            setValue('userId', value.studentDetails._id);
            setValue('gradeCompositionName', value.gradeComposition[gradeCompositionId].name);
            setValue('gradeCompositionId', gradeCompositionId);
            setValue('grade', value.gradeComposition[gradeCompositionId].grade);
            setVisibleUpdateGradeDialog(true);
          }}
        >
          {value.gradeComposition[gradeCompositionId].grade
            ? value.gradeComposition[gradeCompositionId].grade
            : '|'}
        </div>
        <Tooltip target='.grade' className='text-sm' />
      </>
    );
  }

  // handle call api
  async function handleDownloadExcelTemplate() {
    downloadExcelTemplateMutate(classId, {
      onSuccess: (res) => handleDownloadSuccess(res, 'TemplateStudentList.xlsx'),
      onError: handleDownloadError,
    });
  }
  async function onAddStudentListExcelFileSubmit(data) {
    const addStudentListExcelFileSubmitFormData = new FormData();
    addStudentListExcelFileSubmitFormData.append('excelFile', data.studentListFile);
    uploadStudentListExcelFileMutate(addStudentListExcelFileSubmitFormData, {
      onSuccess() {
        toast(TOAST.SUCCESS, 'Student List Upload Successfully!');
        setVisibleAddFileStudentListDialog(false);
        reset();
        refetch();
      },
      onError() {
        toast(TOAST.ERROR, 'Student List Upload Error!');
      },
    });
  }
  async function onUpdateGrade({ userId, gradeCompositionId, grade }) {
    updateGradeMutate(
      { userId, gradeCompositionId, value: grade },
      {
        onSuccess() {
          toast(TOAST.SUCCESS, 'Update Grade Successfully!');
          setVisibleUpdateGradeDialog(false);
          refetch();
        },
        onError() {
          toast(TOAST.ERROR, 'Update GradeError!');
        },
      }
    );
  }
  //end call api

  const footerComfirmAddFile = footerComfirm({
    setVisible: setVisibleAddFileStudentListDialog,
    handleSubmit: handleSubmit(onAddStudentListExcelFileSubmit),
    isLoading: isUploadStudentListExcelFileLoading,
  });
  const footerComfirmUpdateGrade = footerComfirm({
    setVisible: setVisibleUpdateGradeDialog,
    handleSubmit: handleSubmit(onUpdateGrade),
    isLoading: isUpdateGradeLoading,
  });

  // before render
  // useEffect(() => {
  //   if (isUploadStudentListExcelFileSuccess) {
  //     setVisibleAddFileStudentListDialog(false);
  //   }
  // }, [isUploadStudentListExcelFileSuccess]);
  return (
    <div>
      <div className='mt-2'>
        <div className='flex align-items-center justify-content-start gap-3 my-2'>
          <div
            className='flex flex align-items-center'
            onClick={() => handleDownloadExcelTemplate()}
          >
            <i
              className={classNames('pi mr-1', {
                'pi-spinner': isDownloadExcelTemplateLoading,
                'pi-file-excel': !isDownloadExcelTemplateLoading,
              })}
              style={{ color: 'green' }}
            ></i>
            <div className='download-link'>Download Template Student List (.csv)</div>
          </div>
          <Button
            size='small'
            icon='pi pi-upload'
            label='Upload Student List'
            onClick={() => setVisibleAddFileStudentListDialog(true)}
          />
        </div>
        <DataTable
          header={formatHeader}
          value={gradeList}
          loading={isGradeListLoading || isGradeStructureLoading}
          showGridlines
          stripedRows
          style={{ maxWidth: '50rem' }}
        >
          {/* <Column field='no' header='No' sortable style={{ width: '1rem' }} /> */}
          <Column
            field='studentDetails.studentId'
            header='Student Id'
            style={{ maxWidth: '2.5rem' }}
            sortable
          />
          <Column field='studentDetails.fullname' header='Full Name' sortable />
          {gradeStructure?.map((item) => (
            <Column
              key={item?._id}
              field={`gradeComposition.${item?._id}.grade`}
              body={(value) => formatGrade(value, item?._id)}
              header={item?.name}
              style={{ maxWidth: '1rem' }}
              bodyClassName='text-center'
            />
          ))}
          <Column header='Actions' style={{ maxWidth: '4rem' }} body={formatActions} />
        </DataTable>
      </div>
      <AddFileStudentListDialog
        visible={visibleAddFileStudentListDialog}
        setVisible={setVisibleAddFileStudentListDialog}
        control={control}
        errors={errors}
        footer={footerComfirmAddFile}
      />
      <UpdateGradeDialog
        visible={visibleUpdateGradeDialog}
        setVisible={setVisibleUpdateGradeDialog}
        control={control}
        errors={errors}
        footer={footerComfirmUpdateGrade}
      />
    </div>
  );
}

GradeList.propTypes = {};
