import styles from "./PizzaInfo.module.scss";
import React, { FC, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPizza, selectAbout } from "../../redux/slices/aboutSlice";
import SkeletonPizza from "../../components/PizzaItem/Skeleton/SkeletonPizza";

const PizzaInfo:FC = () => {
  const dispatch = useDispatch();
  const { pizza, rating, loading } = useSelector(selectAbout);
  console.log(rating);
  const { id } = useParams();

  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  let raitingArr = [];
  for (let i = 0; i <= rating - 1; i++) {
    raitingArr.push(i);
  }

  const getPizzaInfo = async () => {
    //@ts-ignore
    dispatch(fetchPizza(id));
  };

  useEffect(() => {
    getPizzaInfo();
  }, []);

  if (loading === "pending") {
    return <SkeletonPizza info={false} height={400} width={400} />;
  }
  return (
    <div>
      <div className={styles.pizzaItem}>
        <img src={pizza.imageUrl} alt="pizza"></img>
        <h3>
          {pizza.price} <span>&#8372;</span>
        </h3>
        <p className={styles.title}>{pizza.title}</p>
        <p className={styles.text}>
          Давно выяснено, что при оценке дизайна и композиции читаемый текст
          мешает сосредоточиться. Lorem Ipsum используют потому, что тот
        </p>

        <div className={styles.wrappRaiting}>
          <span className={styles.raiting}>Рейтинг</span>
          {raitingArr.map((r) => (
            <FaStar className={styles.icon} key={r}></FaStar>
          ))}
        </div>
      </div>

      <span className={styles.goBack} onClick={goBack}>
        Назад
      </span>
    </div>
  );
};

export default PizzaInfo;
