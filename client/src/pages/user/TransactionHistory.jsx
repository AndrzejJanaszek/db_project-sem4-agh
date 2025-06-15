import React, { useEffect, useState } from "react";
import styles from "./css/TransactionHistory.module.css";
import { getTransactionHistory } from "../../api/user/api";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [expandedIds, setExpandedIds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTransactionHistory();
        setTransactions(data);
      } catch (err) {
        console.error("Błąd podczas pobierania historii transakcji:", err);
      }
    };
    fetchData();
  }, []);

  const toggleExpanded = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className={styles.container}>
      <h2>Historia transakcji</h2>
      <ul className={styles.transactionList}>
        {transactions.map((tx) => {
          const totalItems = tx.products.reduce(
            (sum, p) => sum + (p.variant.purchasedCount || 0),
            0
          );
          const totalPrice = tx.products.reduce(
            (sum, p) => sum + p.variant.price * p.variant.purchasedCount,
            0
          );
          const expanded = expandedIds.includes(tx.id);

          return (
            <li key={tx.id} className={styles.transactionItem}>
              <div
                className={styles.transactionSummary}
                onClick={() => toggleExpanded(tx.id)}
              >
                <span>{new Date(tx.timestamp).toLocaleString()}</span>
                <span>{totalItems} produktów</span>
                <span>{totalPrice.toFixed(2)} zł</span>
              </div>

              {expanded && (
                <ul className={styles.transactionDetails}>
                  {tx.products.map((p, idx) => (
                    <li key={idx} className={styles.productItem}>
                      <strong>{p.name}</strong> — {p.variant.name} ×{" "}
                      {p.variant.purchasedCount} ={" "}
                      {(p.variant.price * p.variant.purchasedCount).toFixed(2)} zł
                      <br />
                      <em>{p.variant.description}</em>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TransactionHistory;