import PropTypes from 'prop-types';
import React from 'react';
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

export default function GradeList({
  data,
  setVisibleAddGradeCompositionDialog,
}) {
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
        />
      </div>
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

GradeList.propTypes = {
  setVisibleAddGradeCompositionDialog: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};
