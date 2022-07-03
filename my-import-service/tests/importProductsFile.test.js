import { mockClient } from 'aws-sdk-client-mock';
import { importProductsFile } from '../importProductsFile';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';

const s3Mock = mockClient(S3Client);
const BUCKET = 'my-new-import-service'

describe('importProductsFile function tests', () => {
  beforeEach(() => {
    s3Mock.reset();
    s3Mock.on(GetObjectCommand).resolves({})
  });

  it('return response with 201 status code and correct URL', async () => {
    const response = await importProductsFile({
      queryStringParameters: {
        name: 'test.csv',
      }
    }, {});

    expect(response).toEqual({
      statusCode: 201,
      body: expect.stringContaining(`https://${BUCKET}`),
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
  })

  it('return response with 500 status code and error message', async () => {
    const response = await importProductsFile(null, null);
    expect(response).toEqual({
      statusCode: 500,
      body: expect.stringMatching(/.*/),
    });
  })
});