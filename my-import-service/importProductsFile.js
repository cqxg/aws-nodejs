import AWS from "aws-sdk";

const BUCKET = "my-new-import-service";

export const importProductsFile = async (event) => {
  try {
    const s3 = new AWS.S3({ region: "eu-west-1" });
    const { name } = event.queryStringParameters;
    const command = {
      Bucket: BUCKET,
      Key: `uploaded/${name}`,
      ContentType: "text/csv",
      Expires: 1000,
    };

    const signedUrl = s3.getSignedUrl("putObject", command);

    console.log(signedUrl)

    return {
      statusCode: 201,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
        "Access-control-request-headers": "authorization",
      },
      body: JSON.stringify(signedUrl),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Something broken! Sorry. Error: " + error.message,
      }),
    };
  }
};
