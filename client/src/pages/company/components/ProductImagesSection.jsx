import React, { useRef } from 'react';
import styles from "../css/Product.module.css";

const ProductImagesSection = ({ images, setImages }) => {
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);

        // zakładamy, że dodajesz tylko nazwy plików lokalnych (dla backendu do uploadu)
        const fileNames = files.map(file => file.name);

        // jeśli chcesz też dodać podgląd, trzeba to zmodyfikować
        setImages(prev => [...prev, ...fileNames]);
    };

    const handleRemove = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    return (
        <section>
            <h3>Zdjęcia produktu</h3>
            <div className={styles.imgList}>
                {images.map((img, index) => (
                    <div key={index} className={styles.imgContainer}>
                        <img
                            src={`/${img}`} // albo inna Twoja ścieżka
                            alt={`zdjęcie-${index}`}
                        />
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
