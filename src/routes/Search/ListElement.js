import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from "@material-ui/core/styles";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import {
  CustomDrawer
} from 'components';
import { openRegistersSearchRoute } from 'urls';

export default React.memo(ListElement);

const StyledTooltip = withStyles({
  tooltip: {
    width: '180px',
    background: '#FFFFFF',
    boxShadow: '0px 10px 22px rgba(44, 116, 255, 0.15)',
    borderRadius: '4px',
    padding: '10px 0',
    pointerEvents: 'auto'
  }
})(Tooltip);

function ListElement({
  number,
  title,
  message,
  numberApplication,
  date,
  datePublic,
  dateRegistration,
  isSmallScreen
}) {
  const [tooltip, setTooltip] = useState(false),
    [drawer, setDrawer] = useState(false),
    history = useHistory(),
    onClickLink = useCallback (
			() => {
				history.push ( `${openRegistersSearchRoute}/${ numberApplication }` );
			},
			[ history, numberApplication ]
		),
    onCancelDrawer = useCallback (
      () => setDrawer(false),
      []
    ),
    onCancelTooltip = useCallback (
      () => setTooltip(false),
      []
    ),
    onOpenDrawerOrTooltip = useCallback (
      () => isSmallScreen ? setDrawer(true) : setTooltip(true),
      [isSmallScreen]
    ),
    onCopy = useCallback (
      () => {
        setTooltip(false);
        setDrawer(false);
      },
      []
    ),
    onPrint = useCallback (
      () => {
        setTooltip(false);
        setDrawer(false);
      },
      []
    ),
    onAddEditor = useCallback (
      () => {
        setTooltip(false);
        setDrawer(false);
      },
      []
    );

  return (
    <div className="search-page__item">
      <CustomDrawer
        onCancel={onCancelDrawer}
        open={drawer}
      >
        <div className="search-page__drawer-inner">
          <div 
            className="search-page__drawer-button"
            type="button"
            onClick={onPrint}
          >
            Распечатать
          </div>
          <div
            className="search-page__drawer-button"
            type="button"
            onClick={onCopy}
          >
            Дублировать
          </div>
          <div
            className="search-page__drawer-button"
            type="button"
            onClick={onAddEditor}
          >
            Добавить редактора
          </div>
        </div>
      </CustomDrawer>
      <div 
        className="search-page__item-content"
        onClick={onClickLink}
      >
        <div className="search-page__item-top-data">
          <div className="search-page__item-number">{number}</div>
          <div className="search-page__item-title">{title}</div>
          <div className="search-page__item-message">{message}</div>
        </div>
        <div className="search-page__item-bottom-data">
          <div className="search-page__item-application-number">
            Номер заявки:
            {' '}
            {numberApplication}
          </div>
          <div className="search-page__item-date">
            Дата подачи заявки:
            {' '}
            {date}
          </div>
          <div className="search-page__item-public-date">
            Публикация:
            {' '}
            {datePublic}
          </div>
          <div className="search-page__item-registration-date">
            Регистрация:
            {' '}
            {dateRegistration}
          </div>
        </div>
      </div>
      <ClickAwayListener onClickAway={onCancelTooltip}>
        <StyledTooltip
          onClose={onCancelTooltip}
          open={tooltip}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          placement="bottom-end"
          title={
            <>
              <button
                type="button"
                className="search-page__tooltip-button"
                onClick={onPrint}
              >
                Распечатать
              </button>
              <button
                type="button"
                className="search-page__tooltip-button"
                onClick={onCopy}
              >
                Дублировать
              </button>
              <button
                type="button"
                className="search-page__tooltip-button"
                onClick={onAddEditor}
              >
                Добавить редактора
              </button>
            </>
          }
        >
          <div
            className="search-page__tooltip-trigger"
            onClick={onOpenDrawerOrTooltip}
          >
            <i className="base-icon-more-vert"></i>
          </div>
        </StyledTooltip>
      </ClickAwayListener>
    </div>
  );
};
