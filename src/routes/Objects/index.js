import React, { useState, useCallback } from 'react';
import { useMediaQuery } from 'react-responsive';
import Collapse from '@material-ui/core/Collapse';
import {
	arrows,
	filters
} from 'images';
import {
	SelectInput
} from 'components';
import {
	objectsTypesSelectOptions
} from 'staticData';
import ListElement from './ListElement';

export default React.memo(Objects);

function Objects() {
	const
	isSmallScreen = useMediaQuery({
    query: '(max-width: 768px)'
  }),
	[isFiltersOpen, setFiltersOpen] = useState(false),
	[filterInputValue, setFilterInputValue] = useState(''),
	[objectsTypesSelectValue, setObjectsTypesSelectValue] = useState('all'),
	[objectsPeriodsSelectValue, setObjectsPeriodsSelectValue] = useState('all'),
	onChangeFilterInput = useCallback (
    e => setFilterInputValue(e.target.value),
    []
  ),
	onChangeObjectsTypesSelect = useCallback (
    e => setObjectsTypesSelectValue(e.target.value),
    []
  ),
	onChangeObjectsPeriodsSelect = useCallback (
    e => setObjectsPeriodsSelectValue(e.target.value),
    []
  );

	return (
		<div className="objects">
			<Collapse
				in={!isFiltersOpen}
				timeout={400}
			>
				<div className="objects__filters-container">
					<div className="objects__filters-input input-row last">
						<input 
							className="style1"
							placeholder="Введите номер, название или дату регистрации ОИС"
							value={filterInputValue}
							onChange={onChangeFilterInput}
						/>
					</div>
					<div className="objects__filters-buttons">
						<div className="objects__sort-button">
							<img src={arrows} alt="#"/>
							Сначала новые
						</div>
						<div
							className="objects__filter-button"
							onClick={() => setFiltersOpen(true)}
						>
							<img src={filters} alt="#"/>
							Фильтр
						</div>
					</div>
				</div>
			</Collapse>
			<Collapse
				in={isFiltersOpen}
				timeout={400}
			>
				<div className="objects__inner-filters-container">
					<div className="objects__inner-filters-fields">
						<div className="objects__object-type-select input-row last">
							<label>Вид объекта интеллектуальной собственности</label>
							<SelectInput
								mobileSize="big"
								options={objectsTypesSelectOptions}
								value={objectsTypesSelectValue}
								onChange={onChangeObjectsTypesSelect} 
							/>
						</div>
						<div className="objects__object-period-select input-row last">
							<label>Период</label>
							<SelectInput
								mobileSize="big"
								options={fakeObjectsPeriodsSelectOptions}
								value={objectsPeriodsSelectValue}
								onChange={onChangeObjectsPeriodsSelect} 
							/>
						</div>
					</div>
					<div className="objects__inner-filters-buttons">
						<div
							className="objects__search-button"
							onClick={() => {}}
						>
							Показать
						</div>
						<div
							className="objects__hidden-button"
							onClick={() => setFiltersOpen(false)}
						>
							Скрыть
						</div>
					</div>
				</div>
			</Collapse>
			<div className="objects__items-container">
        {fakeItems.map((item) => (
          <ListElement 
            key={item.number}
            {...{ ...item, isSmallScreen}}
          />
        ))}
      </div>
		</div>
	);
}

const fakeObjectsPeriodsSelectOptions = [
	{ label: 'За все время', value: 'all' },
  { label: '2022', value: '2022' },
  { label: '2021', value: '2021' }
];

const fakeItems = [
  {
    number: 'RU 99999991',
    title: 'Название объекта интеллектуальной собственности',
		type: 'Вид объекта интеллектуальной собственности',
    date: '13.11.2019'
  },
  {
    number: 'RU 99999992',
    title: 'Название объекта интеллектуальной собственности',
		type: 'Вид объекта интеллектуальной собственности',
    date: '13.11.2019'
  },
  {
    number: 'RU 99999993',
    title: 'Название объекта интеллектуальной собственности',
		type: 'Вид объекта интеллектуальной собственности',
    date: '13.11.2019'
  },
  {
    number: 'RU 99999994',
    title: 'Название объекта интеллектуальной собственности',
		type: 'Вид объекта интеллектуальной собственности',
    date: '13.11.2019'
  },
  {
    number: 'RU 99999995',
    title: 'Название объекта интеллектуальной собственности',
		type: 'Вид объекта интеллектуальной собственности',
    date: '13.11.2019'
  },
  {
    number: 'RU 99999996',
    title: 'Название объекта интеллектуальной собственности',
		type: 'Вид объекта интеллектуальной собственности',
    date: '13.11.2019'
  },
  {
    number: 'RU 99999997',
    title: 'Название объекта интеллектуальной собственности',
		type: 'Вид объекта интеллектуальной собственности',
    date: '13.11.2019'
  }
];