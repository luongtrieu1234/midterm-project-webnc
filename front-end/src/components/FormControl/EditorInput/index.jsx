import './style.scss';

import { useRef } from 'react';
import { Controller, get } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Editor } from 'primereact/editor';
import { Tooltip } from 'primereact/tooltip';
import { classNames } from 'primereact/utils';
import PropTypes from 'prop-types';
import React from 'react';

export default function EditorInput({
  label,
  name,
  placeholder,
  isRequired,
  disabled,
  readOnly,
  control,
  errors,
  height,
}) {
  const { t } = useTranslation();
  const currentValue = useRef('');

  return (
    <>
      {label && (
        <label htmlFor={name} className='inline-block mb-2'>
          {label}
          {isRequired && (
            <span className='text-red-500' style={{ fontWeight: 900 }}>
              {' '}
              *
            </span>
          )}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        defaultValue=''
        render={({ field: { value, onChange } }) => {
          currentValue.current = (value ?? '')?.replace(/<[^>]+>(<br>)+<\/[^>]+>/g, '');

          if (currentValue.current !== value) {
            // update the rendered text at 1st.
            // This may cause a warning but I put here to temporarily fix the auto-adding-breaks bug
            onChange(currentValue.current);
          }

          return (
            <Editor
              id={name}
              value={value}
              onTextChange={(e) => {
                const htmlValue = (e.htmlValue ?? '')?.replace(/<[^>]+>(<br>)+<\/[^>]+>/g, '');
                if (htmlValue !== currentValue?.current) {
                  onChange(htmlValue);
                }
              }}
              style={{ height: `${height}` }}
              placeholder={placeholder}
              className={classNames('relative', 'custom-tooltip-for-editor-input', {
                'p-invalid': !!get(errors, name),
                'surface-200': disabled,
                'hide-image-button': true,
                'ql-container': true,
              })}
              readOnly={readOnly}
            />
          );
        }}
      />
      <Tooltip
        target='.custom-tooltip-for-editor-input'
        content={t(get(errors, name)?.message)}
        position='bottom'
      />
    </>
  );
}

EditorInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  isRequired: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  control: PropTypes.shape({}).isRequired,
  errors: PropTypes.shape({}).isRequired,
  height: PropTypes.string,
};

EditorInput.defaultProps = {
  label: '',
  placeholder: '',
  isRequired: false,
  disabled: false,
  readOnly: false,
  height: '300px',
};
