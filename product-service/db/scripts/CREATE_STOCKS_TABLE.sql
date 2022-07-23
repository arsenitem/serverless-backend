BEGIN;
CREATE TABLE stocks (
    product_id uuid NOT NULL,
    count INT NOT NULL
);
CREATE INDEX product_id_index ON stocks (product_id);
ALTER TABLE stocks
    ADD CONSTRAINT fk_stocks_product_id
    FOREIGN KEY (product_id)
    REFERENCES products(id)
    ON DELETE CASCADE;
COMMIT;