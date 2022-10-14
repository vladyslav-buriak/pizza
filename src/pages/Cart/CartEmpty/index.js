import React from "react";
import cartImg from "../../../assets/images/empty-cart.png";

const CartEmpty = ({ children }) => {
  return (
    <div class="content">
      <div class="container container--cart">
        <div class="cart cart--empty">
          {children}
          <icon>😕</icon>

          <p>
            Вероятней всего, вы не заказывали ещё пиццу.
            <br />
            Для того, чтобы заказать пиццу, перейди на главную страницу.
          </p>
          <img src={cartImg} alt="Empty cart" />
          <a href="/" class="button button--black">
            <span>Вернуться назад</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CartEmpty;
