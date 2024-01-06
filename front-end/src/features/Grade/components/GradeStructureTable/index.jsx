import PropTypes from 'prop-types';
import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';

export default function GradeStructureTable({
  data,
  setVisibleAddGradeCompositionDialog,
}) {
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
    <div className='current-grade-structure mt-2'>
      <DataTable
        header={formatHeader}
        value={data}
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
  );
}

GradeStructureTable.propTypes = {
  setVisibleAddGradeCompositionDialog: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};
