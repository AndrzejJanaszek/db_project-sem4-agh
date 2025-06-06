import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import styles from "../css/Product.module.css";

const ProductVariantBarSection = () => {
    const {
        productName,
        variants,
        activeVariantId,
        setActiveVariantId,
        addVariant,
        deleteVariant,
        copyVariant
    } = useContext(ProductContext);

    return (
        <section className={styles.variantBar}>
            <div className={styles.variantBarHeader}>
                <div>
                    <h2>Warianty dla</h2>
                    <h3>{productName || "Nieznany produkt"}</h3>
                </div>
                <button type="button" className="btnBlue" onClick={addVariant}>+</button>
            </div>

            <div className={styles.variantBarList}>
                {variants.map((variant) => (
                    <div
                        key={variant.id}
                        className={`${styles.variantBarListItem} ${variant.id === activeVariantId ? styles.variantBarListItem_active : ""}`}
                        onClick={() => setActiveVariantId(variant.id)}
                    >
                        <div className={styles.variantBarListItemContent}>
                            <h3>{variant.name}</h3>
                            <p>{variant.description}</p>
                        </div>
                        <div className={styles.variantBarListItemPanel}>
                            <button
                                type="button"
                                className="btnBlue"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    copyVariant(variant.id);
                                }}
                            >
                                copy
                            </button>
                            <button
                                type="button"
                                className="btnRed"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteVariant(variant.id);
                                }}
                            >
                                X
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProductVariantBarSection;
