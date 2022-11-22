import styles from "./NotFound.module.scss";
import React, { FC } from "react";

const NotFound: FC = () => {
  return (
    <div className={styles.wrapp}>
      <h1>
        Сторінка не знайдена <span>😕</span>
      </h1>
    </div>
  );
};

export default NotFound;
