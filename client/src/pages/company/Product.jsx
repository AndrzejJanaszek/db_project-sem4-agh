import React from 'react';
import styles from "./css/Product.module.css";
import ProductVariantDataForm from './components/ProductVariantDataForm';
import ProductVariantBarSection from './components/ProductVariantBarSection';

const AddProduct = () => {
    return (
        <div className={styles.pageContainer}>
            <ProductVariantBarSection></ProductVariantBarSection>
            <section className={styles.formContainer}>
                <section className={styles.productNameSection}>
                    <label htmlFor="">
                        <p>Nazwa Produktu</p>
                        <input type="text" name='nameProduct' />
                    </label>
                    <button className='btnBlue'>Zmień</button>
                </section>
                <ProductVariantDataForm></ProductVariantDataForm>
            </section>
        </div>
    );
}

export default AddProduct;
