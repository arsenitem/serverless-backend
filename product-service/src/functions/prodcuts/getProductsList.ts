// import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONError, formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import Product from "../../models/product.model";
import { getAllProducts } from "@libs/pg";
const getList = () => {
  console.log("getList hanlder was called");
  return getAllProducts().then((productslist: Product[]) => {
    return formatJSONResponse({
      productslist,
    });
  }).catch((err) => {
    return formatJSONError(500, err);
  });
};
export const main = middyfy(getList);
