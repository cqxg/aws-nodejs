import products from "./mocks/products.mock";

export const getProductsList = async (event, context, callback) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Content-Type": "application/json;charset=UTF-8",
  };
  let response;

  const productsPromise = new Promise((res, rej) => {
    res(products);
  });

  const uploadedProducts = await productsPromise;

  try {
    response = {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify(uploadedProducts),
      isBase64Encoded: false,
    };
    callback(null, response);
  } catch (error) {
    response = {
      statusCode: 500,
      headers: headers,
      body: JSON.stringify({ message: `Ooops, ${error.message}` }),
      isBase64Encoded: false,
    };
    callback(error, response);
  }
};
