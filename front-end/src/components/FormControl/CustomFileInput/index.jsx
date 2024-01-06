import './style.scss';
import { Controller, get } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FileUpload } from 'primereact/fileupload';
import { classNames } from 'primereact/utils';

import PropTypes from 'prop-types';
import { toast } from 'layout';
import { TOAST } from 'constant';
import React from 'react';

export default function CustomFileInput({
  label,
  name,
  defaultNameFile,
  isRequired,
  disabled,
  multiple,
  accept,
  acceptFileMessage,
  control,
  errors,
  isFontWeightLabel,
  setFileUrl,
  acceptOnly,
  innerRef,
}) {
  const { t } = useTranslation();

  const uploadHandler = (event, onChange) => {
    if (multiple) {
      onChange(event.files);
    } else {
      const fileName = event.files[0]?.name;
      let fileExt = fileName?.split('.').pop();
      fileExt = fileExt === fileName ? '' : `.${fileExt}`;

      if (accept !== '*') {
        const acceptExts = accept?.split(',');
        if (!acceptExts.includes(fileExt)) {
          toast(TOAST.ERROR, acceptFileMessage);
          return;
        }
      }
      const file = new File([event.files[0]], defaultNameFile ?? fileName, {
        type: event.files[0].type,
      });
      onChange(file);
      setFileUrl('');
    }
  };

  const handleRemoveFile = (fileToRemove, currentFiles, onChange) => {
    if (multiple) {
      const files = currentFiles.filter((file) => file !== fileToRemove);
      onChange(files);
    } else {
      onChange(null);
    }
  };

  return (
    <div className={`field ${get(errors, name) ? 'invalid-file-input' : ''}`}>
      <label
        htmlFor={name}
        style={isFontWeightLabel ? { fontWeight: 900 } : {}}
      >
        {label}{' '}
        {isRequired && (
          <span className='text-red-500' style={{ fontWeight: 900 }}>
            *
          </span>
        )}
        {get(errors, name) && (
          <span className='text-red-500' style={{ fontWeight: 900 }}>
            {t(get(errors, name)?.message)}
          </span>
        )}
      </label>
      <Controller
        control={control}
        name={name}
        defaultValue={null}
        render={({ field: { onChange, value } }) => (
          <FileUpload
            ref={innerRef}
            name={name}
            multiple={multiple}
            accept={accept}
            maxFileSize={100000000}
            emptyTemplate={
              // eslint-disable-next-line react/jsx-wrap-multilines
              <p className='m-0'>
                {t('formControl.fileInput')}{' '}
                <span className='text-red-500'>
                  {acceptOnly ? `(${t(`formControl.${acceptOnly}`)})` : ''}
                </span>
              </p>
            }
            chooseLabel={t('formControl.fileBrowse')}
            customUpload
            uploadHandler={(event) => {
              uploadHandler(event, onChange);
            }}
            className={classNames({
              'p-invalid': !!get(errors, name),
              'surface-200': disabled,
              'border-red-500': true,
            })}
            disabled={disabled}
            auto
            onRemove={(event) => {
              handleRemoveFile(event.file, value, onChange);
            }}
          />
        )}
      />
    </div>
  );
}

CustomFileInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  defaultNameFile: PropTypes.string,
  isRequired: PropTypes.bool,
  disabled: PropTypes.bool,
  multiple: PropTypes.bool,
  accept: PropTypes.string,
  acceptFileMessage: PropTypes.string,
  control: PropTypes.shape({}).isRequired,
  errors: PropTypes.shape({}).isRequired,
  isFontWeightLabel: PropTypes.bool,
  setFileUrl: PropTypes.func,
  acceptOnly: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  innerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
};

CustomFileInput.defaultProps = {
  label: '',
  name: '',
  defaultNameFile: null,
  isRequired: false,
  disabled: false,
  multiple: false,
  accept: '*',
  isFontWeightLabel: false,
  acceptFileMessage: '',
  acceptOnly: '',
  setFileUrl: () => {},
  innerRef: null,
};
