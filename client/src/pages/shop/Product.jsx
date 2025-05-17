import React from 'react';
import styles from "./css/Product.module.css";

const Product = () => {
    const mock_data = {
        name: 'HP EliteBook 840 G6 14" FHD i5-8265U 16GB 256GB Radeon 550X Windows 11',
        parameters: [
            {name: "Stan", value: "Używany"},
            {name: "faktura", value: "Wystawiamy fakturę VAT"},
            {name: "Model", value: "Poleasingowy EliteBook 840 G6 16 GB 256 GB 550X"},
            {name: "Typ", value: "Ultrabook"},
            {name: "Układ klawiatury", value: "US international (qwerty)"},
        ]
    }

    const params_html = mock_data.parameters.map(p => <tr><td>{p.name}</td><td>{p.value}</td></tr>)

    return (
    <div className={styles.container}>
        <section className={`${styles.productMain}`}>
            <section className={`${styles.gallery} ${styles.productSection}`}>
                <h1>{mock_data.name}</h1>
                <img src="laptop_1.png" alt="" className={styles.galleryMainImg} />
                <div className={styles.galleryBar}>
                    <img src="laptop_1.png" alt="" className={styles.galleryBarItem} />
                    <img src="laptop_1.png" alt="" className={styles.galleryBarItem} />
                </div>
            </section>
            <section className={`${styles.productInfo} ${styles.productSection}`}>
                <h1>Parametry</h1>
                <table className={styles.paramsTable}>
                    {params_html}
                </table>
                <button>Wszystkie parametry</button>
            </section>
        </section>
        <section className={`${styles.summary} ${styles.productSection}`}>
            <div className={`${styles.summaryHeaders}`}>
                <h2>Wystawione przez: Nazwa Firmy</h2>
                <h2>4099,99 zł</h2>
            </div>
            <div className={`${styles.summaryVariantsContainer}`}>
                <h2>Warianty</h2>

                <div className={styles.summaryVariant}>
                    <label htmlFor="">Ram</label>
                    <div className={styles.summaryVariantList}>
                        <div className={`${styles.summaryVariantListItem} ${styles.summaryVariantListItemActive}`}>16 GB</div>
                        <div className={styles.summaryVariantListItem}>32 GB</div>
                    </div>
                </div>

                <div className={styles.summaryVariant}>
                    <label htmlFor="">System operacyjny</label>
                    <div className={styles.summaryVariantList}>
                        <div className={`${styles.summaryVariantListItem} ${styles.summaryVariantListItemActive}`}>Windows 11</div>
                        <div className={styles.summaryVariantListItem}>Bez systemu</div>
                    </div>
                </div>

                <div className={styles.summaryVariant}>
                    <label htmlFor="">Pojemność dysku</label>
                    <div className={styles.summaryVariantList}>
                        <div className={`${styles.summaryVariantListItem} ${styles.summaryVariantListItemActive}`}>256 GB</div>
                        <div className={styles.summaryVariantListItem}>512 GB</div>
                        <div className={styles.summaryVariantListItem}>1 TB</div>
                    </div>
                </div>
            </div>

            <button>Dodaj do koszyka</button>
        </section>
    </div>
);

}

export default Product;
