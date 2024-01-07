import './style.scss';

import { useRef, useState } from 'react';

import { Controller, get } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';

import PropTypes from 'prop-types';
import { OverlayPanel } from 'primereact/overlaypanel';

import { NON_PRINTABLE_REGEX } from 'constant';
import React from 'react';

export default function TextInput({
  label,
  name,
  type,
  placeholder,
  isRequired,
  disabled,
  control,
  errors,
  autoFocus,
}) {
  // #region data
  const { t } = useTranslation();
  const op = useRef(null);
  const [isShowPassword, setIsShowPassword] = useState(false);
  // #endregion

  // #region event
  const handleOnClickShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };
  // #endregion

  return (
    <div className='field text-input'>
      {label && (
        <label htmlFor={name}>
          {label}{' '}
          {isRequired && (
            <span className='text-red-500' style={{ fontWeight: 900 }}>
              *
            </span>
          )}
        </label>
      )}
      {type === 'password' && (
        <>
          <i
            className='pi pi-question-circle ml-2 cursor-pointer'
            onClick={(e) => op.current.toggle(e)}
          />
          <OverlayPanel ref={op} className='w-18rem'>
            {t('signup.validationErrors.detailPasswordRule')}
          </OverlayPanel>
        </>
      )}
      <div className={type === 'password' ? 'p-input-icon-right' : ''}>
        <Controller
          control={control}
          name={name}
          defaultValue=''
          render={({ field: { onChange, value, ref } }) => (
            <InputText
              id={name}
              // eslint-disable-next-line no-nested-ternary
              type={type === 'password' ? (isShowPassword ? 'text' : 'password') : type}
              placeholder={placeholder}
              onChange={(e) => {
                const formattedValue = e.target.value?.replace(NON_PRINTABLE_REGEX, '');
                onChange(formattedValue);
              }}
              value={value}
              autoFocus={autoFocus}
              ref={ref}
              className={classNames({
                'p-invalid': !!get(errors, name),
                'surface-200': disabled,
              })}
              tooltip={t(get(errors, name)?.message)}
              tooltipOptions={{ position: 'bottom' }}
              disabled={disabled}
            />
          )}
        />

        {type === 'password' && (
          <i
            className={isShowPassword ? 'pi pi-eye' : 'pi pi-eye-slash'}
            onClick={handleOnClickShowPassword}
            style={{ cursor: 'pointer' }}
          />
        )}
      </div>
    </div>
  );
}

TextInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
  isRequired: PropTypes.bool,
  disabled: PropTypes.bool,
  control: PropTypes.shape({}).isRequired,
  errors: PropTypes.shape({}).isRequired,
};

TextInput.defaultProps = {
  label: '',
  type: 'text',
  placeholder: '',
  autoFocus: false,
  isRequired: false,
  disabled: false,
};
