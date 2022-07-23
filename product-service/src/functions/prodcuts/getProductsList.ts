// import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONError, formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import Product from '../../models/product.model';
import { getAllProducts } from '@libs/pg';
const getList = () => {
  console.log('getList hanlder was called');
  return getAllProducts().then((data: Product[]) => {
    return formatJSONResponse({
      product: data
    });
  }).catch((err) => {
    return formatJSONError(500, err);
  })
};
export const main = middyfy(getList);
