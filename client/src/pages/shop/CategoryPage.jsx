import { useEffect, useState } from 'react';
import ProductListItem from '../../components/ProductListItem';

import styles from "./css/CategoryPage.module.css";

const CategoryPage = () => {
    const [subcategoriesHTML, setSubcategoriesHTML] = useState([]);
    const [productItemsHTML, setProductItemsHTML] = useState([]);

    useEffect(() => {
        const subcategories = [];
        const products = [];

        for (let i = 0; i < 8; i++) {
            subcategories.push(<div key={i} className={styles.subcateogryListBox}><p>Nazwa podkategorii</p></div>);
        }

        for (let i = 0; i < 7; i++) {
            products.push(
                <ProductListItem
                    key={i}
                    img={"laptop_1.png"}
                    name={"Laptop Bajerek"}
                    price={4099.99}
                    currency={"zł"}
                    description={
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a risus condimentum"
                    }
                />
            );
        }

        setSubcategoriesHTML(subcategories);
        setProductItemsHTML(products);
    }, []);
    return (
        <div className={styles.mainContainer}>
            <section className={styles.subcateogryContainer}>
                <h3>Podkategorie dla {"Nazwa kategorii"}</h3>
                <div className={styles.subcateogryList}>
                    {subcategoriesHTML}
                    <div className={styles.subcateogryListBgc}></div>
                </div>
            </section>
            <section className={styles.productListSection}>
                <h3 className={styles.productListSectionHeader}>Wybrane dla ciebie</h3>
                <div className={styles.list}>
                    {productItemsHTML}
                </div>
            </section>
            <section className={styles.productListSection}>
                <h3 className={styles.productListSectionHeader}>Polecane przez BAZAREK</h3>
                <div className={styles.list}>
                    {productItemsHTML}
                </div>
            </section>
            <section className={styles.productListSection}>
                <h3 className={styles.productListSectionHeader}>Najpopularniejsze w {"Nazwa kategorii"}</h3>
                <div className={styles.list}>
                    {productItemsHTML}
                </div>
            </section>
        </div>
    );
}

export default CategoryPage;
