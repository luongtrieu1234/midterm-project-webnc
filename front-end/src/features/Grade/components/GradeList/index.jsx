import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { useParams } from 'react-router-dom';
import { getExcelTemplateList } from 'apis/grade.api';
import { useQuery } from 'react-query';
import { TOAST } from 'constant';
import { toast } from 'layout';
import { classNames } from 'primereact/utils';
import { useForm } from 'react-hook-form';
import { FooterComfirm } from 'components/FormControl';
import AddFileStudentListDialog from './AddGradeCompositionDialog';

export default function GradeList() {
  const { classId } = useParams();

  const {
    refetch: handleDownloadCsvTemplate,
    isLoading: isDownloadCsvTemplateLoading,
    isFetching: isDownloadCsvTemplateFetching,
  } = useQuery(
    ['downloadCsvTemplateStudentList', classId],
    () => getExcelTemplateList(classId),
    {
      enabled: false,
      onSuccess(res) {
        if (res?.data) {
          const file = new Blob([res.data]);
          const filename = 'TemplateStudentList.xlsx';
          const link = document.createElement('a');
          link.href = URL.createObjectURL(file);
          link.download = filename;
          link.click();
        }
      },
      onError() {
        toast(TOAST.ERROR, 'API Error ');
      },
    }
  );
  const [visibleAddFileStudentListDialog, setVisibleAddFileStudentListDialog] =
    useState(false);
  const {
    control,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    console.log('Data:', data);
  };
  const footerComfirm = (
    <FooterComfirm
      isLoading={false}
      action='Save'
      setVisible={setVisibleAddFileStudentListDialog}
      handleSubmit={handleSubmit(onSubmit)}
    />
  );
  // useEffect(() => {
  //   if (isAddGradeCompositionSuccess) {
  //     setVisibleAddFileStudentListDialog(false);
  //     refetch();
  //   }
  // }, [isAddGradeCompositionSuccess]);

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
  return (
    <div>
      <div className='mt-2'>
        <div className='flex align-items-center justify-content-start gap-3 my-2'>
          <div
            className='flex flex align-items-center'
            onClick={() => handleDownloadCsvTemplate()}
          >
            <i
              className={classNames('pi mr-1', {
                'pi-spinner':
                  isDownloadCsvTemplateLoading || isDownloadCsvTemplateFetching,
                'pi-file-excel': !(
                  isDownloadCsvTemplateLoading || isDownloadCsvTemplateFetching
                ),
              })}
              style={{ color: 'green' }}
            ></i>
            <div className='download-link'>
              Download Template Student List (.csv)
            </div>
          </div>
          <Button
            size='small'
            icon={classNames('pi pi-upload')}
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
          <Column
            header='Actions'
            style={{ maxWidth: '4rem' }}
            body={formatActions}
          />
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
