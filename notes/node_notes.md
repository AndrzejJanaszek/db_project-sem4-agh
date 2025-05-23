# ID WSTAWIONEGO REKORDU

```js
const [addressResult] = await db.query(
      'INSERT INTO address (city, postcode, street) VALUES (?, ?, ?)',
      [city, postcode, street]
    );
const addressId = addressResult.insertId;
```