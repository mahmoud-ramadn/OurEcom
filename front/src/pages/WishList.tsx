import Heading from "@components/common/Heading/Heading";
import useWishlist from "@hooks/useWishlist";
import { Product } from "@components/eCommerce";
import { TProducts } from "src/types/product";
import { Lodaing } from "@components/feedback/Loading";
import GridList from "@components/common/GridList/GridList";
const Wishlist = () => {
  const { loading, error, records } = useWishlist();

  return (
    <>
      <Heading title="Your Wishlist" />
      <Lodaing status={loading} error={error} type="product">
        <GridList<TProducts>
          emptyMessage="Your wishlist is empty"
          records={records}
          renderItem={(record) => <Product {...record} />}
        />
      </Lodaing>
    </>
  );
};

export default Wishlist;