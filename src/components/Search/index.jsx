import { useCallback, useContext, useRef, useState } from "react";
import { Context } from "../../Context";
import styles from "./Search.module.scss";
import { FaRegTimesCircle } from "react-icons/fa";
import debounce from "lodash.debounce";

const Search = () => {
  const { searchValue, setSearchValue } = useContext(Context);
  const inpRef = useRef();

  const handlerSearch = (e) => {
    setSearchValue(e.target.value);
    debounceSearch();
  };

  const debounceSearch = useCallback(
    debounce(() => {
      console.log("debounce");
    }, 1000),
    []
  );

  return (
    <div className={styles.wrapp}>
      {searchValue && (
        <span
          onClick={() => {
            inpRef.current.focus();
            setSearchValue("");
          }}
          className={styles.close}
        >
          <FaRegTimesCircle />
        </span>
      )}
      <svg
        className={styles.icon}
        enable-background="new 0 0 32 32"
        id="Glyph"
        version="1.1"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        fill="#fe5f1e"
      >
        <path
          d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z"
          id="XMLID_223_"
        />
      </svg>
      <input
        ref={inpRef}
        onChange={handlerSearch}
        value={searchValue}
        className={styles.search}
        type="text"
        placeholder="Пошук піци..."
      ></input>
    </div>
  );
};

export default Search;
