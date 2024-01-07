import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { useParams } from 'react-router-dom';
import { getExcelTemplateList, postUploadFileList } from 'apis/grade.api';
import { useMutation } from 'react-query';
import { classNames } from 'primereact/utils';
import { useForm } from 'react-hook-form';
import { FooterComfirm } from 'components/FormControl';
import AddFileStudentListDialog from './AddGradeCompositionDialog';
import { handleDownloadError, handleDownloadSuccess } from 'utils/func';
import { toast } from 'layout';
import { TOAST } from 'constant';

export default function GradeList() {
  const { classId } = useParams();
  const { mutate: downloadExcelTemplateMutate, isLoading: isDownloadExcelTemplateLoading } =
    useMutation(getExcelTemplateList);
  const {
    mutate: uploadStudentListExcelFileMutate,
    isLoading: isUploadStudentListExcelFileLoading,
    isSuccess: isUploadStudentListExcelFileSuccess,
  } = useMutation(postUploadFileList);

  const [visibleAddFileStudentListDialog, setVisibleAddFileStudentListDialog] = useState(false);
  const {
    control,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm();

  function formatHeader() {
    return (
      <div className='flex align-items-center justify-content-between'>
        <div className='text-xl'>Grade List</div>
        <div className='card'>
          <Tooltip target='.add-grade-composition' className='text-sm' />
          <Button
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

  // call api
  async function handleDownloadExcelTemplate() {
    downloadExcelTemplateMutate(classId, {
      onSuccess: (res) => handleDownloadSuccess(res, 'TemplateStudentList.xlsx'),
      onError: handleDownloadError,
    });
  }
  async function onAddStudentListExcelFileSubmit(data) {
    console.log('Data:', data);
    const addStudentListExcelFileSubmitFormData = new FormData();
    addStudentListExcelFileSubmitFormData.append('excelFile', data.studentListFile);
    uploadStudentListExcelFileMutate(addStudentListExcelFileSubmitFormData, {
      onSuccess() {
        toast(TOAST.SUCCESS, 'Student List Upload Successfully!');
      },
      onError() {
        toast(TOAST.ERROR, 'Student List Upload Error!');
      },
    });
  }
  //end call api

  const footerComfirm = (
    <FooterComfirm
      isLoading={false}
      action='Save'
      setVisible={setVisibleAddFileStudentListDialog}
      handleSubmit={handleSubmit(onAddStudentListExcelFileSubmit)}
    />
  );

  // before render
  useEffect(() => {
    if (isUploadStudentListExcelFileSuccess) {
      setVisibleAddFileStudentListDialog(false);
    }
  }, [isUploadStudentListExcelFileSuccess]);
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
            icon={classNames('pi ', {
              'pi-spinner': isUploadStudentListExcelFileLoading,
              'pi-upload': !isUploadStudentListExcelFileLoading,
            })}
            label='Upload Student List'
            onClick={() => setVisibleAddFileStudentListDialog(true)}
          />
        </div>
        <DataTable
          header={formatHeader}
          value={[]}
          showGridlines
          stripedRows
          style={{ maxWidth: '50rem' }}
        >
          <Column field='no' header='No' sortable style={{ width: '1rem' }} />
          <Column field='studentId' header='Student Id' sortable />
          <Column field='fullName' header='Full Name' sortable />
          <Column header='Actions' style={{ maxWidth: '4rem' }} body={formatActions} />
        </DataTable>
      </div>
      <AddFileStudentListDialog
        visible={visibleAddFileStudentListDialog}
        setVisible={setVisibleAddFileStudentListDialog}
        control={control}
        errors={errors}
        footer={footerComfirm}
      />
    </div>
  );
}

GradeList.propTypes = {};