// ProductContext.jsx
import { createContext, useContext, useState } from "react";

import * as api from "../../../api/company/api"

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [productId, setProductId] = useState("uuid")

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
        await api.updateProductName(productId, productName);
        console.log("Saving product name:", productName);
        setIsProductNameChanged(false);
    };

    // --- VARIANTS ---
    const addVariant = async () => {
        try {
            const newVariant = {
                name: "Nowy Wariant",
                description: "",
                parameters: [],
                price: 0,
                amount: 0,
            };

            const created = await api.createVariant(productId, newVariant);
            const newId = created.id; // zakładamy, że backend zwraca { id, ... }

            setVariants(prev => [...prev, { ...created }]);
            setActiveVariantId(newId);
            setChangedVariants(prev => ({ ...prev, [newId]: true }));
        } catch (error) {
            console.error("Błąd przy tworzeniu wariantu:", error);
        }
    };

    const deleteVariant = async (id) => {
        try {
            await api.deleteVariant(id);
            setVariants(prev => prev.filter(v => v.id !== id));
            setChangedVariants(prev => {
                const { [id]: _, ...rest } = prev;
                return rest;
            });

            if (activeVariantId === id && variants.length > 1) {
                const firstOther = variants.find(v => v.id !== id);
                if (firstOther) setActiveVariantId(firstOther.id);
            }
        } catch (error) {
            console.error("Błąd przy usuwaniu wariantu:", error);
        }
    };

    const updateVariant = (id, updatedData) => {
        setVariants(prev =>
            prev.map(v => (v.id === id ? { ...v, ...updatedData } : v))
        );
        markVariantAsChanged(id);
    };

    const copyVariant = async (id) => {
        const original = variants.find(v => v.id === id);
        if (!original) return;

        const variantToCreate = {
            ...original,
            name: original.name + " (kopia)",
        };

        // usuń oryginalne ID – backend nada nowy
        delete variantToCreate.id;

        try {
            const created = await api.createVariant(productId, variantToCreate);
            const newId = created.id;

            setVariants(prev => [...prev, created]);
            setChangedVariants(prev => ({ ...prev, [newId]: true }));
            setActiveVariantId(newId);
        } catch (error) {
            console.error("Błąd podczas kopiowania wariantu:", error);
        }
    };


    const saveVariant = async (id) => {
        const variant = variants.find(v => v.id === id);
        if (!variant) return;

        await api.updateVariant(variant);
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
