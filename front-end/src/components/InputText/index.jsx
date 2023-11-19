import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';
import { classNames } from 'primereact/utils';
import { InputText } from 'primereact/inputtext';
function InputTextComponent({ name, control, autoFocus, disabled }) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: `${name} is required.` }}
      render={({ field, fieldState }) => (
        <InputText
          id={field.name}
          {...field}
          autoFocus={autoFocus}
          disabled={disabled}
          className={classNames({ 'p-invalid': fieldState.invalid })}
          style={{ color: '#000' }}
        />
      )}
    />
  );
}

InputTextComponent.propTypes = {
  autoFocus: PropTypes.string,
  disabled: PropTypes.bool,
  control: PropTypes.any.isRequired,
  name: PropTypes.string.isRequired,
};

InputTextComponent.defaultProps = {
  autoFocus: false,
  disabled: false,
};
export default InputTextComponent;
