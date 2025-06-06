import { ProductProvider } from "./context/ProductContext";
import ProductContent from "./ProductContent";
import { useParams } from "react-router-dom";

const Product = () => {
    const { id } = useParams();

    return (
        <ProductProvider productId={id}>
            <ProductContent />
        </ProductProvider>
    );
}

export default Product;
