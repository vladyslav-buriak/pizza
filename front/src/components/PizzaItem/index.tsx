import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { addItems, selectCartItem } from "../../redux/slices/cartSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


type PizzaItemProps={
  id:string;
  imageUrl:string;
  title:string;
  price:number;
  sizes:number[];
  types:number[];
}
const PizzaItem:FC<PizzaItemProps> = ({ id, imageUrl, title, price, sizes, types }) => {

  const cartItem = useSelector(selectCartItem(id));

  const [activeSize, setActiveSize] = useState(0);
  const [activeType, setActiveType] = useState(0);
  const typePizza = ["тонке", "традиційне"];

  const dispatch = useDispatch();

  const addPizzas = (id:string,title:string) => {
    const pizzaCart = {
      id,
      title,
      imageUrl,
      price,
      sizes: sizes[activeSize],
      types: typePizza[activeType],
    };

    dispatch(addItems(pizzaCart));
  };

  return (
    <div className="pizza-block">
      <Link to={`about/${id}`}>
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      </Link>
      <h4 className="pizza-block__title">{title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map((t) => (
            <li
              className={activeType === t ? "active" : ""}
              onClick={() => {
                setActiveType(t);
              }}
              key={t}
            >
              {typePizza[t]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((s, i) => (
            <li
              className={activeSize === i ? "active" : ""}
              onClick={() => {
                setActiveSize(i);
              }}
              key={s}
            >
              {s}см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} &#8372;</div>
        <div
          className="button button--outline button--add"
          onClick={() => {
            addPizzas(id, title);
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Додати</span>
          {cartItem ? <i> {cartItem.count}</i> : ""}
        </div>
      </div>
    </div>
  );
};

export default PizzaItem;
