import './style.scss';

import { Controller, get } from 'react-hook-form';

import { InputNumber } from 'primereact/inputnumber';
import { classNames } from 'primereact/utils';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import React from 'react';

export default function CurrencyInput({
  label,
  name,
  placeholder,
  min,
  max,
  isRequired,
  disabled,
  control,
  errors,
}) {
  const { t } = useTranslation();
  return (
    <div className='field'>
      <label htmlFor={name}>
        {label}{' '}
        {isRequired && (
          <span className='text-red-500' style={{ fontWeight: 900 }}>
            *
          </span>
        )}
      </label>
      <Controller
        control={control}
        name={name}
        defaultValue={0}
        render={({ field: { onChange, value, ref } }) => (
          <InputNumber
            inputId={name}
            value={value}
            onValueChange={(e) => {
              onChange(e.value ?? 0);
            }}
            placeholder={placeholder}
            min={min}
            max={max}
            mode='currency'
            currency='VND'
            locale='vi-VN'
            ref={ref}
            className={classNames('currency', {
              'p-invalid': !!get(errors, name),
              'surface-200': disabled,
            })}
            tooltip={t(get(errors, name)?.message)}
            tooltipOptions={{ position: 'bottom' }}
            disabled={disabled}
          />
        )}
      />
    </div>
  );
}

CurrencyInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  isRequired: PropTypes.bool,
  disabled: PropTypes.bool,
  control: PropTypes.shape({}).isRequired,
  errors: PropTypes.shape({}).isRequired,
};

CurrencyInput.defaultProps = {
  label: '',
  placeholder: '',
  min: 0,
  max: Number.MAX_VALUE,
  isRequired: false,
  disabled: false,
};
