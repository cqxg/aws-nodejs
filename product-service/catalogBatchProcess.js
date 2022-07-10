import AWS from "aws-sdk";

export const catalogBatchProcess = (event, context) => {
  const lambda = new AWS.Lambda({ region: "eu-west-1" });

  event.Records.forEach((item) => {
    lambda.invoke(
      {
        FunctionName: "product-service-dev-postProduct",
        Payload: JSON.stringify(item),
      },
      function (error, data) {
        if (error) {
          context.done("lambda.invoke error", error);
        }
        if (data.Payload) {
          context.succeed(data.Payload);
        }
      }
    );
  });
};
