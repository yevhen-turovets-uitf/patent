import React, { useCallback } from 'react';
import { useHistory } from 'react-router';
import Dialog from '@material-ui/core/Dialog';
import { PrimaryButton, DropDownSection, Waiter } from 'components';
import {
  panelRoute,
  accreditedCertificationCentersLink,
  openSourceRegistryLink
} from 'urls';

export default React.memo(StatementInfoModal);

function StatementInfoModal({ onConfirm, onCancel, open, disabled = false }) {
	const
    history = useHistory(),
    onClose = useCallback(
      () => {
        onCancel();
        history.push(panelRoute);
      },
      [history, onCancel]
    );

	return (
    <Dialog
      className="statement-info-modal"
      onClose={onCancel}
      open={open}
    >
      <div className="statement-info-modal__wrapper">
        <div className="statement-info-modal__title">
          Для подачи заявления будет необходимо сформировать открепленную усиленную электронную подпись.
        </div>
        <div className="statement-info-modal__content">
          <DropDownSection title="Как получить усиленную электронную подпись">
            <div className="statement-info-modal__text">
              Получить квалифицированный сертификат электронной подписи можно в
              {' '}
              <a href={accreditedCertificationCentersLink} target="_blank" rel="noreferrer">
                аккредитованных удостоверяющих центрах.
              </a>
            </div>
            <div className="statement-info-modal__text">
              Для получения квалифицированного сертификата электронной подписи физическими лицами требуются:
            </div>
            <ul className="statement-info-modal__list">
              <li>личное присутствие;</li>
              <li>основной документ, удостоверяющий личность (паспорт);</li>
              <li>страховое свидетельство государственного пенсионного страхования заявителя (СНИЛС).</li>
            </ul>
            <div className="statement-info-modal__text">
              Для получения квалифицированного сертификата электронной подписи юридическим лицами требуются:
            </div>
            <ul className="statement-info-modal__list">
              <li>учредительные документы;</li>
              <li>документ, подтверждающий факт внесения записи о юридическом лице в Единый государственный реестр юридических лиц;</li>
              <li>свидетельство о постановке на учет в налоговом органе заявителя.</li>
            </ul>
            <div className="statement-info-modal__text">
              Сертификат и ключи электронной подписи запишут на сертифицированный электронный носитель — электронную карту или флеш-накопитель. Платность получения сертификата и ключей электронной подписи определяется регламентом удостоверяющего центра.
            </div>
          </DropDownSection>
          <DropDownSection title="Как сформировать файл открепленной подписи к заявлению">
            <div className="statement-info-modal__text">
              Для формирования файла открепленной подписи необходимо воспользоваться сторонним программным обеспечением.
              {' '}
              <a href={openSourceRegistryLink} target="_blank" rel="noreferrer">
                Выбрать в Реестре открытого программного обеспечения.
              </a>
            </div>
          </DropDownSection>
        </div>
        <div className="statement-info-modal__buttons">
          <PrimaryButton
            className="statement-info-modal__confirm"
            title='ОК'
            onClick={onConfirm}
            disabled={disabled}
          />
          <PrimaryButton
            className="statement-info-modal__cancel"
            lightGray
            title='Вернуться в личный кабинет'
            onClick={onClose}
            disabled={disabled}
          />
        </div>
        { disabled && <Waiter />}
      </div>
		</Dialog>
	);
}
