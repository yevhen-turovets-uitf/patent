import React from 'react';
import { DropDownSection } from 'components';

export default React.memo(DropDownList);

function DropDownList({ 
  attorney_name,
  attorney_register_number,
  attorney_specialization,
  attorney_phone,
  attorney_mail,
  attorney_language,
  isOpen
}) {
  return (
    <DropDownSection {...{ title: attorney_name, isOpen }}>
      <div className="patent-attorneys__dropdown-row">Рег. номер: { attorney_register_number }</div>
      <div className="patent-attorneys__dropdown-row">Специализация: { attorney_specialization }</div>
      <div className="patent-attorneys__dropdown-row">Телефон: { attorney_phone }</div>
      <div className="patent-attorneys__dropdown-row">E-mail: { attorney_mail }</div>
      <div className="patent-attorneys__dropdown-row">Языки: { attorney_language }</div>
    </DropDownSection>
	);
}
