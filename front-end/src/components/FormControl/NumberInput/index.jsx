import './style.scss';

import { Controller, get } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { InputNumber } from 'primereact/inputnumber';
import { classNames } from 'primereact/utils';
import PropTypes from 'prop-types';
import React from 'react';

export default function NumberInput({
  label,
  name,
  placeholder,
  isRequired,
  disabled,
  control,
  errors,
  defaultValue,
  min,
  max,
  minFractionDigits,
  maxFractionDigits,
  useGrouping,
  onCustomChange,
  hidden,
}) {
  const { t } = useTranslation();
  return (
    <div className='field '>
      <label htmlFor={name} className='block'>
        {label}
        {isRequired && (
          <span className='text-red-500' style={{ fontWeight: 900 }}>
            *
          </span>
        )}
      </label>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field: { onChange, value, ref } }) => (
          <InputNumber
            inputId={name}
            value={value}
            onValueChange={(e) => {
              onChange(e.value ?? 0);
              onCustomChange(name, e.value ?? 0);
            }}
            placeholder={placeholder}
            min={min}
            max={max}
            minFractionDigits={minFractionDigits}
            maxFractionDigits={maxFractionDigits}
            useGrouping={useGrouping}
            inputRef={ref}
            className={classNames('number', {
              'p-invalid': !!get(errors, name),
              'surface-200': disabled,
            })}
            tooltip={t(get(errors, name)?.message)}
            tooltipOptions={{ position: 'bottom' }}
            disabled={disabled}
            hidden={hidden}
          />
        )}
      />
    </div>
  );
}

NumberInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  isRequired: PropTypes.bool,
  disabled: PropTypes.bool,
  control: PropTypes.shape({}).isRequired,
  errors: PropTypes.shape({}).isRequired,
  defaultValue: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  minFractionDigits: PropTypes.number,
  maxFractionDigits: PropTypes.number,
  useGrouping: PropTypes.bool,
  onCustomChange: PropTypes.func,
  hidden: PropTypes.bool,
};

NumberInput.defaultProps = {
  label: '',
  placeholder: '',
  isRequired: false,
  disabled: false,
  defaultValue: null, // or 0, it work with onValueChange. but not work with undefined
  min: 0,
  max: Number.MAX_VALUE,
  minFractionDigits: 0,
  maxFractionDigits: 5,
  useGrouping: false,
  onCustomChange: () => null,
  hidden: false,
};
