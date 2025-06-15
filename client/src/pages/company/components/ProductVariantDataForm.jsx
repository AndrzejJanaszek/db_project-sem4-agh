// ProductVariantDataForm.jsx
import React, { useState, useEffect } from 'react';
import styles from "../css/Product.module.css";
import ProductParametersSection from './ProductParametersSection';
import ProductImagesSection from './ProductImagesSection';
import ProductDescriptionSection from './ProductDescriptionSection';
import { useProduct } from "../context/ProductContext";

const ProductVariantDataForm = () => {
    const {
        activeVariantId,
        variants,
        updateAndSaveVariant,
    } = useProduct();

    const variant = variants.find(v => v._id === activeVariantId);

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [count, setCount] = useState("");

    // dane z podsekcji:
    const [parameters, setParameters] = useState([]);
    const [images, setImages] = useState([]);
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (variant) {
            setName(variant.name || "");
            setPrice(variant.price || "");
            setCount(variant.count || "");
            setParameters(variant.parameters || []);
            setImages(variant.images || []);
            setDescription(variant.description || "");
        }
    }, [variant]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!variant) return;

        updateAndSaveVariant(variant._id, {
            name,
            price,
            count,
            parameters,
            images,
            description,
        });
    };

    if (!variant) return <p>Brak aktywnego wariantu</p>;

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <section>
                <label>
                    <p>Nazwa Wariantu</p>
                    <input
                        type="text"
                        name="nameVariant"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <div className={styles.formPriceBox}>
                    <label>
                        <p>Cena</p>
                        <input
                            type="text"
                            name="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>Ilość</p>
                        <input
                            type="number"
                            name="count"
                            value={count}
                            onChange={(e) => setCount(e.target.value)}
                        />
                    </label>
                </div>
            </section>

            <ProductParametersSection parameters={parameters} setParameters={setParameters} />
            <ProductImagesSection images={images} setImages={setImages} />
            <ProductDescriptionSection description={description} setDescription={setDescription} />

            <button type="submit" className={`btnBlue ${styles.saveBtn}`}>
                Zapisz zmiany
            </button>
        </form>
    );
};

export default ProductVariantDataForm;
