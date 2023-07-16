import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { PrimaryButton } from 'components';

export default React.memo(SearchTemplateModal);

function SearchTemplateModal({
  onConfirm,
  onCancel,
  open,
  inputState,
  setInputState
}) {
	return (
		<Dialog
      className="search-template-modal"
      onClose={onCancel}
      open={open}
    >
      <div className="search-template-modal__inner"> 
        <div className="search-template-modal__title">Введите название запроса</div>
        <div className="search-template-modal__input"> 
          <input
            className="style1"
            placeholder="Название запроса"
            value={inputState}
            onChange={e => setInputState(e.target.value)}
          />
        </div>
        <div className="search-template-modal__buttons">
          <PrimaryButton
            className="search-template-modal__save"
            title="Сохранить запрос"
            onClick={onConfirm}
          />
          <PrimaryButton
            className="search-template-modal__cancel"
            title="Отмена"
            onClick={onCancel}
          />
        </div>
      </div>
		</Dialog>
	);
}
