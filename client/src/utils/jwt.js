import {jwtDecode} from "jwt-decode";

export const getCompanyIdFromJWT = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const decoded = jwtDecode(token);
    return decoded.id || null;  // lub inna właściwość, gdzie jest companyId w tokenie
  } catch (error) {
    console.error("Błąd dekodowania tokena JWT:", error);
    return null;
  }
};

export const getUserIdFromJWT = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const decoded = jwtDecode(token);
    return decoded.id || null;  // lub inna właściwość, gdzie jest companyId w tokenie
  } catch (error) {
    console.error("Błąd dekodowania tokena JWT:", error);
    return null;
  }
};