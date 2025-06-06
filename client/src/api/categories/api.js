const BASE_URL = "http://localhost:5000/api";

export const getCategories = async () => {
    const res = await fetch(`${BASE_URL}/categories`, {
        method: "GET",
    });
    if (!res.ok) {
        throw new Error(`Failed to fetch categories: ${res.statusText}`);
    }
    return res.json();
};
