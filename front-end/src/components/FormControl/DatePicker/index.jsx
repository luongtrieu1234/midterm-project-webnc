import { Controller, get } from 'react-hook-form';

import { Calendar } from 'primereact/calendar';
import { classNames } from 'primereact/utils';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { addLocale } from 'primereact/api';
import React from 'react';

const dayNames = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];

export default function DatePicker({
  label,
  name,
  isRequired,
  disabled,
  control,
  errors,
}) {
  const { t } = useTranslation();

  addLocale('vi', {
    firstDayOfWeek: 1,
    dayNames: dayNames.map((dayName) =>
      t(`formControl.dateLocale.dayNames.${dayName}`)
    ),
    dayNamesShort: dayNames.map((dayName) =>
      t(`formControl.dateLocale.dayNamesShort.${dayName.slice(0, 3)}`)
    ),
    dayNamesMin: dayNames.map((dayName) =>
      t(`formControl.dateLocale.dayNamesShort.${dayName.slice(0, 3)}`)
    ),
    monthNames: Array(12)
      .fill(null)
      .map((e, i) => `${t('formControl.dateLocale.month')} ${i + 1}`),
    monthNamesShort: Array(12)
      .fill(null)
      .map((e, i) => `${t('formControl.dateLocale.monthShort')} ${i + 1}`),
    today: t('formControl.dateLocale.today'),
    clear: t('formControl.dateLocale.clear'),
  });

  return (
    <div className='field'>
      {(label !== '' || isRequired) && (
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
        render={({ field: { onChange, value, ref } }) => (
          <Calendar
            showIcon
            showButtonBar
            value={value}
            onChange={(e) => onChange(e.value)}
            ref={ref}
            dateFormat='dd/mm/yy'
            locale={t('lang') !== 'lang' ? t('lang') : 'vi'}
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
    </div>
  );
}

DatePicker.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  disabled: PropTypes.bool,
  control: PropTypes.shape({}).isRequired,
  errors: PropTypes.shape({}).isRequired,
};

DatePicker.defaultProps = {
  label: '',
  isRequired: false,
  disabled: false,
};
