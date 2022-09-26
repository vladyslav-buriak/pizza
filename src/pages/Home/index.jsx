import SkeletonPizza from "../../components/PizzaItem/Skeleton/SkeletonPizza";
import Categories from "../../components/Categories";
import PizzaItem from "../../components/PizzaItem";
import Sort from "../../components/Sort";
import "../../scss/app.scss";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Context } from "../../Context";
import Pagination from "../../components/Pagination";



const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState();
  const limit = 3;
  const pages = Math.ceil(count / limit);
  const [currentPage, setCurrentPage] = useState(1);

  const { sortCategory, sortName, searchValue, } =
    useContext(Context);

  const handlePageClick = (e) => {
    const selectedPage = e.selected + 1;
    setCurrentPage(selectedPage)
  }
  useEffect(() => {
    getAllPizzas();
  }, [sortCategory, sortName, searchValue, currentPage]);

  const getAllPizzas = async () => {
    setIsLoading(true);

    const category = sortCategory > 0 ? `&category=${sortCategory}` : " ";

    try {
      await axios
        .get(
          `https://63276da95731f3db99593be8.mockapi.io/products?&search=${searchValue}&sortBy=${sortName.sortProps}&order=${sortName.sortOrder}${category}&page=${currentPage}&limit=${limit}`
        )
        .then(({ data }) => {
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
      <Pagination pages ={pages} changePages={handlePageClick}/>
    </>
  );
};

export default Home;
