import AWS from "aws-sdk";

export const catalogBatchProcess = (event, context, callback) => {
  const lambda = new AWS.Lambda({ region: "eu-west-1" });
  const sns = new AWS.SNS({ region: "eu-west-1" });

  event.Records.forEach((item) => {
    lambda.invoke(
      {
        FunctionName: "product-service-dev-postProduct",
        Payload: JSON.stringify(item),
      },
      async (error, data) => {
        if (error) {
          context.done("lambda.invoke error", error);
        }
        if (data.Payload) {
          await sns
            .publish({
              Subject: "Product has been published",
              Message: JSON.stringify(item.body),
              TopicArn: process.env.SNS_ARN,
            })
            .promise()
            .then(() => {
              console.log(
                "Send email for: ",
                JSON.stringify(JSON.parse(item.body))
              );
            })
            .catch((error) => {
              console.log("We've got some error: ", error);
            });
          context.succeed(data.Payload);
        }
      }
    );

    console.log("product posted");
  });
};
