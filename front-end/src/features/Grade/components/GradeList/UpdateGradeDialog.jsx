import PropTypes from 'prop-types';
import { NumberInput, TextInput } from 'components/FormControl';
import { Dialog } from 'primereact/dialog';
import React from 'react';

export default function UpdateGradeDialog({ visible, setVisible, control, errors, footer }) {
  return (
    <div className='card flex justify-content-center ml-6 mb-2'>
      <Dialog
        header='Add Grade Composition'
        visible={visible}
        style={{ width: '50vw' }}
        onHide={() => setVisible(false)}
        footer={footer}
      >
        <div className='p-fluid grid'>
          <div className='col-12'>
            <TextInput name='fullName' label='Full name' control={control} errors={errors} />
          </div>
          <div className='grid col-12 align-items-center'>
            <div className='col-6'>
              <TextInput
                name='gradeCompositionName'
                label='Assignment'
                control={control}
                errors={errors}
              />
            </div>
            <div className='col-6'>
              <NumberInput name='grade' label='Grade' control={control} errors={errors} />
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

UpdateGradeDialog.propTypes = {
  control: PropTypes.shape({}).isRequired,
  errors: PropTypes.shape({}).isRequired,
  footer: PropTypes.element.isRequired,
  setVisible: PropTypes.func.isRequired,
  visible: PropTypes.any.isRequired,
};
