import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSortType } from "../../redux/slices/filterSlice";
import { useEffect } from "react";
import { useRef } from "react";

const menuList = [
  {
    name: "за популярністю (від більш)",
    sortProps: "rating",
    sortOrder: "desc",
  },
  {
    name: "за популярністю (від меньш)",
    sortProps: "rating",
    sortOrder: "asc",
  },
  {
    name: "ціна (від дорогих)",
    sortProps: "price",
    sortOrder: "desc",
  },
  {
    name: "ціна (від дешевых)",
    sortProps: "price",
    sortOrder: "asc",
  },
  {
    name: "за алфавітом (від а до я)",
    sortProps: "title",
    sortOrder: "asc",
  },
  {
    name: "за алфавітом (від я до а)",
    sortProps: "title",
    sortOrder: "desc",
  },
];
const Sort = ({ currentSortBy }) => {
  const dispatch = useDispatch();
  const divRef = useRef();
  const [isOpenWindow, setIsOpenWindow] = useState(false);

  const selectedCategory = (obj) => {
    dispatch(setSortType(obj));
    setIsOpenWindow(false);
  };

  useEffect(() => {
    const handleOnclickOutside = (e) => {
      if (!e.composedPath().includes(divRef.current)) {
        setIsOpenWindow(false);
      }
    };
    document.querySelector("body").onclick = handleOnclickOutside;

    return () => {
      document.querySelector("body").onclick = handleOnclickOutside;
    };
  }, []);

  return (
    <div className="sort" ref={divRef}>
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортувати за:</b>
        <span
          onClick={() => {
            setIsOpenWindow(!isOpenWindow);
          }}
        >
          {currentSortBy.name}
        </span>
      </div>
      {isOpenWindow && (
        <div className="sort__popup">
          <ul>
            {menuList.map((l, i) => (
              <li
                className={currentSortBy.name === l.name ? "active" : ""}
                onClick={() => {
                  selectedCategory({
                    name: l.name,
                    sortProps: l.sortProps,
                    sortOrder: l.sortOrder,
                  });
                }}
                key={l.name}
              >
                {l.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
