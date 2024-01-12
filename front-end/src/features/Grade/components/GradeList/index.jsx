/* eslint-disable indent */
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
} from 'apis/grade.api';
import { useMutation, useQuery } from 'react-query';
import { classNames } from 'primereact/utils';
import { useForm } from 'react-hook-form';
import { FooterComfirm } from 'components/FormControl';
import AddFileStudentListDialog from './AddGradeCompositionDialog';
import { handleDownloadError, handleDownloadSuccess } from 'utils/func';
import { toast } from 'layout';
import { TOAST } from 'constant';
// import { InputNumber } from 'primereact/inputnumber';
// import { InputText } from 'primereact/inputtext';

export default function GradeList() {
  const { classId } = useParams();
  //state
  const [visibleAddFileStudentListDialog, setVisibleAddFileStudentListDialog] = useState(false);

  // api
  const { mutate: downloadExcelTemplateMutate, isLoading: isDownloadExcelTemplateLoading } =
    useMutation(getExcelTemplateList);
  const {
    mutate: uploadStudentListExcelFileMutate,
    isLoading: isUploadStudentListExcelFileLoading,
    isSuccess: isUploadStudentListExcelFileSuccess,
  } = useMutation(postUploadFileList);

  const { data: gradeListData, isLoading: isGradeListLoading } = useQuery(
    ['gradeListData', classId],
    () => getClassGrades(classId)
  );
  const gradeList = useMemo(() => gradeListData?.data?.result, [gradeListData]);

  const { data: gradeStructureData, isLoading: isGradeStructureLoading } = useQuery(
    ['gradeStructureData', classId],
    () => getGradeStructure(classId),
    {
      enabled: !!classId,
    }
  );
  const gradeStructure = useMemo(() => gradeStructureData?.data, [gradeStructureData]);
  console.log(gradeStructure);
  //form
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
  // const isPositiveInteger = (val) => {
  //   let str = String(val);

  //   str = str.trim();

  //   if (!str) {
  //     return false;
  //   }

  //   str = str.replace(/^0+/, '') || '0';
  //   let n = Math.floor(Number(str));

  //   return n !== Infinity && String(n) === str && n >= 0;
  // };
  // const onCellEditComplete = (e) => {
  //   let { rowData, newValue, field, originalEvent: event } = e;

  //   switch (field) {
  //     case 'quantity':
  //     case 'price':
  //       if (isPositiveInteger(newValue)) rowData[field] = newValue;
  //       else event.preventDefault();
  //       break;

  //     default:
  //       if (newValue.trim().length > 0) rowData[field] = newValue;
  //       else event.preventDefault();
  //       break;
  //   }
  // };

  // const cellEditor = (options) => {
  //   if (options.field === 'price') return priceEditor(options);
  //   else return textEditor(options);
  // };

  // const textEditor = (options) => {
  //   return (
  //     <InputText
  //       type='text'
  //       value={options.value}
  //       onChange={(e) => options.editorCallback(e.target.value)}
  //     />
  //   );
  // };
  // const priceEditor = (options) => {
  //   return (
  //     <InputNumber
  //       value={options.value}
  //       onValueChange={(e) => options.editorCallback(e.value)}
  //       mode='currency'
  //       currency='USD'
  //       locale='en-US'
  //     />
  //   );
  // };

  // const priceBodyTemplate = (rowData) => {
  //   return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
  //     rowData.price
  //   );
  // };
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
  // field={'studentDetails.gradeComposition.gradeCompositionDetails._id'}

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
          value={gradeList}
          editMode='cell'
          loading={isGradeListLoading || isGradeStructureLoading}
          showGridlines
          stripedRows
          style={{ maxWidth: '50rem' }}
        >
          {/* <Column field='no' header='No' sortable style={{ width: '1rem' }} /> */}
          <Column field='studentDetails.studentId' header='Student Id' sortable />
          <Column field='studentDetails.fullname' header='Full Name' sortable />
          {gradeStructure?.map((item) => (
            <Column
              key={item?._id}
              field={'studentDetails.gradeComposition.gradeCompositionDetails._id'}
              header={item?.name}
              // editor={(options) => cellEditor(options)}
              // onCellEditComplete={onCellEditComplete}
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
        footer={footerComfirm}
      />
    </div>
  );
}

GradeList.propTypes = {};
