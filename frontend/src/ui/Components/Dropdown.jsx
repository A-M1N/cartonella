import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "../Components/Dropdown.module.css";
import SubItem from "../Components/SubItem.jsx";
import NestedList from "../Components/NestedList.jsx";

export default function DropDown({ menu, onNavigate }) {
  const [active, setActive] = useState(() => menu.subItems[0]?.name || null);
  const navigate = useNavigate();

  const handleSubitemClick = (slug) => {
    navigate(`/products?category=${slug}`);
    if (onNavigate) onNavigate();
  };

  const handleNestedItemClick = (slug) => {
    navigate(`/products?category=${slug}`);
    if (onNavigate) onNavigate();
  };

  return (
    <div className={style.dropdown}>
      <ul>
        {menu.subItems.map((item) => (
          <SubItem
            key={item.name}
            item={item}
            onHover={() => setActive(item.name)}
            onClick={() => handleSubitemClick(item.slug)}
          />
        ))}
      </ul>

      <div className={style.verticalDivider}></div>

      <div className={style.rightSide}>
        <NestedList
          active={active}
          subItems={menu.subItems}
          onItemClick={handleNestedItemClick}
        />
        {menu.rightSideImg && (
          <div className={style.bottomBackground}>
            <img className={style.backgroundImg} src={menu.rightSideImg} />
          </div>
        )}
      </div>
    </div>
  );
}
