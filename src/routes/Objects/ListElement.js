import React, { useState, useCallback } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from "@material-ui/core/styles";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import {
  CustomDrawer
} from 'components';

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
  date,
  type,
  title,
  isSmallScreen
}) {
  const
  [tooltip, setTooltip] = useState(false),
  [drawer, setDrawer] = useState(false),
  onClickLink = useCallback (
    () => {},
    []
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
    <div className="objects__item">
      <CustomDrawer
        onCancel={onCancelDrawer}
        open={drawer}
      >
        <div className="objects__drawer-inner">
          <div 
            className="objects__drawer-button"
            type="button"
            onClick={onPrint}
          >
            Распечатать
          </div>
          <div
            className="objects__drawer-button"
            type="button"
            onClick={onCopy}
          >
            Дублировать
          </div>
          <div
            className="objects__drawer-button"
            type="button"
            onClick={onAddEditor}
          >
            Добавить редактора
          </div>
        </div>
      </CustomDrawer>
      <div 
        className="objects__item-content"
        onClick={onClickLink}
      >
        <div className="objects__item-top-data">
          <div className="objects__item-number">{number}</div>
          <div className="objects__item-date">{date}</div>
          <div className="objects__item-type">{type}</div>
        </div>
        <div className="objects__item-title">{title}</div>
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
                className="objects__tooltip-button"
                onClick={onPrint}
              >
                Распечатать
              </button>
              <button
                type="button"
                className="objects__tooltip-button"
                onClick={onCopy}
              >
                Дублировать
              </button>
              <button
                type="button"
                className="objects__tooltip-button"
                onClick={onAddEditor}
              >
                Добавить редактора
              </button>
            </>
          }
        >
          <div
            className="objects__tooltip-trigger"
            onClick={onOpenDrawerOrTooltip}
          >
            <i className="base-icon-more-vert"></i>
          </div>
        </StyledTooltip>
      </ClickAwayListener>
    </div>
  );
};
