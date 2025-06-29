import { useEffect, useState } from "react";
import styles from "./css/Cart.module.css";
import formStyle from "../auth/css/login.module.css";
import CartItem from "../../components/CartItem";
import { getCartProducts, addProductToCart, removeProductFromCart, makeTransaction } from "../../api/user/api";

const Cart = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    city: "",
    street: "",
    postcode: ""
  });
  const [transactionStatus, setTransactionStatus] = useState(null);

  const fetchCart = async () => {
    try {
      const data = await getCartProducts();
      console.log(data);
      

      setCartProducts(data);
    } catch (err) {
      setError("Nie udało się pobrać koszyka.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const flatItems = cartProducts.flatMap((product) =>
    product.variants.map((variant) => ({
      productId: product._id,
      companyId: product.companyId,
      variantId: variant._id,
      productName: product.name,
      variantName: variant.name,
      count: variant.count,
      price: variant.price,
      image: variant.images?.[0] || "placeholder.png"
    }))
  );

  const totalItems = flatItems.reduce((sum, item) => sum + item.count, 0);
  const totalPrice = flatItems.reduce((sum, item) => sum + item.count * item.price, 0);

  const handleIncrease = async (productId, variantId) => {
    await addProductToCart(productId, variantId, 1);
    await fetchCart();
  };

  const handleDecrease = async (productId, variantId, count) => {
    await removeProductFromCart(productId, variantId, count);
    await fetchCart();
  };

  const handleRemove = async (productId, variantId) => {
    await removeProductFromCart(productId, variantId, 0);
    await fetchCart();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTransaction = async () => {
    try {
      const products = flatItems.map(({ productId, variantId, companyId, count }) => ({
        productId,
        variantId,
        companyId,
        count,
      }));

      await makeTransaction(formData.city, formData.street, formData.postcode, products);

      setTransactionStatus("success");
      await fetchCart(); // możesz też tu dodać redirect albo czyszczenie formularza
    } catch (err) {
      console.error(err);
      setTransactionStatus("error");
    }
  };

  if (loading) return <p>Ładowanie koszyka...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className={styles.cartContainer}>
      <div className={styles.cart}>
        <h1 className={styles.cartHeader}>Koszyk</h1>
        {flatItems.map((item) => (
          <CartItem
            key={item.variantId}
            img={`/${item.image}`}
            name={`${item.productName} - ${item.variantName}`}
            count={item.count}
            price={item.price}
            currency="zł"
            onIncrease={() => handleIncrease(item.productId, item.variantId)}
            onDecrease={() => handleDecrease(item.productId, item.variantId, item.count - 1)}
            onRemove={() => handleRemove(item.productId, item.variantId)}
          />
        ))}
      </div>

      <div className={styles.cartSummary}>
        <div className={styles.cartSummaryItem}>
          <span>Ilość produktów:</span>
          <span>{totalItems}</span>
        </div>
        <div className={styles.cartSummaryItem}>
          <span>Łączna kwota:</span>
          <span>{totalPrice.toFixed(2)}</span>
          <span>zł</span>
        </div>
      </div>

      <form>
        <section>
          <h3>Adres dostawy</h3>
          <label className={formStyle.loginFormLabel}>
            <p>miasto</p>
            <input type="text" name="city" value={formData.city} onChange={handleInputChange} />
          </label>
          <label className={formStyle.loginFormLabel}>
            <p>ulica</p>
            <input type="text" name="street" value={formData.street} onChange={handleInputChange} />
          </label>
          <label className={formStyle.loginFormLabel}>
            <p>kod pocztowy</p>
            <input type="text" name="postcode" value={formData.postcode} onChange={handleInputChange} />
          </label>
        </section>
      </form>

      <button className="btnGreen" onClick={handleTransaction}>
        Dokonaj zakupy
      </button>
    </section>
  );
};

export default Cart;
