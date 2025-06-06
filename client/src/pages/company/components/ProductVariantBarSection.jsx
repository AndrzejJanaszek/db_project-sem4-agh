import styles from "../css/Product.module.css";

const ProductVariantBarSection = ({ productName, variants, activeVariantId, onSelectVariant, onAddVariant, onDeleteVariant, onCopyVariant }) => {
    return (
        <section className={styles.variantBar}>
            <div className={styles.variantBarHeader}>
                <div>
                    <h2>Warianty dla</h2>
                    <h3>{productName || "Nieznany produkt"}</h3>
                </div>
                <button type="button" className="btnBlue" onClick={onAddVariant}>+</button>
            </div>

            <div className={styles.variantBarList}>
                {variants.map((variant) => (
                    <div
                        key={variant.id}
                        className={`${styles.variantBarListItem} ${variant.id === activeVariantId ? styles.variantBarListItem_active : ""}`}
                        onClick={() => onSelectVariant(variant.id)}
                    >
                        <div className={styles.variantBarListItemContent}>
                            <h3>{variant.name}</h3>
                            <p>{variant.description}</p>
                        </div>
                        <div className={styles.variantBarListItemPanel}>
                            <button type="button" className="btnBlue" onClick={(e) => { e.stopPropagation(); onCopyVariant(variant.id); }}>copy</button>
                            <button type="button" className="btnRed" onClick={(e) => { e.stopPropagation(); onDeleteVariant(variant.id); }}>X</button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProductVariantBarSection;
