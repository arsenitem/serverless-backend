// import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONError, formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import mock from './mock';
import { ProductModel } from './model';

const getProduct = async (event) => {
  const id = event.pathParameters.productId;
  try {
    const product = await getProductAsync(id);
    return formatJSONResponse({
      product
    });
  } catch(err) {
    return formatJSONError(err);
  }
};
const getProductAsync = (id: string): Promise<ProductModel> => {
  return new Promise((resolve, reject) => {
    const item = mock.find((item: ProductModel) => item.id === id);
    if (item) {
      resolve(item);
    }
    reject("No product found");
  })
}
export const main = middyfy(getProduct);
