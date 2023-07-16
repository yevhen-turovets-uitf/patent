import React from 'react';
import { useSelector } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import {
  SelectInput,
  PrimaryButton,
  CustomDatePicker
} from 'components';
import {
  close
} from 'images';
import {
  searchObjectTypeOptions,
  searchDocumentTypeOptions,
  searchStatusOptions
} from 'staticData';

export default React.memo(MobileFilters);

function MobileFilters({
  filtersPanel,
  setFiltersPanel,
  formActions: {
    onChangeGroup,
    onChangeObjectType,
    onChangeDocumentType,
    onChangeRegistrationPeriod,
    onChangePublicationPeriod,
    onChangeStatus,
    onChangeCategoryIndex,
    onClearFilters
  }
}) {
  const { mainForm: {
    group,
    objectType,
    documentType,
    registrationPeriod,
    publicationPeriod,
    status,
    categoryIndex
  } } = useSelector (({ openRegisters }) => openRegisters );

  return (
    <Dialog
      onClose={() => setFiltersPanel(false)}
      open={filtersPanel}
    >
      <div className="search-page__mobile-filters"> 
        <div className="search-page__mobile-filters-info"> 
          <div className="search-page__mobile-filters-header">
            <span>Фильтр</span>
            <div className="search-page__mobile-filters-close" onClick={() => setFiltersPanel(false)}>
              <img src={close} alt=""/>
            </div>
          </div>
          <div className="search-page__mobile-filters-inputs-container"> 
            <div className="search-page__mobile-filters-input">
              <div className="input-row">
                <label>Класс или группа</label>
                <input 
                  className="style1"
                  placeholder="Введите номер"
                  value={group}
                  onChange={onChangeGroup}
                />
              </div>
            </div>
            <div className="search-page__mobile-filters-input">
              <div className="input-row">
                <label>Вид объекта</label>
                <SelectInput
                  mobileSize="big"
                  placeholder="Все объекты" 
                  options={searchObjectTypeOptions}
                  value={objectType}
                  onChange={onChangeObjectType} 
                />
              </div>
            </div>
            <div className="search-page__mobile-filters-input"> 
              <div className="input-row"></div>
              <label>Тип документа</label>
              <SelectInput 
                mobileSize="big"
                placeholder="Все документы" 
                options={searchDocumentTypeOptions}
                value={documentType}
                onChange={onChangeDocumentType} 
              />
            </div>
            <div className="search-page__mobile-filters-input"> 
              <div className="input-row">
                <label>Период регистрации</label>
                <div className="search-page__mobile-filters-field">
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
            <div className="search-page__mobile-filters-input"> 
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
            <div className="search-page__mobile-filters-input"> 
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
            <div className="search-page__mobile-filters-input"> 
              <div className="input-row">
                <label>Период публикации</label>
                <div className="search-page__mobile-filters-field">
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
        <div className="search-page__mobile-filters-buttons">
          <PrimaryButton
            className="search-page__mobile-filters-clear"
            title="Очистить фильтр"
            onClick={onClearFilters}
          />
          <PrimaryButton
            className="search-page__mobile-filters-confirm"
            title="Найти"
            onClick={() => setFiltersPanel(false)}
          />
        </div>
      </div>
    </Dialog>
  );
};