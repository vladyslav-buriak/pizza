import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonPizza = () => {
    return (
        <div className="pizza-block">
            <SkeletonTheme highlightColor="#ffdf8c">
                <Skeleton circle height={260} />
                <h4 className="pizza-block__title"> <Skeleton height={54} /></h4>
                <Skeleton height={76} borderRadius={'0.5rem'} />
                <div className="pizza-block__bottom">
                    <Skeleton width={88} height={27} />
                    <Skeleton width={150} height={45} borderRadius={'2rem'} />
                </div>
            </SkeletonTheme>

        </div>
    )
}

export default SkeletonPizza