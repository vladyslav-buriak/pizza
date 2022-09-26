import SkeletonPizza from "../../components/PizzaItem/Skeleton/SkeletonPizza";
import Categories from "../../components/Categories";
import PizzaItem from "../../components/PizzaItem";
import Sort from "../../components/Sort";
import "../../scss/app.scss";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Context } from "../../Context";

const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [count,setCount] = useState();
  const pages = Math.ceil(count / 3)

  const { sortCategory, sortName, searchValue, } =
    useContext(Context);

  useEffect(() => {
    getAllPizzas();
  }, [sortCategory, sortName, searchValue]);

  const getAllPizzas = async () => {
    setIsLoading(true);

    const category = sortCategory > 0 ? `&category=${sortCategory}` : " ";
    // const search = searchValue?`search=${searchValue}`:" ";

    try {
      await axios
        .get(
          `https://63276da95731f3db99593be8.mockapi.io/products?&search=${searchValue}&sortBy=${sortName.sortProps}&order=${sortName.sortOrder}${category}`
        )
        .then(({data}) =>{ 
          setPizzas(data.products);
          setCount(data.count)
        });
    } catch (e) {
      alert(e);
    } finally {
      setInterval(() => {
        setIsLoading(false);
      }, 1000);
    }
  };


  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Всі піци</h2>
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
