import React from 'react';
import styles from "./css/ProductListItem.module.css";

const ProductListItem = ({img, name, price, currency, description}) => {
    return (
        <div className={styles.item}>
            <img src={img} alt="" />
            <h3 className={styles.itemName}>{name}</h3>
            <p className={styles.itemPriceBox}>
                <span className={styles.itemPriceBox_value}>{price}</span>
                <span className={styles.itemPriceBox_currency}>{currency}</span>
            </p>
            <p className={styles.itemDescription}>{description}</p>
        </div>
    );
}

export default ProductListItem;
