import AWS from "aws-sdk";
import csv from "csv-parser";

const BUCKET = "my-new-import-service";

export const importFileParser = async (event) => {
  const s3 = new AWS.S3({ region: "eu-west-1" });
  const sqs = new AWS.SQS();

  for (const record of event.Records) {
    const bucket = s3.getObject({
      Bucket: BUCKET,
      Key: record.s3.object.key,
    });

    await new Promise(() => {
      bucket
        .createReadStream()
        .pipe(csv())
        .on("data", (item) =>
          sqs.sendMessage(
            {
              QueueUrl: process.env.SQS_URL,
              MessageBody: JSON.stringify(item),
            },
            (error, message) => {
              if (error) {
                console.log("We'v got some error: ", error);
              }
              console.log("Successfully sent message: ", message);
            }
          )
        )
        .on("end", async () => {
          await s3
            .copyObject({
              Bucket: BUCKET,
              CopySource: BUCKET + "/" + record.s3.object.key,
              Key: record.s3.object.key.replace("uploaded", "parsed"),
            })
            .promise();

          await s3
            .deleteObject({
              Bucket: BUCKET,
              Key: record.s3.object.key,
            })
            .promise();
        });
    });
  }

  return {
    statusCode: 201,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "ContentType": "text/csv",
    },
  };
};
