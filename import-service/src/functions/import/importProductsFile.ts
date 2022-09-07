import { formatJSONError, formatJSONResponse } from "@libs/api-gateway";
import { APIGatewayProxyEvent } from "aws-lambda"
import { middyfy } from "@libs/lambda";
import { S3 } from "aws-sdk";
import { BUCKET, PREFIX } from "@libs/constants";
const importProductsFile = async (event: APIGatewayProxyEvent) => {
    const { name } = event.queryStringParameters;
    if (!name) {
        return formatJSONError(400, "Bad request");
    }
    const s3 = new S3({region: "eu-west-1"});
    const KEY = `${PREFIX}${name}`;

    const params = {
        Bucket: BUCKET,
        Key: KEY,
        Expires: 60,
        ContentType: "text/csv"
    }

    try {
        const url = await s3.getSignedUrlPromise('putObject', params);
        return formatJSONResponse({url});
    } catch(err) {
        return formatJSONError(500, err);
    }
};
export const main = middyfy(importProductsFile);
  