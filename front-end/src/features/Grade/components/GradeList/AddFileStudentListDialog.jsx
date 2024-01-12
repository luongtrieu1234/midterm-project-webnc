import PropTypes from 'prop-types';
import { CustomFileInput } from 'components/FormControl';
import { Dialog } from 'primereact/dialog';
import React from 'react';

export default function AddFileStudentListDialog({ visible, setVisible, control, errors, footer }) {
  return (
    <div className='card flex justify-content-center ml-6 mb-2'>
      <Dialog
        header='Add Grade Composition'
        visible={visible}
        style={{ width: '50vw' }}
        onHide={() => setVisible(false)}
        footer={footer}
      >
        <div className='p-fluid'>
          <CustomFileInput
            name='studentListFile'
            // defaultNameFile={'StudentList.xlsx'}
            control={control}
            errors={errors}
            accept='.xlsx'
            acceptFileMessage='Chỉ chấp nhận file excel (.xlsx)'
          />
        </div>
      </Dialog>
    </div>
  );
}

AddFileStudentListDialog.propTypes = {
  control: PropTypes.shape({}).isRequired,
  errors: PropTypes.shape({}).isRequired,
  footer: PropTypes.element.isRequired,
  setVisible: PropTypes.func.isRequired,
  visible: PropTypes.any.isRequired,
};
