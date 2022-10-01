import SkeletonPizza from "../../components/PizzaItem/Skeleton/SkeletonPizza";
import Categories from "../../components/Categories";
import PizzaItem from "../../components/PizzaItem";
import Sort from "../../components/Sort";
import "../../scss/app.scss";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Context } from "../../Context";
import Pagination from "../../components/Pagination";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setSortCategory } from "../../redux/slices/filterSlice";


const Home = () => {
  const BASE_URL = "https://63276da95731f3db99593be8.mockapi.io/products?";
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState();
  const pages = Math.ceil(count / 3);
  const [currentPage, setCurrentPage] = useState(1);

  const {currentSortBy ,currentCat} = useSelector((state) => state.filter);

  const dispatch = useDispatch();


  const { searchValue } = useContext(Context);

  const handlePageClick = (e) => {
    const selectedPage = e.selected + 1;
    setCurrentPage(selectedPage);
  };

  const handlerCategory = (index) => {
    dispatch(setSortCategory(index));
  };

  useEffect(() => {
    getAllPizzas();
  }, [currentSortBy, searchValue, currentPage, currentCat]);

  const getAllPizzas = async () => {
    setIsLoading(true);

    const category =
    currentCat > 0 ? `&category=${currentCat}` : " ";

    try {
      await axios
        .get(
          `${BASE_URL}&search=${searchValue}&sortBy=${currentSortBy.sortProps}&order=${
            currentSortBy.sortOrder
          }&page=${currentPage}&limit=${3}${category}`
        )
        .then(({ data }) => {
          setPizzas(data.products);
          setCount(data.count);
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
        <Categories currentCat={currentCat} handlerCategory={handlerCategory} />
        <Sort currentSortBy={currentSortBy} />
      </div>
      <h2 className="content__title">Всі піци</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, i) => <SkeletonPizza key={i} />)
          : pizzas.map((p, i) => {
              return <PizzaItem key={i} {...p} />;
            })}
      </div>
      <Pagination pages={pages} changePages={handlePageClick} />
    </>
  );
};

export default Home;
