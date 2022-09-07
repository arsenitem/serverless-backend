import { handlerPath } from "@libs/handler-resolver";
import { AWS } from "@serverless/typescript";

export const getProductList: AWS["functions"]["name"] = {
    handler: `${handlerPath(__dirname)}/getProductsList.main`,
    events: [
        {
            http: {
                method: "get",
                path: "products",
                cors: true,
            },
        },
    ],
};

export const getProduct: AWS["functions"]["name"] = {
    handler: `${handlerPath(__dirname)}/getProduct.main`,
    events: [
        {
            http: {
                method: "get",
                path: "products/{productId}",
                cors: true,
            },
        },
    ],
};

export const addProduct: AWS["functions"]["name"] = {
    handler: `${handlerPath(__dirname)}/addProduct.main`,
    events: [
        {
            http: {
                method: "post",
                path: "products",
                cors: true,
            },
        },
    ],
};

export const catalogBatchProcess: AWS["functions"]["name"] = {
    handler: `${handlerPath(__dirname)}/catalogBatchProcess.main`,
    events: [
        {
            sqs: {
                batchSize: 5,
                arn: "arn:aws:sqs:eu-west-1:636236010660:catalogItemsQueue",
                // arn: {
                //   'Fn::Join':[':',['arn:aws:sqs', { Ref: 'AWS::Region' }, { Ref: 'AWS::AccountId' }, '${env:SQS_NAME}']]
                // }
            },
        },
    ],
};
