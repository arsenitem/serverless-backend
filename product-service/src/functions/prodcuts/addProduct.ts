// import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONError, formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import Product from "../../models/product.model";
import ProductAddSchema from "../../models/validation/product";
import { addProduct } from "@libs/pg";
const newProduct = (event) => {
  console.log("addProduct hanlder was called");
  const { error, value } = ProductAddSchema.validate(event.body);
  if (error) {
    return formatJSONError(400, error);
  }
  return addProduct(value)
    .then((product: Product) => {
      return formatJSONResponse({ product });
    })
    .catch((err) => {
      return formatJSONError(500, err);
    });
};
export const main = middyfy(newProduct);
