import { Controller, get } from 'react-hook-form';

import { AutoComplete } from 'primereact/autocomplete';
import { classNames } from 'primereact/utils';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import React from 'react';

export default function Combobox({
  label,
  name,
  items,
  renderField,
  search,
  itemTemplate,
  isRequired,
  showClear,
  disabled,
  control,
  errors,
  placeholder,
  onSearchChange,
  onSearchRemove,
  onBlur,
}) {
  const { t } = useTranslation();
  const handleOnBlur = (field) => {
    if (!field.value?.id) {
      field.onChange(null);
    }
  };

  return (
    <>
      <label htmlFor={name} className='inline-block mb-2'>
        {label}{' '}
        {isRequired && (
          <span className='text-red-500' style={{ fontWeight: 900 }}>
            *
          </span>
        )}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className='relative'>
            <AutoComplete
              inputId={field.name}
              value={field.value}
              field={renderField}
              inputRef={field.ref}
              suggestions={items}
              completeMethod={search}
              onChange={field.onChange}
              onSelect={(e) => {
                field.onChange(e.value);
                onSearchChange(name, e.value);
              }}
              onBlur={() => {
                if (onBlur) {
                  onBlur(field.value);
                } else handleOnBlur(field);
              }}
              itemTemplate={itemTemplate}
              placeholder={placeholder}
              className={classNames({
                'p-invalid': !!get(errors, name),
                'surface-200': disabled,
              })}
              tooltip={t(get(errors, name)?.message)}
              tooltipOptions={{ position: 'bottom' }}
              disabled={disabled}
            />
            {!disabled && field.value && showClear && (
              <i
                onClick={() => {
                  field.onChange(null);
                  onSearchRemove(name);
                }}
                className='pi pi-times absolute text-red-700 cursor-pointer'
                style={{ right: 10, top: 14 }}
              />
            )}
          </div>
        )}
      />
    </>
  );
}

Combobox.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  renderField: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  items: PropTypes.array.isRequired,
  search: PropTypes.func.isRequired,
  itemTemplate: PropTypes.func,
  isRequired: PropTypes.bool,
  showClear: PropTypes.bool,
  disabled: PropTypes.bool,
  control: PropTypes.shape({}).isRequired,
  errors: PropTypes.shape({}).isRequired,
  placeholder: PropTypes.string,
  onSearchChange: PropTypes.func,
  onSearchRemove: PropTypes.func,
  onBlur: PropTypes.func,
};

Combobox.defaultProps = {
  label: '',
  itemTemplate: null,
  isRequired: false,
  showClear: true,
  placeholder: '',
  onSearchChange: () => null,
  onSearchRemove: () => null,
  onBlur: false,
  disabled: false,
};
