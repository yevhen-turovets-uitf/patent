import React, { useState, useCallback, useEffect, useRef } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import ReactHtmlParser from 'react-html-parser';
import { useMediaQuery } from 'react-responsive';
import { helpHead, close, arrowTop } from 'images';
import { assistantSocket } from 'sockets';

export default React.memo(Assistant);

function Assistant() {
  const
  isMobile = useMediaQuery({
    query: '(max-width: 767px)'
  }),
  [isOpen, setOpen] = useState(false),
  [messageHistory, setMessageHistory] = useState(
    [{ data: 'Вас приветствует Виртуальный помощник! Напишите свой запрос или название услуги.' }]
  ),
  [inputValue, setInputValue] = useState(''),
  contentElement = useRef(null),
  inputElement = useRef(null),
  { sendMessage, lastMessage, readyState } = useWebSocket(assistantSocket, {
    shouldReconnect: closeEvent => true,
    reconnectInterval: 3000,
    reconnectAttempts: 10
  }),
  connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState],
  onClickSendMessage = useCallback(
    () => {
      if (!!inputValue) {
        setMessageHistory(prev => [ ...prev, inputValue]);
        sendMessage(inputValue);
        setInputValue('');
        
        inputElement.current.focus();
      }
    },
    [inputValue, sendMessage]
  ),
  onChangeInput = useCallback(
    (e) => setInputValue(e.target.value),
    []
  ),
  onKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' && connectionStatus === 'Open') {
        onClickSendMessage()
      }
    },
    [connectionStatus, onClickSendMessage]
  ),
  onOpenChat = useCallback(
    () => setOpen(true),
    []
  ),
  onCloseChat = useCallback(
    () => setOpen(false),
    []
  ),
  onScrollToTop = useCallback(
    () => {
      if (contentElement?.current?.scrollHeight) {
        contentElement.current.scrollTo({
          top: contentElement.current.scrollHeight,
          behavior: "smooth"
        })
      }
    },
    []
  );

  useEffect(
    () => {
      if (lastMessage !== null) {
        setMessageHistory(prev => [ ...prev, lastMessage]);
      }
    },
    [lastMessage, setMessageHistory]
  );

  useEffect(
    () => onScrollToTop(),
    [messageHistory, isOpen, onScrollToTop]
  );

  useEffect(
    () => {
      window.addEventListener('resize', onScrollToTop);
  
      onScrollToTop();
  
      return () => window.removeEventListener('resize', onScrollToTop);
    },
    [onScrollToTop]
  );

  useEffect(
    () => {
      if (isMobile && isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    },
    [isOpen, isMobile]
  );

  useEffect(
    () => {
      if(inputElement && isOpen && !isMobile) {
        inputElement.current.focus();
      }
    },
    [isMobile, isOpen]
  );

	return (
    <div
      className={`assistant ${isOpen ? 'opened' : 'closed'}`}
      onClick={!isOpen ? onOpenChat : null}
    >
      {!isOpen && (
        <div className="assistant__icon">
          <img src={helpHead} alt=""/>
        </div>
      )}
      {!!isOpen && (
        <>
          <div className="assistant__header">
            <div className="assistant__title">Виртуальный помощник</div>
            <div
              className="assistant__close"
              onClick={onCloseChat}
            >
              <img src={close} alt="" />
            </div>
          </div>
          <div ref={contentElement} className="assistant__content">
            {messageHistory.map(
              (message, index) => (
                <React.Fragment key={index}>
                  { message.data 
                  ? (
                    <div className="assistant__bot-wrapper">
                      <div className="assistant__bot-message">
                        {ReactHtmlParser( message.data )}
                      </div>
                    </div>
                  ) : (
                    <div className="assistant__user-wrapper">
                      <div className="assistant__user-message">
                        <p>{message}</p>
                      </div>
                    </div>
                  ) }
                </React.Fragment>
              )
            )}
          </div>
          <div className="assistant__input">
            <input
              ref={inputElement}
              className="assistant__field"
              placeholder="Запрос или название услуги..."
              value={inputValue}
              onChange={onChangeInput}
              onKeyDown={onKeyDown}
            />
            <div
              onClick={onClickSendMessage}
              className="assistant__button"
              disabled={connectionStatus !== 'Open' || !inputValue}
            >
              <img src={arrowTop} alt="" />
            </div>
          </div>
        </>
      )}
    </div>
	);
};
