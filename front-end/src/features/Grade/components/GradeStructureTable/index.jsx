import React, { useEffect, useMemo, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import AddGradeCompositionDialog from './AddGradeCompositionDialog';
import { addGradeComposition, getGradeStructure } from 'apis/grade.api';
import { FooterComfirm } from 'components/FormControl';
import { TOAST } from 'constant';
import { toast } from 'layout';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

export default function GradeStructureTable() {
  const { classId } = useParams();
  // query
  const {
    mutate: addGradeCompositionMutate,
    isLoading: isAddGradeCompositionLoading,
    isSuccess: isAddGradeCompositionSuccess,
  } = useMutation({
    mutationFn: addGradeComposition,
  });
  const {
    data: gradeStructureData,
    // isLoading: isGradeStructureLoading,
    refetch,
  } = useQuery(
    ['gradeStructureData', classId],
    () => getGradeStructure(classId),
    { enabled: !!classId }
  );
  const gradeStructure = useMemo(
    () => gradeStructureData?.data,
    [gradeStructureData]
  );
  const [
    visibleAddGradeCompositionDialog,
    setVisibleAddGradeCompositionDialog,
  ] = useState(false);

  const {
    control,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // console.log('Data:', data);
    addGradeCompositionMutate(
      {
        classId: classId,
        name: data?.gradeComposition,
        gradeScale: data?.gradeScale,
      },
      {
        onSuccess() {
          toast(TOAST.SUCCESS, 'Add grade composition successfully!');
        },
        onError() {
          toast(TOAST.ERROR, 'Server error!');
        },
      }
    );
  };

  const footerComfirm = (
    <FooterComfirm
      isLoading={isAddGradeCompositionLoading}
      action='Save'
      setVisible={setVisibleAddGradeCompositionDialog}
      handleSubmit={handleSubmit(onSubmit)}
    />
  );
  useEffect(() => {
    if (isAddGradeCompositionSuccess) {
      setVisibleAddGradeCompositionDialog(false);
      refetch();
    }
  }, [isAddGradeCompositionSuccess]);
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
      <div className='current-grade-structure mt-2'>
        <DataTable
          header={formatHeader}
          value={gradeStructure}
          showGridlines
          stripedRows
          style={{ maxWidth: '50rem' }}
        >
          <Column rowReorder style={{ width: '1rem' }} />
          <Column field='name' header='Name' sortable />
          <Column field='gradeScale' header='Scale' sortable />
          <Column
            header='Actions'
            style={{ maxWidth: '4rem' }}
            body={formatActions}
          />
        </DataTable>
      </div>
      <AddGradeCompositionDialog
        visible={visibleAddGradeCompositionDialog}
        setVisible={setVisibleAddGradeCompositionDialog}
        control={control}
        errors={errors}
        footer={footerComfirm}
      />
    </div>
  );
}
