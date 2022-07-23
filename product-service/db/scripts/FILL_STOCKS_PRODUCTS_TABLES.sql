BEGIN;
WITH inserted_row as (
    INSERT INTO products(title, description, price)
    VALUES('Mango', 'This fruit is not only delicious but also boasts an impressive nutritional profile.\nIn fact, studies link mango and its nutrients to several health benefits, such as improved immunity and digestive health. Some polyphenols found in the fruit might even lower the risk of certain cancers.\n Here are 10 benefits of mango, including an overview of its nutritional content and some tips on how to enjoy it.',
    1)
    RETURNING id
)
INSERT INTO stocks(product_id, count)
SELECT id,10 FROM inserted_row;

WITH inserted_row as (
    INSERT INTO products(title, description, price)
    VALUES('Kiwi', 'kiwifruit or Chinese gooseberry, woody vine and edible fruit of the family Actinidiaceae. The plant is native to mainland China and Taiwan and is also grown commercially in New Zealand and California. The fruit has a slightly acid taste and can be eaten raw or cooked. The juice is sometimes used as a meat tenderizer. Raw kiwis are high in vitamins C and K.',2)
    RETURNING id
)
INSERT INTO stocks(product_id, count)
SELECT id,100 FROM inserted_row;

WITH inserted_row as (
    INSERT INTO products(title, description, price)
    VALUES('Banana', '',2)
    RETURNING id
)
INSERT INTO stocks(product_id, count)
SELECT id,15 FROM inserted_row;

WITH inserted_row as (
    INSERT INTO products(title, description, price)
    VALUES('Apple', '', 3)
    RETURNING id
)
INSERT INTO stocks(product_id, count)
SELECT id,150 FROM inserted_row;

WITH inserted_row as (
    INSERT INTO products(title, description, price)
    VALUES('Watermelon', '', 10)
    RETURNING id
)
INSERT INTO stocks(product_id, count)
SELECT id,90 FROM inserted_row;

WITH inserted_row as (
    INSERT INTO products(title, description, price)
    VALUES('Peach', '', 7)
    RETURNING id
)
INSERT INTO stocks(product_id, count)
SELECT id,700 FROM inserted_row;

WITH inserted_row as (
    INSERT INTO products(title, description, price)
    VALUES('Cherry', '', 4)
    RETURNING id
)
INSERT INTO stocks(product_id, count)
SELECT id, 20 FROM inserted_row;
COMMIT;