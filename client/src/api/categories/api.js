const BASE_URL = "http://localhost:5000/api/categories";

/**
 * Pobiera wszystkie główne kategorie
 */
export const getCategories = async () => {
    const res = await fetch(`${BASE_URL}`, { method: "GET" });
    if (!res.ok) {
        throw new Error(`Failed to fetch categories: ${res.statusText}`);
    }
    return res.json();
};

/**
 * Pobiera główną kategorię po ID
 * @param {string} categoryId 
 */
export const getCategoryById = async (categoryId) => {
    const res = await fetch(`${BASE_URL}/${categoryId}`, { method: "GET" });
    if (!res.ok) {
        throw new Error(`Failed to fetch category ${categoryId}: ${res.statusText}`);
    }
    return res.json();
};

/**
 * Pobiera subkategorię po ID
 * @param {string} categoryId 
 * @param {string} subCategoryId 
 */
export const getSubCategoryById = async (categoryId, subCategoryId) => {
    const res = await fetch(`${BASE_URL}/${categoryId}/sub/${subCategoryId}`, { method: "GET" });
    if (!res.ok) {
        throw new Error(`Failed to fetch subcategory ${subCategoryId}: ${res.statusText}`);
    }
    return res.json();
};

/**
 * Pobiera sub-subkategorię po ID
 * @param {string} categoryId 
 * @param {string} subCategoryId 
 * @param {string} subSubCategoryId 
 */
export const getSubSubCategoryById = async (categoryId, subCategoryId, subSubCategoryId) => {
    const res = await fetch(`${BASE_URL}/${categoryId}/sub/${subCategoryId}/subsub/${subSubCategoryId}`, {
        method: "GET",
    });
    if (!res.ok) {
        throw new Error(`Failed to fetch sub-subcategory ${subSubCategoryId}: ${res.statusText}`);
    }
    return res.json();
};
