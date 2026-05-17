import style from "../Components/SubItem.module.css";

export default function NestedList({ active, subItems, onItemClick }) {
  const current = subItems.find((s) => s.name === active);

  if (!current || !current.nested || current.nested.length === 0) return null;

  const handleClick = (slug) => {
    if (onItemClick) onItemClick(slug);
  };

  return (
    <ul className={style.nestedList}>
      {current.nested.map((item) => (
        <li
          key={item.name}
          className={style.subItem}
          onClick={() => handleClick(item.slug)}
        >
          <div className={style.imgWrapper}>
            <div className={style.imgContainer}>
              <img src={item.img} className={style.iconImg} />
            </div>
            <p>{item.name}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
