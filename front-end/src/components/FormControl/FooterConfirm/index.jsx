import PropTypes from 'prop-types';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import React from 'react';

export default function FooterComfirm({
  action,
  isLoading,
  setVisible,
  handleSubmit,
}) {
  return (
    <div>
      <Button
        label='Cancel'
        icon='pi pi-times'
        onClick={() => setVisible(false)}
        className='p-button-text'
      />
      <Button
        label={action}
        icon={classNames('pi pi-check', {
          'pi-spin pi-spinner': isLoading,
          'pi pi-check': !isLoading,
        })}
        onClick={handleSubmit}
        autoFocus
      />
    </div>
  );
}

FooterComfirm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  action: PropTypes.any.isRequired,
  isLoading: PropTypes.bool,
  setVisible: PropTypes.func.isRequired,
};

FooterComfirm.defaultProps = {
  isLoading: false,
};
