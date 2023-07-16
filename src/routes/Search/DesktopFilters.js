import React from 'react';
import { useSelector } from 'react-redux';
import { SelectInput, CustomDatePicker } from 'components';
import {
  searchStatusOptions
} from 'staticData';

export default React.memo(DesktopFilters);

function DesktopFilters({
  formActions: {
    onChangeRegistrationPeriod,
    onChangePublicationPeriod,
    onChangeStatus,
    onChangeCategoryIndex
  }
}) {
  const { mainForm: {
    registrationPeriod,
    publicationPeriod,
    status,
    categoryIndex
  } } = useSelector (({ openRegisters }) => openRegisters );

  return (
    <div className="search-page__desktop-filters">
      <div className="search-page__desktop-filters-inputs-container"> 
        <div className="search-page__desktop-filters-input"> 
          <div className="input-row">
            <label>Период регистрации</label>
            <div className="search-page__desktop-filters-field">
              <CustomDatePicker
                className="search-page__date-picker"
                cancelLabel="отмена"
                okLabel="подтвердить"
                maxDateMessage="Неверная дата"
                minDateMessage="Неверная дата"
                invalidDateMessage="Неверная дата"
                inputVariant="outlined"
                format="DD/MM/YYYY"
                label="Начало"
                value={registrationPeriod.start}
                onChange={date => onChangeRegistrationPeriod({
                  start: date
                })}
              />
              <CustomDatePicker
                className="search-page__date-picker"
                cancelLabel="отмена"
                okLabel="подтвердить"
                maxDateMessage="Неверная дата"
                minDateMessage="Неверная дата"
                invalidDateMessage="Неверная дата"
                inputVariant="outlined"
                format="DD/MM/YYYY"
                label="Конец"
                value={registrationPeriod.end}
                onChange={date => onChangeRegistrationPeriod({
                  end: date
                })}
              />
            </div>
          </div>
        </div>
        <div className="search-page__desktop-filters-input"> 
          <div className="input-row">
            <label>Статус</label>
            <SelectInput
              mobileSize="big"
              placeholder="Прекращение права собственности" 
              options={searchStatusOptions}
              value={status}
              onChange={onChangeStatus}
            />
          </div>
        </div>
        <div className="search-page__desktop-filters-input"> 
          <div className="input-row">
            <label>Индекс рубрики</label>
            <input
              className="style1"
              placeholder="Введите номер"
              value={categoryIndex}
              onChange={onChangeCategoryIndex}
            />
          </div>
        </div>
        <div className="search-page__desktop-filters-input"> 
          <div className="input-row">
            <label>Период публикации</label>
            <div className="search-page__desktop-filters-field">
              <CustomDatePicker
                className="search-page__date-picker"
                cancelLabel="отмена"
                okLabel="подтвердить"
                maxDateMessage="Неверная дата"
                minDateMessage="Неверная дата"
                invalidDateMessage="Неверная дата"
                inputVariant="outlined"
                format="DD/MM/YYYY"
                label="Начало"
                value={publicationPeriod.start}
                onChange={date => onChangePublicationPeriod({
                  start: date
                })}
              />
              <CustomDatePicker
                className="search-page__date-picker"
                cancelLabel="отмена"
                okLabel="подтвердить"
                maxDateMessage="Неверная дата"
                minDateMessage="Неверная дата"
                invalidDateMessage="Неверная дата"
                inputVariant="outlined"
                format="DD/MM/YYYY"
                label="Конец"
                value={publicationPeriod.end}
                onChange={date => onChangePublicationPeriod({
                  end: date
                })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};