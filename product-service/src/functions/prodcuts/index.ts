import { handlerPath } from '@libs/handler-resolver';

export const getProductList = {
  handler: `${handlerPath(__dirname)}/getProductsList.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products',
      },
    },
  ],
};

export const getProduct = {
  handler: `${handlerPath(__dirname)}/getProduct.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products/{productId}',
      },
    },
  ],
};
