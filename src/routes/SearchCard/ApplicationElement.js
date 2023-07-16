import React, { useState, useCallback } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from "@material-ui/core/styles";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import {
  CustomDrawer
} from 'components';

export default React.memo(ApplicationElement);

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

function ApplicationElement({
  isSmallScreen
}) {
  const [tooltip, setTooltip] = useState(false),
    [drawer, setDrawer] = useState(false),
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
    <div className="search-card__applications">
      <div className="search-card__applications-title">Заявления и заявки</div>
      <div className="search-card__applications-item">
        <div className="search-card__applications-content">
          <div className="search-card__applications-main">
            <div className="search-card__applications-number">№ 296-175-15</div>
            <div className="search-card__applications-date">04.05.2019</div>
            <div className="search-card__applications-status">Завершена</div>
          </div>
          <div className="search-card__applications-item-title">Заявление о выдаче патента Российской Федерации на изобретение</div>
          <div className="search-card__applications-text">Заявление о государственной регистрации изобретения и выдачи патента на изобретение</div>
        </div>
        <CustomDrawer
          onCancel={onCancelDrawer}
          open={drawer}
        >
          <div className="search-card__drawer-inner">
            <div 
              className="search-card__drawer-button"
              type="button"
              onClick={onPrint}
            >
              Распечатать
            </div>
            <div
              className="search-card__drawer-button"
              type="button"
              onClick={onCopy}
            >
              Дублировать
            </div>
            <div
              className="search-card__drawer-button"
              type="button"
              onClick={onAddEditor}
            >
              Добавить редактора
            </div>
          </div>
        </CustomDrawer>
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
              className="events"
              onClick={onOpenDrawerOrTooltip}
            >
              <i className="base-icon-more-vert"></i>
            </div>
          </StyledTooltip>
        </ClickAwayListener>
      </div>
    </div>
  );
};

