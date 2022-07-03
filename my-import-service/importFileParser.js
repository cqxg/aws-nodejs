import AWS from "aws-sdk";
import csv from "csv-parser";

const BUCKET = "my-new-import-service";

export const importFileParser = async (event) => {
  const s3 = new AWS.S3({ region: "eu-west-1" });

  for (const record of event.Records) {
    const bucket = s3.getObject({
      Bucket: BUCKET,
      Key: record.s3.object.key,
    });

    await new Promise(() => {
      bucket
        .createReadStream()
        .pipe(csv())
        .on("data", (item) => console.log(item))
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
    statusCode: 202,
  };
};
