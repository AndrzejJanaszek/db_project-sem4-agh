import styles from "./css/Product.module.css";
import ProductVariantDataForm from './components/ProductVariantDataForm';
import ProductVariantBarSection from './components/ProductVariantBarSection';
import { useProduct } from "./context/ProductContext";

const ProductContent = () => {
    const {
        productName,
        setProductName,
    } = useProduct();

    return (
        <div className={styles.pageContainer}>
            <ProductVariantBarSection />

            <section className={styles.formContainer}>
                <section className={styles.productNameSection}>
                    <label htmlFor="productNameInput">
                        <p>Nazwa Produktu</p>
                        <input
                            id="productNameInput"
                            type="text"
                            name="nameProduct"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                    </label>
                    <button className='btnBlue'>Zmień</button>
                </section>

                <ProductVariantDataForm />
            </section>
        </div>
    );
};

export default ProductContent;
