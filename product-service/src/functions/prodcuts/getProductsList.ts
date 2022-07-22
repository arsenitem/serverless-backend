// import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONError, formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { ProductModel } from './model';
import mock from './mock';
const getList = async () => {
  try {
    const list = await getProducts();
    return formatJSONResponse({
      productlist: list
    });
  } catch (err) {
    return formatJSONError(err);
  }
};

const getProducts = (): Promise<ProductModel[]> => {
  return new Promise((resolve) => {
    resolve(mock);
  })
}
export const main = middyfy(getList);
