import { getProductsList } from "../getProductsList";

const mockedProducts = [
  {
    count: 1,
    description: "Article: 153117",
    id: "e254a2fe-97ea-491b-bb38-067410d0bda5",
    price: 1337,
    title: "Spike",
    image:
      "https://g0.sunlight.net/media/product/video-crf23-1000/2022/05/13/3924d77e36216763592da7cc082e8eb162133319.mp4",
  },
  {
    count: 2,
    description: "Article: 241703",
    id: "7bafdc3b-8cc3-4d5e-8d3b-eea01b6d5964",
    price: 69,
    title: "Garibaldi",
    image:
      "https://g5.sunlight.net/media/product/video-crf23-1000/2022/05/17/74e0f5d92f5231c762e1c8792f8427113139edf0.mp4",
  },
  {
    count: 3,
    description: "Article: 228228",
    id: "c41db99e-9a13-48ca-bf01-29f88b33139b",
    price: 1000,
    title: "Python",
    image:
      "https://g5.sunlight.net/media/product/video-crf23-1000/2022/05/16/4381ed9371c8f4a3d8fad0894f7eb68e718ae0a8.mp4",
  },

  {
    count: 4,
    description: "Article: 265724",
    id: "f42b5a2d-daed-4fcf-bb0a-65c341b7f1c0",
    price: 2033,
    title: "Rhombus",
    image:
      "https://g4.sunlight.net/media/product/video-crf23-1000/2022/05/13/960244caa89066f36b3d10d32011e4d814b38c8e.mp4",
  },
  {
    count: 5,
    description: "Article: 151733",
    id: "946bce13-20c7-42bc-b4a6-cd7d28b4fe6e",
    price: 228,
    title: "Anchor",
    image:
      "https://g4.sunlight.net/media/product/video-crf23-1000/2022/05/13/da09988585625352ed4f284cca718878fac83c2f.mp4",
  },
  {
    count: 6,
    description: "Article: 227922",
    id: "e2810a34-3648-4bd3-a7ff-babcace32e7b",
    price: 911,
    title: "Cartier",
    image:
      "https://g4.sunlight.net/media/product/video-crf23-1000/2022/05/13/3cb4c40e9722fe4055972d71256929560c334bc0.mp4",
  },
  {
    count: 7,
    description: "Article: 710637",
    id: "41bb1cb8-8c98-47ec-81c3-0630b45ac7a9",
    price: 84,
    title: "Perlina",
    image:
      "https://g1.sunlight.net/media/product/video-crf23-1000/2022/05/13/3d22b1587bcca1e391f5e74e027e4c370e40c83b.mp4",
  },
  {
    count: 8,
    description: "Article: 223637",
    id: "1f2985c9-7cd8-4901-9ed2-b13b62fdca3f",
    price: 834,
    title: "Wire",
    image:
      "https://g6.sunlight.net/media/product/video-crf23-1000/2022/05/17/f3267b2d5ccccef11ead1cada8ecbfa797d486d8.mp4",
  },
];

const mockedSuccessResponse = {
  statusCode: 200,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Content-Type": "application/json;charset=UTF-8",
  },
  isBase64Encoded: false,
  body: JSON.stringify(mockedProducts),
};

describe("getProductsList function tests", () => {
  it("getProductsList's callback called", async () => {
    const fn = jest.fn();
    await getProductsList({}, null, fn);
    expect(fn).toBeCalledTimes(1);
  });

  it("getProductsList's callback called with correct params", async () => {
    const fn = jest.fn();
    await getProductsList({}, null, fn);
    expect(fn).toBeCalledWith(null, mockedSuccessResponse);
  });
});
