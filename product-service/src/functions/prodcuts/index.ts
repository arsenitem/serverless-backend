import { handlerPath } from '@libs/handler-resolver';

export const getProductList = {
  handler: `${handlerPath(__dirname)}/getProductsList.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products',
        cors: true,
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
        cors: true,
      },
    },
  ],
};
