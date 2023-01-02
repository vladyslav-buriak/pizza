import styles from "./NotFound.module.scss";
import { FC } from "react";

export const NotFound: FC = () => {
  return (
    <div className={styles.wrapp}>
      <h1>
        Сторінка не знайдена <span>😕</span>
      </h1>
    </div>
  );
};
