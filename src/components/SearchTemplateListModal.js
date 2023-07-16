import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { PrimaryButton } from 'components';
import { closePres, searchPres } from 'images';

export default React.memo(SearchTemplateListModal);

function SearchTemplateListModal({
  onConfirm,
  onCancel,
  open,
  items
}) {
  const [inputState, setInputState] = useState(''),
    [activeItem, setActiveItem] = useState();

	return (
		<Dialog
      className="search-template-list-modal"
      onClose={onCancel}
      open={open}
    >
      <div className="search-template-list-modal__inner"> 
        <div className="search-template-list-modal__info"> 
          <div className="search-template-list-modal__header">
            <span>Сохранённые запросы</span>
            <div
              className="search-template-list-modal__header-cancel"
              onClick={onCancel}
            >
              <img src={closePres} alt=""/>
            </div>
          </div>
          <div className="search-template-list-modal__input"> 
            <input
              className="style1"
              placeholder="Название запроса"
              value={inputState}
              onChange={e => setInputState(e.target.value)}
            />
            <img src={searchPres} alt=""/>
          </div>
          <div className="search-template-list-modal__content">
            {items.map(({ name, date, register}, index) => (
              <div
                key={name + date}
                className={`search-template-list-modal__item${activeItem === index ? ' active' : ''}`}
                onClick={() => setActiveItem(index)}
              >
                <span>{name}</span>
                <p>{date}, {register}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="search-template-list-modal__buttons">
          <PrimaryButton
            className="search-template-list-modal__cancel"
            title="Отмена"
            onClick={onCancel}
          />
          <PrimaryButton
            className="search-template-list-modal__save"
            title="Применить запрос"
            onClick={onConfirm}
          />
        </div>
      </div>
		</Dialog>
	);
}
