import './style.scss';

import { Controller, get } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { InputTextarea } from 'primereact/inputtextarea';
import { classNames } from 'primereact/utils';
import PropTypes from 'prop-types';

import { NON_PRINTABLE_REGEX } from 'constant';
import React from 'react';

export default function TextareaInput({
  label,
  name,
  placeholder,
  row,
  isRequired,
  disabled,
  control,
  errors,
  defaultValue,
  hidden,
}) {
  const { t } = useTranslation();
  return (
    <>
      {label && (
        <label htmlFor={name} className='inline-block mb-2'>
          {label}{' '}
          {isRequired && (
            <span className='text-red-500' style={{ fontWeight: 900 }}>
              *
            </span>
          )}
        </label>
      )}
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field: { onChange, value, ref } }) => (
          <InputTextarea
            autoResize
            id={name}
            value={value}
            placeholder={placeholder}
            onChange={(e) => {
              const formattedValue = e.target.value?.replace(
                NON_PRINTABLE_REGEX,
                ''
              );
              onChange(formattedValue);
            }}
            rows={row}
            ref={ref}
            className={classNames('relative', {
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
    </>
  );
}

TextareaInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  row: PropTypes.number,
  isRequired: PropTypes.bool,
  disabled: PropTypes.bool,
  control: PropTypes.shape({}).isRequired,
  errors: PropTypes.shape({}).isRequired,
  defaultValue: PropTypes.string,
  hidden: PropTypes.bool,
};

TextareaInput.defaultProps = {
  label: '',
  placeholder: '',
  row: 1,
  isRequired: false,
  disabled: false,
  defaultValue: '',
  hidden: false,
};
