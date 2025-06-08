const BASE_URL = "http://localhost:5000/api";

export const getProductById = async (productId) => {
    const res = await fetch(`${BASE_URL}/products/${productId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });

    if (!res.ok) {
        throw new Error("Nie udało się pobrać produktu");
    }

    return await res.json(); // powinno zwrócić { name, variants: [...] }
};

export const getProducts = async () => {
    const res = await fetch(`${BASE_URL}/products`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });

    if (!res.ok) {
        throw new Error("Nie udało się pobrać produktu");
    }

    return await res.json();
};