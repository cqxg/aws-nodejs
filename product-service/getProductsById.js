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

export const getProductsById = async (event, context, callback) => {
  const client = new Client(env);
  await client.connect();
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Content-Type": "application/json;charset=UTF-8",
  };
  let response;

  try {
    const productId = await event.pathParameters.productId;

    console.log("product id", productId);

    const { rows: filteredProduct } = await client.query(
      `select id, count, title, description, price 
      from stocks, products
      where products.id = stocks.product_id and
      products.id = ('${productId}')`
    );

    console.log("filtered product", filteredProduct);

    if (filteredProduct.length === 1) {
      response = {
        statusCode: 200,
        headers: headers,
        isBase64Encoded: false,
        body: JSON.stringify(filteredProduct),
      };
    } else {
      response = {
        statusCode: 404,
        headers: headers,
        isBase64Encoded: false,
        body: JSON.stringify({ message: "product not found" }),
      };
    }
    callback(null, response);
  } catch (error) {
    console.log(error);

    if (error.code === "22P02") {
      response = {
        statusCode: 404,
        headers: headers,
        isBase64Encoded: false,
        body: JSON.stringify({ message: "incorrect id" }),
      };
    } else {
      response = {
        statusCode: 500,
        headers: headers,
        isBase64Encoded: false,
        body: JSON.stringify({ message: error.message }),
      };
    }

    callback(null, response);
  } finally {
    client.end();
  }
};
