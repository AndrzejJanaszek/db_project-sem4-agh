import React from 'react';
import styles from "../css/Product.module.css";
import ProductParametersSection from './ProductParametersSection';
import ProductImagesSection from './ProductImagesSection';
import ProductDescriptionSection from './ProductDescriptionSection';

const ProductVariantDataForm = () => {
    return (
        <form action="" method='post' className={styles.form}>
            <section>
                <label htmlFor="">
                    <p>Nazwa Wariantu</p>
                    <input type="text" name='nameVariant' />
                </label>
                <div className={styles.formPriceBox}>
                    <label htmlFor="">
                        <p>Cena</p>
                        <input type="text" name='price' />
                    </label>
                    <label htmlFor="">
                        <p>Ilość</p>
                        <input type="number" name='amount' />
                    </label>
                </div>
            </section>
            <ProductParametersSection></ProductParametersSection>
            <ProductImagesSection></ProductImagesSection>
            <ProductDescriptionSection></ProductDescriptionSection>
            <button type="submit" className={`btnBlue ${styles.saveBtn}`}>Zapisz zmiany</button>
        </form>
    );
}

export default ProductVariantDataForm;
