import PropTypes from 'prop-types';
import { NumberInput, TextInput, TextareaInput } from 'components/FormControl';
import { Dialog } from 'primereact/dialog';
import React from 'react';

export default function AddGradeCompositionDialog({
  visible,
  setVisible,
  control,
  errors,
  footer,
}) {
  return (
    <div className='card flex justify-content-center ml-6 mb-2'>
      <Dialog
        header='Add Grade Composition'
        visible={visible}
        style={{ width: '50vw' }}
        onHide={() => setVisible(false)}
        footer={footer}
      >
        <div className='grid p-fluid'>
          <div className='grid col-12'>
            <div className='col-6'>
              <TextInput
                label='Grade Composition'
                name='gradeCompositionName'
                control={control}
                errors={errors}
              />
            </div>
            <div className='col-6'>
              <NumberInput
                label='Grade Scale'
                name='gradeScale'
                control={control}
                errors={errors}
              />
            </div>
          </div>
          <div className='col-12'>
            <TextareaInput
              label='Content'
              name='content'
              row={3}
              control={control}
              errors={errors}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
}

AddGradeCompositionDialog.propTypes = {
  control: PropTypes.shape({}).isRequired,
  errors: PropTypes.shape({}).isRequired,
  footer: PropTypes.element.isRequired,
  setVisible: PropTypes.func.isRequired,
  visible: PropTypes.any.isRequired,
};
