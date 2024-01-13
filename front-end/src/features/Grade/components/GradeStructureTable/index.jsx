// eslint-disable-next-line no-unused-vars
import React, { useEffect, useMemo, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import AddGradeCompositionDialog from './AddGradeCompositionDialog';
import {
  addGradeComposition,
  deleteGradeComposition,
  getExcelTemplateGrade,
  getGradeStructure,
  markGradeCompositionFinal,
  updateGradeComposition,
  uploadFileGrade,
} from 'apis/grade.api';
import { TOAST } from 'constant';
import { toast } from 'layout';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { useLocation, useParams } from 'react-router-dom';
import { footerComfirm, handleDownloadError, handleDownloadSuccess } from 'utils/func';
import UpdateGradeCompositionDialog from './UpdateGradeCompositionDialog';
import DeleteGradeCompositionDialog from './DeleteGradeCompositionDialog';
import AddFileGradeCompositionDialog from './AddFileGradeCompositionDialog';
import { Loading } from 'components';

export default function GradeStructureTable() {
  const { classId } = useParams();
  const location = useLocation();
  const currentPath = location.pathname;
  // state
  const [visibleAddGradeCompositionDialog, setVisibleAddGradeCompositionDialog] = useState(false);
  const [visibleUpdateGradeCompositionDialog, setVisibleUpdateGradeCompositionDialog] =
    useState(false);
  const [visibleDeleteGradeCompositionDialog, setVisibleDeleteGradeCompositionDialog] =
    useState(false);
  const [visibleAddFileGradeCompositionDialog, setVisibleAddFileGradeCompositionDialog] =
    useState(false);

  // query
  const { mutate: addGradeCompositionMutate, isLoading: isAddGradeCompositionLoading } =
    useMutation(addGradeComposition);
  const { mutate: updateGradeCompositionMutate, isLoading: isUpdateGradeCompositionLoading } =
    useMutation(updateGradeComposition);
  const { mutate: deleteGradeCompositionMutate, isLoading: isDeleteGradeCompositionLoading } =
    useMutation(deleteGradeComposition);
  const {
    mutate: getExcelTemplateGradeCompositionMutate,
    isLoading: isGetExcelTemplateGradeCompositionLoading,
  } = useMutation(getExcelTemplateGrade);
  const { mutate: addFileGradeCompositionMutate, isLoading: isAddFileGradeCompositionLoading } =
    useMutation(uploadFileGrade);
  const { mutate: markGradeCompositionFinalMutate, isLoading: isMarkGradeCompositionFinalLoading } =
    useMutation(markGradeCompositionFinal);
  const {
    data: gradeStructureData,
    isLoading: isGradeStructureLoading,
    refetch,
  } = useQuery(['gradeStructureData', classId], () => getGradeStructure(classId), {
    enabled: !!classId,
  });
  const gradeStructure = useMemo(() => gradeStructureData?.data, [gradeStructureData]);

  const {
    control,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      gradeCompositionId: '',
      gradeCompositionName: '',
      gradeScale: null,
      content: '',
    },
  });

  // onSubmit
  async function onAddCompositionSubmit(data) {
    addGradeCompositionMutate(
      {
        classId: classId,
        name: data?.gradeCompositionName,
        gradeScale: data?.gradeScale,
        content: data?.content,
      },
      {
        onSuccess() {
          toast(TOAST.SUCCESS, 'Add grade composition successfully!');
          reset();
          refetch();
          setVisibleAddGradeCompositionDialog(false);
        },
        onError() {
          toast(TOAST.ERROR, 'Server error!');
        },
      }
    );
  }
  async function onUpdateCompositionSubmit(data) {
    updateGradeCompositionMutate(
      {
        gradeCompositionId: data?.gradeCompositionId,
        name: data?.gradeCompositionName,
        gradeScale: data?.gradeScale,
        content: data?.content,
        position: data?.position,
      },
      {
        onSuccess() {
          toast(TOAST.SUCCESS, 'Update grade composition successfully!');
          reset();
          refetch();
          setVisibleUpdateGradeCompositionDialog(false);
        },
        onError() {
          toast(TOAST.ERROR, 'Server error!');
        },
      }
    );
  }
  async function onDeleteCompositionSubmit(data) {
    deleteGradeCompositionMutate(
      {
        gradeCompositionId: data?.gradeCompositionId,
      },
      {
        onSuccess() {
          toast(TOAST.SUCCESS, 'Delete grade composition successfully!');
          reset();
          refetch();
          setVisibleDeleteGradeCompositionDialog(false);
        },
        onError() {
          toast(TOAST.ERROR, 'Server error!');
        },
      }
    );
  }
  async function onAddFileGradeCompositionSubmit(data) {
    const formData = new FormData();
    formData.append('gradeCompositionId', data.gradeCompositionId);
    formData.append('excelFile', data.excelFile);
    addFileGradeCompositionMutate(formData, {
      onSuccess() {
        toast(TOAST.SUCCESS, 'Upload file grade composition successfully!');
        reset();
        refetch();
        setVisibleAddFileGradeCompositionDialog(false);
      },
      onError() {
        toast(TOAST.ERROR, 'Server error!');
      },
    });
  }

  async function handleGetExcelTemplateGrade(gradeCompositionId) {
    getExcelTemplateGradeCompositionMutate(gradeCompositionId, {
      onSuccess: (res) => handleDownloadSuccess(res),
      onError: handleDownloadError,
    });
  }
  async function handleMarkGradeCompositionFinal(gradeCompositionId) {
    markGradeCompositionFinalMutate(
      { gradeCompositionId: gradeCompositionId, currentPath: currentPath },
      {
        onSuccess() {
          toast(TOAST.SUCCESS, 'Mark grade composition finalize successfully!');
          reset();
          refetch();
        },
        onError() {
          toast(TOAST.ERROR, 'Server error!');
        },
      }
    );
  }

  function formatHeader() {
    return (
      <div className='flex align-items-center justify-content-between'>
        <div className='text-xl'>Grade Structures</div>
        <div className='card'>
          <Tooltip target='.add-grade-composition' className='text-sm' />
          <Button
            className='add-grade-composition'
            icon='pi pi-plus'
            data-pr-tooltip='Add Grade Composition'
            onClick={() => setVisibleAddGradeCompositionDialog(true)}
          />
        </div>
      </div>
    );
  }
  function formatActions(value) {
    return (
      <div className='card flex flex-wrap justify-content-center gap-2'>
        <Button
          className='action'
          icon='pi pi-pencil'
          severity='warning'
          data-pr-tooltip='Edit'
          onClick={() => {
            setValue('gradeCompositionId', value._id);
            setValue('gradeCompositionName', value.name);
            setValue('gradeScale', value.gradeScale);
            setValue('content', value.content);
            setVisibleUpdateGradeCompositionDialog(true);
          }}
        />
        <Button
          className='action'
          icon='pi pi-trash'
          severity='danger'
          data-pr-tooltip='Remove'
          onClick={() => {
            setValue('gradeCompositionId', value._id);
            setVisibleDeleteGradeCompositionDialog(true);
          }}
        />
        <Button
          className='action'
          icon='pi pi-download'
          severity='info'
          data-pr-tooltip='Download template grade composition'
          data-pr-position='left'
          onClick={() => handleGetExcelTemplateGrade(value._id)}
        />
        <Button
          className='action'
          icon='pi pi-upload '
          severity='info'
          data-pr-tooltip='Upload file grade composition'
          data-pr-position='left'
          onClick={() => {
            setValue('gradeCompositionId', value._id);
            setVisibleAddFileGradeCompositionDialog(true);
          }}
        />
        <Button
          className='action'
          icon='pi pi-check'
          data-pr-tooltip='Mark as finalized'
          onClick={() => handleMarkGradeCompositionFinal(value._id)}
        />
        <Tooltip target='.action' className='text-sm' />
      </div>
    );
  }
  const footerComfirmAddGradeComposition = footerComfirm({
    setVisible: setVisibleAddGradeCompositionDialog,
    handleSubmit: handleSubmit(onAddCompositionSubmit),
    isLoading: isAddGradeCompositionLoading,
  });
  const footerComfirmUpdateGradeComposition = footerComfirm({
    setVisible: setVisibleAddGradeCompositionDialog,
    handleSubmit: handleSubmit(onUpdateCompositionSubmit),
    isLoading: isUpdateGradeCompositionLoading,
  });
  const footerComfirmDeleteGradeComposition = footerComfirm({
    setVisible: setVisibleDeleteGradeCompositionDialog,
    handleSubmit: handleSubmit(onDeleteCompositionSubmit),
    isLoading: isDeleteGradeCompositionLoading,
  });
  const footerComfirmAddFileGradeComposition = footerComfirm({
    setVisible: setVisibleAddFileGradeCompositionDialog,
    handleSubmit: handleSubmit(onAddFileGradeCompositionSubmit),
    isLoading: isAddFileGradeCompositionLoading,
  });

  return (
    <>
      {isMarkGradeCompositionFinalLoading ||
        (isGetExcelTemplateGradeCompositionLoading && <Loading />)}
      <div>
        <div className='current-grade-structure mt-2'>
          <DataTable
            header={formatHeader}
            value={gradeStructure}
            loading={isGradeStructureLoading}
            showGridlines
            stripedRows
            style={{ maxWidth: '70rem' }}
          >
            <Column rowReorder style={{ width: '1rem' }} />
            <Column field='name' header='Name' sortable />
            <Column field='content' header='Content' />
            <Column field='gradeScale' header='Scale' sortable style={{ maxWidth: '2rem' }} />
            <Column header='Actions' body={formatActions} style={{ maxWidth: '6rem' }} />
          </DataTable>
        </div>
        <AddGradeCompositionDialog
          visible={visibleAddGradeCompositionDialog}
          setVisible={setVisibleAddGradeCompositionDialog}
          control={control}
          errors={errors}
          footer={footerComfirmAddGradeComposition}
        />
        <UpdateGradeCompositionDialog
          visible={visibleUpdateGradeCompositionDialog}
          setVisible={setVisibleUpdateGradeCompositionDialog}
          control={control}
          errors={errors}
          footer={footerComfirmUpdateGradeComposition}
        />
        <DeleteGradeCompositionDialog
          visible={visibleDeleteGradeCompositionDialog}
          setVisible={setVisibleDeleteGradeCompositionDialog}
          control={control}
          errors={errors}
          footer={footerComfirmDeleteGradeComposition}
        />
        <AddFileGradeCompositionDialog
          visible={visibleAddFileGradeCompositionDialog}
          setVisible={setVisibleAddFileGradeCompositionDialog}
          control={control}
          errors={errors}
          footer={footerComfirmAddFileGradeComposition}
        />
      </div>
    </>
  );
}
