import SkeletonPizza from "../../components/PizzaItem/Skeleton/SkeletonPizza";
import Categories from "../../components/Categories";
import PizzaItem from "../../components/PizzaItem";
import Sort from "../../components/Sort";
import "../../scss/app.scss";
import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getAllPizzas();
    window.scrollTo(0,0)
  }, []);

  const getAllPizzas = async () => {
    setIsLoading(true);
    try {
      await axios
        .get("https://63276da95731f3db99593be8.mockapi.io/products")
        .then((resp) => setPizzas(resp.data));
    } catch (e) {
      alert(e);
    } finally {
      setInterval(() => {
        setIsLoading(false);
      }, 3000);
    }
  };

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, i) => <SkeletonPizza key={i} />)
          : pizzas.map((p, i) => {
              return <PizzaItem key={i} {...p} />;
            })}
      </div>
    </>
  );
};

export default Home;
