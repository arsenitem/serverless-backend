import { formatJSONError, formatJSONResponse } from "@libs/api-gateway";
import ProductAddSchema from "../../models/validation/product";
import { addProduct } from "@libs/pg";
import { SQSEvent } from "aws-lambda";
import ProductModel from "src/models/product.model";
import { sendNotification } from "@libs/sns";
export const main = async (event: SQSEvent) => {
    try {
        await event.Records.forEach(async (message) => {
            const product: ProductModel = JSON.parse(message.body);
            const { error, value } = ProductAddSchema.validate(product);
            if (error) {
                console.log(error);
            } else {
                addProduct(value);
            }
        });

        await sendNotification();
        return formatJSONResponse({ res: "Parsed products added to db" });
    } catch (err) {
        console.log(err);
        return formatJSONError(500, err);
    }
};
