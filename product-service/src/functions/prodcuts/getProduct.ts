// import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONError, formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { getProductById } from "@libs/pg";
import Product from "../../models/product.model";

const getProduct = (event) => {
  const id = event.pathParameters.productId;
  console.log(`getProduct hanlder was called with id `, id);
  return getProductById(id).then((product: Product) => {
    if (product) {
      return formatJSONResponse({
        product,
      });
    }
    return formatJSONError(400, "Product not found");
  }).catch((err) => {
    return formatJSONError(500, err);
  });
};
export const main = middyfy(getProduct);
