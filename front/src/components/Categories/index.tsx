import { FC } from "react";
import React from "react";

type categoriesProps = {
  currentCat: number;
  handlerCategory: (index: number) => void;
};

export const Categories: FC<categoriesProps> = React.memo(
  ({ currentCat, handlerCategory }) => {
    const categoryNames = [
      "Всі",
      "М'ясні",
      "Вегетаріанські",
      "Гриль",
      "Гострі",
      "Закрити",
    ];

    return (
      <div className="categories">
        <ul>
          {categoryNames.map((n, i) => (
            <li
              className={i === currentCat ? "active" : ""}
              onClick={() => {
                handlerCategory(i);
              }}
              key={n}
            >
              {n}{" "}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);
