import { formatJSONError, formatJSONResponse } from "@libs/api-gateway";
import { BUCKET } from "@libs/constants";
import { S3CreateEvent } from "aws-lambda";
import { S3, SQS } from "aws-sdk";
import ProductModel from "src/models/product.model";
const csvParser = require("csv-parser");

export const main = async (event: S3CreateEvent) => {
    const s3 = new S3({ region: "eu-west-1" });
    console.log("new file added to bucket");
    for (const record of event.Records) {
        const params: S3.Types.GetObjectRequest = {
            Bucket: BUCKET,
            Key: record.s3.object.key,
        };
        const s3Stream = s3.getObject(params).createReadStream();
        try {
            const parsedProducts = await parseCsv(s3Stream);

            addProductsToQueue(parsedProducts);

            const copyParams: S3.Types.CopyObjectRequest = {
                Bucket: BUCKET,
                CopySource: BUCKET + "/" + record.s3.object.key,
                Key: record.s3.object.key.replace("uploaded", "parsed"),
            };

            await s3.copyObject(copyParams).promise();
            await s3.deleteObject(params).promise();
        } catch (err) {
            console.log(err);
            return formatJSONError(500, err);
        }
    }
    return formatJSONResponse({ result: "new file parsed" });
};
const parseCsv = (stream): Promise<Array<ProductModel>> => {
    const results: Array<ProductModel> = [];
    return new Promise((resolve, reject) => {
        stream
            .pipe(csvParser())
            .on("data", (data) => {
                console.log(data);
                results.push(data);
            })
            .on("error", (error) => {
                reject(error);
            })
            .on("end", () => {
                resolve(results);
            });
    });
};

const addProductsToQueue = (products: Array<ProductModel>) => {
    const sqs = new SQS();
    products.forEach((product) => {
        sqs.sendMessage(
            {
                QueueUrl: process.env.SQS_URL,
                MessageBody: JSON.stringify(product),
            },
            (err) => {
                if (err) {
                    console.log("Something went wrong: ", err);
                    return;
                }
                console.log("Send message for ", product);
            }
        );
    });
};
