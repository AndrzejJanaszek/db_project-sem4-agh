import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCompanyIdFromJWT } from "../../utils/jwt";
import { getCompanyProductList } from "../../api/company/api";
import {
  getCategoryById,
  getSubCategoryById,
  getSubSubCategoryById,
} from "../../api/categories/api"; // używamy API kategorii

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categoryNames, setCategoryNames] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategoryNames = async (categoryId, subCategoryId, subSubCategoryId) => {
      const key = `${categoryId}_${subCategoryId}_${subSubCategoryId}`;
      if (categoryNames[key]) return; // już pobrane

      try {
        const [catData, subData, subSubData] = await Promise.all([
          getCategoryById(categoryId),
          getSubCategoryById(categoryId, subCategoryId),
          getSubSubCategoryById(categoryId, subCategoryId, subSubCategoryId),
        ]);

        setCategoryNames((prev) => ({
          ...prev,
          [key]: {
            cat: catData?.name || "-",
            sub: subData?.name || "-",
            subsub: subSubData?.name || "-",
          },
        }));
      } catch (err) {
        console.error("Błąd pobierania nazw kategorii:", err);
        setCategoryNames((prev) => ({
          ...prev,
          [key]: { cat: "-", sub: "-", subsub: "-" }, // fallback
        }));
      }
    };

    const fetchProductsAndCategories = async () => {
      try {
        const companyId = getCompanyIdFromJWT();
        if (!companyId) {
          setError("Nie znaleziono companyId w tokenie.");
          return;
        }

        const res = await getCompanyProductList(companyId);
        setProducts(res);

        for (const product of res) {
          await fetchCategoryNames(product.categoryId, product.subCategoryId, product.subSubCategoryId);
        }
      } catch (err) {
        console.error(err);
        setError("Błąd podczas pobierania danych.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductsAndCategories();
  }, []);

  if (loading) return <p>Ładowanie produktów...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Lista Produktów</h2>
      {products.length === 0 ? (
        <p>Brak produktów.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nazwa</th>
              <th>Kategoria</th>
              <th>Subkategoria</th>
              <th>Sub-subkategoria</th>
              <th>Warianty</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const { _id, name, variants, categoryId, subCategoryId, subSubCategoryId } = product;
              const key = `${categoryId}_${subCategoryId}_${subSubCategoryId}`;
              const category = categoryNames[key] || {};

              return (
                <tr key={_id}>
                  <td>{name}</td>
                  <td>{category.cat}</td>
                  <td>{category.sub}</td>
                  <td>{category.subsub}</td>
                  <td>{variants?.length || 0}</td>
                  <td>
                    <button onClick={() => navigate(`/company/product/${_id}`)}>Edytuj</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductList;
