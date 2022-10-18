import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonPizza = ({ height, width, info }) => {
  return (
    <div className={info ? "pizza-block" : "pizza-block--info"}>
      <SkeletonTheme highlightColor="#ffdf8c">
        <div>
          <Skeleton circle height={height} width={width} />
        </div>

        <h4 style={{ textAlign: "center" }} className="pizza-block__title">
          {" "}
          <Skeleton height={54} />
        </h4>
        <div>
          <Skeleton height={76} borderRadius={"0.5rem"} />
        </div>
        <div className="pizza-block__bottom">
          <Skeleton width={88} height={27} />
          <Skeleton width={150} height={45} borderRadius={"2rem"} />
        </div>
      </SkeletonTheme>
    </div>
  );
};

export default SkeletonPizza;
