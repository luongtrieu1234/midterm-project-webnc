import { Checkbox } from 'primereact/checkbox';
import { classNames } from 'primereact/utils';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller, get } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export default function Tickbox({
  icon,
  label,
  name,
  isRequired,
  disabled,
  control,
  errors,
  autoFocus,
  onCustomeCheck,
}) {
  // #region data
  const { t } = useTranslation();
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
      <Controller
        control={control}
        name={name}
        defaultValue={null}
        render={({ field: { onChange, value, ref } }) => (
          <Checkbox
            icon={icon}
            inputId={name}
            checked={value}
            inputRef={ref}
            className={classNames({
              'p-invalid': !!get(errors, name),
              'surface-200': disabled,
            })}
            onChange={(e) => {
              onChange(e);
              onCustomeCheck(name, e.checked);
            }}
            autoFocus={autoFocus}
            tooltip={t(get(errors, name)?.message)}
            tooltipOptions={{ position: 'bottom' }}
            disabled={disabled}
          />
        )}
      />
    </div>
  );
}

Tickbox.propTypes = {
  icon: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  autoFocus: PropTypes.bool,
  isRequired: PropTypes.bool,
  disabled: PropTypes.bool,
  control: PropTypes.shape({}).isRequired,
  errors: PropTypes.shape({}).isRequired,
  onCustomeCheck: PropTypes.func,
};

Tickbox.defaultProps = {
  label: '',
  icon: 'pi pi-check',
  autoFocus: false,
  isRequired: false,
  disabled: false,
  onCustomeCheck: () => null,
};
