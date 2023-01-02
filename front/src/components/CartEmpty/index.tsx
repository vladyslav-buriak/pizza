import cartImg from "../../assets/images/empty-cart.png";

export const CartEmpty = ({ children }: any) => {
  return (
    <div className="content">
      <div className="container container--cart">
        <div className="cart cart--empty">
          {children}
          <span>😕</span>
          <p>
            Вероятней всего, вы не заказывали ещё пиццу.
            <br />
            Для того, чтобы заказать пиццу, перейди на главную страницу.
          </p>
          <img src={cartImg} alt="Empty cart" />
          <a href="/" className="button button--black">
            <span>Вернуться назад</span>
          </a>
        </div>
      </div>
    </div>
  );
};
