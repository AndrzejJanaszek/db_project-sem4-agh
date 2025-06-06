// /api/company/api.js

import { authFetch } from "../../utils/authFetch";

const BASE_URL = "http://localhost:5000/api";


// Utwórz nowy produkt
export const createProduct = async (productData) => {
    const res = await authFetch(`${BASE_URL}/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
    });
    return res.json();
};

// Usuń produkt
export const deleteProduct = async (productId) => {
    const res = await authFetch(`${BASE_URL}/products/${productId}`, {
        method: "DELETE",
    });
    return res.json();
};

// Utwórz nowy wariant
export const createVariant = async (productId, variantData) => {
    const res = await authFetch(`${BASE_URL}/products/${productId}/variants`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(variantData),
    });

    console.log( await res.json());
    
    return res.json();
};

// Usuń wariant
export const deleteVariant = async (variantId) => {
    const res = await authFetch(`${BASE_URL}/variants/${variantId}`, {
        method: "DELETE",
    });
    return res.json();
};

// Zaktualizuj wariant
export const updateVariant = async (variantId, updatedData) => {
    const res = await authFetch(`${BASE_URL}/variants/${variantId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
    });
    return res.json();
};

// Zaktualizuj nazwę produktu
export const updateProductName = async (productId, newName) => {
    const res = await authFetch(`${BASE_URL}/products/${productId}/name`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newName }),
    });
    return res.json();
};

export const getCompanyProductList = async (companyId) => {
  try {
    const url = new URL(`${BASE_URL}/products`);
    if (companyId) {
      url.searchParams.append("companyId", companyId);
    }

    const res = await authFetch(url.toString(), {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error(`Błąd serwera: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Błąd podczas pobierania listy produktów firmy:", error);
    throw error;
  }
};