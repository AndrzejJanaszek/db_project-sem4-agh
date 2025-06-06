import { ProductProvider } from "./context/ProductContext";
import ProductContent from "./ProductContent";

const Product = () => {
    return (
        <ProductProvider>
            <ProductContent />
        </ProductProvider>
    );
}

export default Product;
