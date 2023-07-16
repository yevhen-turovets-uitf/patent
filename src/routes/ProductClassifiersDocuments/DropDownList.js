import React from 'react';
import filesize from 'filesize';
import { DropDownSection } from 'components';

export default React.memo(DropDownList);

function DropDownList({ title, files, description, all_files, isOpen }) {
  return (
    <DropDownSection {...{ title, isOpen }}>
      <div className="product-classifiers-documents__links-container">
        {files.map(
          ({ link, text, weight }) => (
            <div key={text} className="product-classifiers-documents__link-wrapper">
              <a
                key={text}
                href={link}
                className="product-classifiers-documents__link"
                download
              >
                { text }
              </a>
              <span className="product-classifiers-documents__weight">
                {', '}
                { filesize(weight) }
              </span>
            </div>
          )
        )}
      </div>
      {!!description && (
        <div className="product-classifiers-documents__description">{ description }</div>
      )}
      <a
        className="product-classifiers-documents__all-files"
        href={all_files}
        download
      >
        <i className="base-icon-down-2 mr2"></i>
        Скачать одним архивом
      </a>
    </DropDownSection>
	);
}
