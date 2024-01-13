import PropTypes from 'prop-types';
import { Dialog } from 'primereact/dialog';
import React from 'react';

export default function DeleteGradeCompositionDialog({
  visible,
  setVisible,
  // eslint-disable-next-line no-unused-vars
  control,
  // eslint-disable-next-line no-unused-vars
  errors,
  footer,
}) {
  return (
    <div className='card flex justify-content-center ml-6 mb-2'>
      <Dialog
        header='Update grade composition'
        visible={visible}
        style={{ width: '50vw' }}
        onHide={() => setVisible(false)}
        footer={footer}
      >
        <div className='text-base'>Are you sure you want to delete grade composition</div>
      </Dialog>
    </div>
  );
}

DeleteGradeCompositionDialog.propTypes = {
  control: PropTypes.shape({}).isRequired,
  errors: PropTypes.shape({}).isRequired,
  footer: PropTypes.element.isRequired,
  setVisible: PropTypes.func.isRequired,
  visible: PropTypes.any.isRequired,
};
