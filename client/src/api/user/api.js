// addProductToCart(productId, count)
// removeProductFtomCart(productId, count)
// 
// makeTransaction()
import { getUserIdFromJWT } from "../../utils/jwt"
import { authFetch } from "../../utils/authFetch"

const BASE_URL = "http://localhost:5000/api";

/**
 * Dodaje produkt do koszyka lub zwiększa jego ilość.
 * Jeśli produkt już istnieje, backend zwiększy jego count.
 * @param {string} productId
 * @param {string} variantId
 * @param {number} count
 */
export const addProductToCart = async (productId, variantId, count = 1) => {
    const userId = await getUserIdFromJWT();
    const res = await fetch(`${BASE_URL}/cart`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, variantId, count, userId }),
    });

    if (!res.ok) {
        throw new Error("Nie udało się dodać produktu do koszyka");
    }

    return await res.json();
};

/**
 * Usuwa produkt z koszyka lub zmniejsza jego ilość.
 * Jeśli count po zmniejszeniu <= 0, backend usunie produkt całkowicie.
 * @param {string} productId
 * @param {string} variantId
 * @param {number} count
 */
export const removeProductFromCart = async (productId, variantId, count = 0) => {
    const userId = await  getUserIdFromJWT();
    const res = await fetch(`${BASE_URL}/cart`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, variantId, count, userId }),
    });

    if (!res.ok) {
        throw new Error("Nie udało się usunąć produktu z koszyka");
    }

    return await res.json();
};


export const getCartProducts = async () => {
  const userId = await getUserIdFromJWT();

  const res = await fetch(`${BASE_URL}/cart/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Nie udało się pobrać produktów z koszyka");
  }

  return await res.json();
};

export const makeTransaction = async (city, street, postcode, products) => {
  const userId = await getUserIdFromJWT();

  const res = await fetch(`${BASE_URL}/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      city,
      street,
      postcode,
      products,
    }),
  });

  if (!res.ok) {
    throw new Error("Nie udało się utworzyć transakcji");
  }

  return await res.json(); // może zwrócić np. id transakcji
};

export const getTransactionHistory = async () => {
  const userId = await getUserIdFromJWT();

  const res = await fetch(`${BASE_URL}/transactions/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Nie udało się pobrać historii transakcji.");
  }

  return await res.json();
};

export const getUserProfileData = async () => {
  const res = await authFetch(`${BASE_URL}/user/profile`);
  if (!res.ok) throw new Error('Nie udało się pobrać danych użytkownika');
  return await res.json();
};

export const updateUserData = async (data) => {
  const res = await authFetch(`${BASE_URL}/user/update`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Błąd aktualizacji danych użytkownika');
  }
  return await res.json();
};

export const updateUserPassword = async (passwordData) => {
  const res = await authFetch(`${BASE_URL}/user/password`, {
    method: 'PUT',
    body: JSON.stringify(passwordData),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Błąd zmiany hasła użytkownika');
  }
  return await res.json();
};