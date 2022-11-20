import styles from "./NotFound.module.scss";

const NotFound = () => {
  return (
    <div className={styles.wrapp}>
      <h1>
        Сторінка не знайдена <span>😕</span>
      </h1>
    </div>
  );
};

export default NotFound;
