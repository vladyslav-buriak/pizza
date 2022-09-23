import SkeletonPizza from "../../components/PizzaItem/Skeleton/SkeletonPizza";
import Categories from "../../components/Categories";
import PizzaItem from "../../components/PizzaItem";
import Sort from "../../components/Sort";
import "../../scss/app.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { Context } from "../../Context";

const Home = () => {

  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortCategory, setSortCategory] = useState(0);
  const [sortName,setSortName] = useState({name:'популярности',sortProps:'rating'})



  useEffect(() => {
    getAllPizzas();
    window.scrollTo(0, 0);
  }, [sortCategory,sortName]);



  const getAllPizzas = async () => {
    setIsLoading(true);

    const category = sortCategory >0?`category=${sortCategory}`:' ';
    try {
      await axios
        .get(`https://63276da95731f3db99593be8.mockapi.io/products?${category}&sortBy=${sortName.sortProps}&order=desc`)
        .then((resp) => setPizzas(resp.data));
    } catch (e) {
      alert(e);
    } finally {
      setInterval(() => {
        setIsLoading(false);
      }, 2000);
    }
  };



  return (
    <>
      <Context.Provider value={{
        sortCategory,
        setSortCategory,
        sortName,
        setSortName
      }}>
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
      </Context.Provider>
    </>
  );
};

export default Home;
