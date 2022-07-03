// import AWS from "aws-sdk";

// const BUCKET = "my-new-import-service";

// export const imageUpload = async (event) => {
//   const s3 = new AWS.S3({ region: "eu-west-1" });
//   console.log("event", event);

//   for (const record of event.Records) {
//     console.log("record", record);
//     await s3
//       .copyObject({
//         Bucket: BUCKET,
//         CopySource: BUCKET + "/" + record.s3.object.key,
//         Key: record.s3.object.key.replace("addimages", "images"),
//       })
//       .promise();

//     await s3
//       .deleteObject({
//         Bucket: BUCKET,
//         Key: record.s3.object.key,
//       })
//       .promise();

//     console.log("qq");
//   }
//   return {
//     statusCode: 202,
//   };
// };
