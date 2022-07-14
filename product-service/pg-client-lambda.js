import pg from "pg";

const { Client } = pg;
const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;

const env = {
  host: PG_HOST,
  port: PG_PORT,
  user: PG_USERNAME,
  database: PG_DATABASE,
  password: PG_PASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 5000,
};

export const invoke = async () => {
  const client = new Client(env);
  await client.connect();
  try {
    const ddlResult1 = await client.query(`
      create table if not exists products (
        id uuid primary key default uuid_generate_v4(),
        title text, 
        description text,
        price integer
      )`);
    const ddlResult2 = await client.query(`
      create table if not exists stocks (
          product_id uuid,
          count integer,
          foreign key ("product_id") references "products" ("id")
      )`);

    const dmlResult = await client.query(`
        insert into products ( title, description, price) values
            ('Spike', 'Article: 153117', '1337'),
            ('Garibaldi', 'Article: 241703', '69'),
            ('Python', 'Article: 228228', '1000'),
            ('Rhombus', 'Article: 265724', '2033'),
            ('Anchor', 'Article: 151733', '228'),
            ('Cartier', 'Article: 227922', '911'),
            ('Perlina', 'Article: 710637', '84'),
            ('Wire', 'Article: 223637', '834')
            returning id
    `);

    const currId = dmlResult.rows;

    const dmlResult2 = await client.query(`
        insert into stocks (product_id, count) values
        ('${currId[0].id}', '1337'),
        ('${currId[1].id}', '1000'),
        ('${currId[2].id}', '911'),
        ('${currId[3].id}', '918'),
        ('${currId[4].id}', '228'),
        ('${currId[5].id}', '1488'),
        ('${currId[6].id}', '710'),
        ('${currId[7].id}', '810')
    `);

    const { rows: products } = await client.query(`select * from products`);
  } catch (error) {
    console.error(error);
  } finally {
    client.end();
  }
};
