import { getProductsById } from "../getProductsById";

const mockedEventWithExistingId = {
  pathParameters: {
    productId: "1",
  },
};

const mockedEventWithoutExistingId = {
  pathParameters: {
    productId: "0000",
  },
};

const mockedSuccessResponse = {
  statusCode: 200,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Content-Type": "application/json;charset=UTF-8",
  },
  isBase64Encoded: false,
  body: JSON.stringify({
    count: 1,
    description: "Article: 153117",
    id: "1",
    price: 1337,
    title: "Spike",
    image:
      "https://g0.sunlight.net/media/product/video-crf23-1000/2022/05/13/3924d77e36216763592da7cc082e8eb162133319.mp4",
  }),
};

const mockedFailureResponse = {
  statusCode: 404,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Content-Type": "application/json;charset=UTF-8",
  },
  isBase64Encoded: false,
  body: JSON.stringify({ message: "Product not found" }),
};

describe("getProductsById function tests", () => {
  it("getProductsById's callback called", async () => {
    const fn = jest.fn();
    await getProductsById(mockedEventWithExistingId, null, fn);
    expect(fn).toBeCalledTimes(1);
  });

  it("getProductsById's callback called with correct params", async () => {
    const fn = jest.fn();
    await getProductsById(mockedEventWithExistingId, null, fn);
    expect(fn).toBeCalledWith(null, mockedSuccessResponse);
  });

  it("getProductsById's callback called with unexciting params", async () => {
    const fn = jest.fn();
    await getProductsById(mockedEventWithoutExistingId, null, fn);
    expect(fn).toBeCalledWith(null, mockedFailureResponse);
  });
});
