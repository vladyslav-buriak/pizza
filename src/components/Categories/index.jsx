import { useState } from "react";

const Categories = () => {
  const categoryNames = [
    "Все",
    "Мясные",
    "Вегетарианския",
    "Гриль",
    "Острые",
    "Закрытые",
  ];
  
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div className="categories">
      <ul>
        {categoryNames.map((n, i) => (
          <li
            className={i === activeCategory ? "active" : ""}
            onClick={() => {
              setActiveCategory(i);
            }}
            key={n}
          >
            {n}{" "}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
