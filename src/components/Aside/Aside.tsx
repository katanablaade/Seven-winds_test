import { useState } from 'react';
import './Aside.style.scss';
import asideIcon from '../../assets/aside-icon.png';
import arrowDown from '../../assets/arrow-down.png';

export function Aside() {
  const [listItem, setListItem] = useState([
    { id: 1, name: 'По проекту' },
    { id: 2, name: 'Объекты' },
    { id: 3, name: 'РД' },
    { id: 4, name: 'МТО' },
    { id: 5, name: 'СМР' },
    { id: 6, name: 'График' },
    { id: 7, name: 'МиМ' },
    { id: 8, name: 'Рабочие' },
    { id: 9, name: 'Капвложения' },
    { id: 10, name: 'Финансирование' },
    { id: 11, name: 'Панорамы' },
    { id: 12, name: 'Камеры' },
    { id: 13, name: 'Поручения' },
    { id: 14, name: 'Контрагенты' },
  ]);

  return (
    <div className="aside">
      <div className="aside-titles-project">
        <div className="aside-titles-project-wrapper">
          <p className="aside-titles-project-name">Название проекта</p>
          <p className="aside-titles-project-abbreviation">Аббревиатура</p>
        </div>
        <img className="aside-titles-project-img" src={arrowDown} alt="" />
      </div>
      <div className="separator"></div>
      <div className="aside-wrapper">
        <ul className="aside-list">
          {listItem.map((item) => {
            return (
              <li key={item.id} className="aside-item">
                <img className="aside-item-icon" src={asideIcon} alt="" />
                <p className="aside-item-name"> {item.name}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
