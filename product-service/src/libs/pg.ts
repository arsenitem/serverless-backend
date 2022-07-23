import { Client, ClientConfig } from 'pg';
import Product from 'src/models/product.model';
const dbOptions: ClientConfig = {
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT),
    database: process.env.PG_DATABASE,
    user: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    ssl: {
        rejectUnauthorized: false,
    },
    connectionTimeoutMillis: 6000,
};

const client = new Client(dbOptions);

export const getAllProducts = () : Promise<Array<Product> | string> => {
    return new Promise(async (resolve, reject) => {
        client.connect()
        try {
            const res = await client.query('SELECT id, title, description,price, count FROM products p LEFT JOIN stocks s ON p.id = s.product_id;');
            client.end()
            resolve(res.rows);
        } catch(err) {
            console.error(err);
            reject(err);
        }
    }); 
}

export const getProductById = (id: string) : Promise<Product | string> => {
    return new Promise(async (resolve, reject) => {
        client.connect()
        try {
            const res = await client.query(`SELECT id, title, description,price, count FROM products p LEFT JOIN stocks s ON p.id = s.product_id WHERE p.id = ${id};`);
            client.end()
            resolve(res.rows[0]);
        } catch(err) {
            console.error(err);
            reject(err);
        }
    }); 
}

export const addProduct = (product: {title: string, description: string, price: number, count: number}) : Promise<Product | string> => {
    return new Promise(async (resolve, reject) => {
        client.connect()
        try {
            await client.query('BEGIN');
            const res = await client.query(`INSERT INTO products(title, description, price) VALUES ('${product.title}','${product.description}',${product.price}) RETURNING *;`);
            const newProduct = res.rows[0];
            const newStock = await client.query(`INSERT INTO stocks(product_id, count) VALUES ('${newProduct.id}', ${product.count}) RETURNING *;`);
            newProduct.count = newStock.rows[0].count;
            await client.query("COMMIT");
            client.end();
            resolve(newProduct);
        } catch(err) {
            client.query('ROLLBACK');
            console.error(err);
            reject(err);
        }
    }); 
}