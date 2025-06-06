import { useEffect, useState } from 'react';
import * as catApi from "../../api/categories/api";
import { createProduct } from "../../api/company/api";
import { useNavigate } from "react-router-dom";

const ProductAdd = () => {
    const navigate = useNavigate();

    const [productName, setProductName] = useState("");
    const [categories, setCategories] = useState([]);

    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(null);
    const [selectedSubsubcategoryId, setSelectedSubsubcategoryId] = useState(null);

    // Ładowanie kategorii z API
    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await catApi.getCategories();
                setCategories(data);


            } catch (err) {
                console.error("Błąd ładowania kategorii:", err);
            }
        };

        loadCategories();
    }, []);

    // Znajduje podkategorie wybranego elementu kategorii
    const getSubcategories = (catId) => {
        const cat = categories.find(c => c._id === catId);
        return cat?.subcategories || [];
    };

    const getSubsubcategories = (catId, subcatId) => {
        // szuka w całym drzewie, żeby uprościć:
        const cat = categories.find(c => c._id === catId);
        const subcat = cat.subcategories?.find(s => s._id === subcatId);

        if (subcat) return subcat.subcategories || [];

        return [];
    };

    const handleAddProduct = async () => {
        try {
            const res = await createProduct({
                name: productName,
                categoryId: selectedCategoryId,
                subCategoryId: selectedSubcategoryId,
                subSubCategoryId: selectedSubsubcategoryId,
            });

            if (!res || res.error) {
                // jeśli backend zwraca błąd w odpowiedzi
                alert(`Błąd: ${res?.error || "Nieznany błąd podczas dodawania produktu"}`);
                return;
            }

            alert("Produkt został dodany pomyślnie!");

            navigate("/company");

        } catch (error) {
            alert("Wystąpił błąd sieci lub serwera: " + error.message);
        }
    };


    return (
        <div>
            <h2>Dodaj nowy produkt</h2>

            <label>
                Nazwa produktu:
                <input
                    type="text"
                    value={productName}
                    onChange={e => setProductName(e.target.value)}
                />
            </label>

            <label>
                Kategoria:
                <select
                    value={selectedCategoryId || ""}
                    onChange={e => {
                        const val = e.target.value ? e.target.value : null;
                        setSelectedCategoryId(val);
                        setSelectedSubcategoryId(null);
                        setSelectedSubsubcategoryId(null);
                    }}
                >
                    <option value="">-- wybierz kategorię --</option>
                    {categories.map(cat => (
                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                </select>
            </label>

            {selectedCategoryId && (
                <label>
                    Podkategoria:
                    <select
                        value={selectedSubcategoryId || ""}
                        onChange={e => {
                            const val = e.target.value ? e.target.value : null;
                            setSelectedSubcategoryId(val);
                            setSelectedSubsubcategoryId(null);
                        }}
                    >
                        <option value="">-- wybierz podkategorię --</option>
                        {getSubcategories(selectedCategoryId).map(sub => (
                            <option key={sub._id} value={sub._id}>{sub.name}</option>
                        ))}
                    </select>
                </label>
            )}

            {selectedSubcategoryId && (
                <label>
                    Pod-podkategoria:
                    <select
                        value={selectedSubsubcategoryId || ""}
                        onChange={e => {
                            const val = e.target.value ? e.target.value : null;
                            setSelectedSubsubcategoryId(val);
                        }}
                    >
                        <option value="">-- wybierz pod-podkategorię --</option>
                        {getSubsubcategories(selectedCategoryId, selectedSubcategoryId).map(subsub => (
                            <option key={subsub._id} value={subsub._id}>{subsub.name}</option>
                        ))}
                    </select>
                </label>
            )}

            <button onClick={handleAddProduct} disabled={!productName || !selectedCategoryId}>
                Dodaj produkt
            </button>
        </div>
    );
};

export default ProductAdd;
