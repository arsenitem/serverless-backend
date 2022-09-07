import { SQSEvent } from "aws-lambda";
import { main as catalogBatchProcess } from "../../src/functions/prodcuts/catalogBatchProcess";
import * as pg from "@libs/pg";
// import * as sns from '@libs/sns';
const AWSMock = require("aws-sdk-mock");
// import AWS from 'aws-sdk';
import ProductModel from "src/models/product.model";
describe("catalogBatchProcess.test", () => {
    afterEach(() => {
        AWSMock.restore();
    });

    test("add prodcuts from queue", async () => {
        const publishMock = jest.fn().mockImplementation(() => {
            return Promise.resolve();
        });
        AWSMock.mock("SNS", "publish", publishMock);

        const productFromQueue = {
            count: 5,
            description: "testDescription",
            price: 5,
            title: "testTitle",
        } as ProductModel;

        const event = {
            Records: [
                {
                    body: JSON.stringify(productFromQueue),
                },
                {
                    body: JSON.stringify(productFromQueue),
                },
            ],
        };
        const mockedAddProduct = jest
            .spyOn(pg, "addProduct")
            .mockResolvedValue(productFromQueue);
        const result = await catalogBatchProcess(event as SQSEvent);
        expect(mockedAddProduct).toHaveBeenCalledTimes(2);
        expect(publishMock).toHaveBeenCalled();
        expect(result.statusCode).toBe(200);
    });
});
