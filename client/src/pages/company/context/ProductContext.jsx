// ProductContext.jsx
import { createContext, useContext, useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [productName, setProductName] = useState("");
    const [isProductNameChanged, setIsProductNameChanged] = useState(false);

    const [variants, setVariants] = useState([]);
    const [activeVariantId, setActiveVariantId] = useState(null);
    const [changedVariants, setChangedVariants] = useState({});

    // --- PRODUCT NAME ---
    const changeProductName = (name) => {
        setProductName(name);
        setIsProductNameChanged(true);
    };

    const saveProductName = async () => {
        // await api.saveProductName(productName);
        console.log("Saving product name:", productName);
        setIsProductNameChanged(false);
    };

    // --- VARIANTS ---
    const addVariant = () => {
        const newId = Date.now();
        const newVariant = { id: newId, name: "Nowy Wariant", description: "", parameters: [] };
        setVariants(prev => [...prev, newVariant]);
        setActiveVariantId(newId);
        setChangedVariants(prev => ({ ...prev, [newId]: true }));
    };

    const deleteVariant = (id) => {
        setVariants(prev => prev.filter(v => v.id !== id));
        setChangedVariants(prev => {
            const { [id]: _, ...rest } = prev;
            return rest;
        });
        if (activeVariantId === id && variants.length > 1) {
            const firstOther = variants.find(v => v.id !== id);
            if (firstOther) setActiveVariantId(firstOther.id);
        }
    };

    const updateVariant = (id, updatedData) => {
        setVariants(prev =>
            prev.map(v => (v.id === id ? { ...v, ...updatedData } : v))
        );
        markVariantAsChanged(id);
    };

    const copyVariant = (id) => {
        const original = variants.find(v => v.id === id);
        if (!original) return;
        const newId = Date.now();
        const newVariant = {
            ...original,
            id: newId,
            name: original.name + " (kopia)",
        };
        setVariants(prev => [...prev, newVariant]);
        setChangedVariants(prev => ({ ...prev, [newId]: true }));
        setActiveVariantId(newId);
    };

    const saveVariant = async (id) => {
        const variant = variants.find(v => v.id === id);
        if (!variant) return;

        // await api.saveVariant(variant);
        console.log("Saving variant:", variant);

        resetVariantChanged(id);
    };

    const isVariantChanged = (id) => !!changedVariants[id];

    const markVariantAsChanged = (id) => {
        setChangedVariants(prev => ({ ...prev, [id]: true }));
    };

    const resetVariantChanged = (id) => {
        setChangedVariants(prev => ({ ...prev, [id]: false }));
    };

    const setActiveVariantIdSafely = async (newId) => {
        if (
            activeVariantId &&
            activeVariantId !== newId &&
            isVariantChanged(activeVariantId)
        ) {
            const confirmed = window.confirm(
                "Wariant ma niezapisane zmiany. Czy zapisać przed przełączeniem?"
            );
            if (confirmed) {
                await saveVariant(activeVariantId);
            }
        }
        setActiveVariantId(newId);
    };

    const value = {
        // product
        productName,
        setProductName: changeProductName,
        saveProductName,
        isProductNameChanged,

        // variants
        variants,
        activeVariantId,
        setActiveVariantId: setActiveVariantIdSafely,
        addVariant,
        deleteVariant,
        updateVariant,
        copyVariant,
        saveVariant,
        isVariantChanged,
    };

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
};

// Hook skracający dostęp
export const useProduct = () => useContext(ProductContext);
