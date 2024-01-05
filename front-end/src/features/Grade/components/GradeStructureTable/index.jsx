import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';

export default function GradeStructureTable({
  setVisibleAddGradeCompositionDialog,
}) {
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState([
    { id: 1, name: 'Điểm giữa kỳ', scale: '0-10' },
    { id: 2, name: 'Điểm cuối kì', scale: '0-10' },
    { id: 3, name: 'Điểm đồ án', scale: '0-10' },
  ]);
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
        <Column field='scale' header='Scale' sortable />
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
};
