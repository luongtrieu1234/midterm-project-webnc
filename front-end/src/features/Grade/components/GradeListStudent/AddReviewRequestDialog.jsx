import PropTypes from 'prop-types';
import { NumberInput, TextInput, TextareaInput } from 'components/FormControl';
import { Dialog } from 'primereact/dialog';
import React from 'react';

export default function AddReviewRequestDialog({ visible, setVisible, control, errors, footer }) {
  return (
    <div className='card flex justify-content-center ml-6 mb-2'>
      <Dialog
        header='Add Review Request'
        visible={visible}
        style={{ width: '50vw' }}
        onHide={() => setVisible(false)}
        footer={footer}
      >
        <div className='p-fluid grid'>
          <div className='col-12'>
            <TextInput
              name='fullName'
              disabled
              label='Full name'
              control={control}
              errors={errors}
            />
          </div>
          <div className='grid col-12 align-items-center'>
            <div className='col-6'>
              <TextInput
                name='gradeCompositionName'
                label='Assignment'
                disabled
                control={control}
                errors={errors}
              />
            </div>
            <div className='col-6'>
              <NumberInput
                name='expectedGrade'
                label='Expected Grade'
                control={control}
                errors={errors}
              />
            </div>
          </div>
          <div className='col-12'>
            <TextareaInput
              name='explanation'
              label='Explanation'
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

AddReviewRequestDialog.propTypes = {
  control: PropTypes.shape({}).isRequired,
  errors: PropTypes.shape({}).isRequired,
  footer: PropTypes.element.isRequired,
  setVisible: PropTypes.func.isRequired,
  visible: PropTypes.any.isRequired,
};
