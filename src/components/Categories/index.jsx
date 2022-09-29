
const Categories = ({ currentCat, handlerCategory }) => {

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
};

export default Categories;
