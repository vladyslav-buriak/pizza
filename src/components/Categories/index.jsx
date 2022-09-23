import { useContext, useState } from "react";
import { Context } from "../../Context";


const Categories = () => {
  const categoryNames = [
    "Все",
    "Мясные",
    "Вегетарианския",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  const {sortCategory,setSortCategory} = useContext(Context);
  
  // const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div className="categories">
      <ul>
        {categoryNames.map((n, i) => (
          <li
            className={i === sortCategory ? "active" : ""}
            onClick={() => {
              setSortCategory(i);
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
