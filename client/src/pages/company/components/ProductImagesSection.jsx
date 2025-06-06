import React, { useEffect, useRef, useState } from 'react';
import styles from "../css/Product.module.css";

const ProductImagesSection = ({ initialImages = [] }) => {
    const [images, setImages] = useState(initialImages); // [{ src, file, isNew }]
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map(file => ({
            src: URL.createObjectURL(file),
            file,
            isNew: true
        }));
        setImages(prev => [...prev, ...newImages]);
    };

    const handleRemove = (index) => {
        const img = images[index];
        // Zwolnij blob URL jeśli to lokalny plik
        if (img.isNew) URL.revokeObjectURL(img.src);
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    useEffect(() => {
        console.log("Aktualne images:", images);
    }, [images]);


    return (
        <section>
            <h3>Zdjęcia produktu</h3>
            <div className={styles.imgList}>
                {images.map((img, index) => (
                    <div key={index} className={styles.imgContainer}>
                        <img src={img.src} alt={`zdjęcie-${index}`} />
                        <button type="button" onClick={() => handleRemove(index)}>x</button>
                    </div>
                ))}
            </div>

            <input
                type="file"
                accept="image/*"
                multiple
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleFileChange}
            />
            <button type="button" className="btnBlue" onClick={triggerFileInput}>
                Dodaj plik
            </button>
        </section>
    );
};

export default ProductImagesSection;
