CREATE TABLE order_products (
  order_id   INTEGER NOT NULL REFERENCES orders (id)  ON DELETE CASCADE ON UPDATE CASCADE,
  product_id INTEGER NOT NULL REFERENCES products (id) ON DELETE CASCADE ON UPDATE CASCADE,
  quantity   INTEGER NOT NULL
);