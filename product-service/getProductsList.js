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

export const getProductsList = async (event, context, callback) => {
  const client = new Client(env);

  await client.connect();
  let response;
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Content-Type": "application/json;charset=UTF-8",
  };

  try {
    const { rows: products } = await client.query(`select * from products`);

    console.log(products)

    response = {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify(products),
      isBase64Encoded: false,
    };

    callback(null, response);
  } catch (error) {

    console.log(error)

    response = {
      statusCode: 500,
      headers: headers,
      body: JSON.stringify({
        message: "something wrong !",
      }),
      isBase64Encoded: false,
    };

    callback(response, null);
  } finally {
    client.end();
  }
};
