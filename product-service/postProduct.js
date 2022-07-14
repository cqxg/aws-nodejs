import pg from "pg";

const { Client } = pg;
const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;

const clientConfig = {
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

export const postProduct = async (event, context, callback) => {
  const client = new Client(clientConfig);

  await client.connect();
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Content-Type": "application/json;charset=UTF-8",
  };

  let response;

  const getNewBody = (data) => ({
    title: data.title,
    price: data.price,
    count: data.count,
    description: data.description,
  });

  const newBody = getNewBody(JSON.parse(event.body));

  console.log("event body", newBody);

  Object.keys(newBody).forEach((key) => {
    if (!newBody[key]) {
      callback(null, {
        statusCode: 400,
        headers: headers,
        body: JSON.stringify({
          message: `Please enter field: ${key}`,
        }),
        isBase64Encoded: false,
      });
      client.end();
    }
  });

  try {
    const dmlResult = await client.query(`
    insert into products ( title, description, price) values
    ('${newBody.title}', '${newBody.description}', '${newBody.price}')
    returning id
    `);
    const currId = dmlResult.rows[0].id;
    await client.query(`
        insert into stocks (product_id, count) values
        ('${currId}', '${newBody.count}')
    `);

    response = {
      statusCode: 201,
      headers: headers,
      body: JSON.stringify(newBody),
      isBase64Encoded: false,
    };

    callback(null, response);
  } catch (error) {
    console.log(error);

    response = {
      statusCode: 500,
      headers: headers,
      body: JSON.stringify({
        message: `Oops, we\'ve got issue, and we are working with it ${error.message}`,
      }),
      isBase64Encoded: false,
    };

    callback(response, null);
  } finally {
    client.end();
  }
};
