import { useEffect, useState } from 'react';
import { getProducts } from '../../api/product/api';
import { addProductToCart } from '../../api/user/api';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getProducts();
                
                setProducts(data);
            } catch (err) {
                console.error("Błąd przy pobieraniu produktów:", err.message);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            {products.flatMap(product =>
                product.variants.map(variant => (
                    <div key={variant._id} style={{ border: "1px solid #ccc", margin: "1rem", padding: "1rem" }}>
                        <h3>{product.name} - {variant.name}</h3>

                        {variant.images?.[0] && (
                            <img
                                src={variant.images[0]}
                                alt={`${product.name} - ${variant.name}`}
                                style={{ maxWidth: "200px", height: "auto" }}
                            />
                        )}

                        <p>{(variant.description || "").slice(0, 100)}...</p>
                        <p><strong>Cena:</strong> {variant.price?.toFixed(2)} zł</p>

                        <button onClick={() => addProductToCart(product._id, variant._id, 1)}>
                            Dodaj do koszyka
                        </button>

                        <button onClick={() => navigate(`/product/${product._id}/variant/${variant._id}`)}>
                            Zobacz produkt
                        </button>
                    </div>
                ))
            )}
        </div>
    );
};

export default Search;
