// import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONError, formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { getProductById } from "@libs/pg";
import Product from "../../models/product.model";

const getProduct = (event) => {
  const id = event.pathParameters.productId;
  console.log(`getProduct hanlder was called with id `, id);
  getProductById(id)
    .then((product: Product) => {
      return formatJSONResponse({
        product,
      });
    })
    .catch((err) => {
      return formatJSONError(500, err);
    });
};
export const main = middyfy(getProduct);
