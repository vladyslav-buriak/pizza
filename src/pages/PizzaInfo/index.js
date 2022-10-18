import axios from "axios";
import styles from "./PizzaInfo.module.scss";
import { FaStar } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../Consts";
import SkeletonPizza from "../../components/PizzaItem/Skeleton/SkeletonPizza";

const PizzaInfo = () => {
  const [pizza, setPizza] = useState();
  const [rating, setRating] = useState();

  const { id } = useParams();
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  let raitingArr = [];
  for (let i = 0; i <= rating - 1; i++) {
    raitingArr.push(i);
  }

  const fetchPizza = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}${id}`);
      setPizza(data.products);
      setRating(data.products.rating);
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    fetchPizza();
  }, []);

  if (!pizza) {
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
