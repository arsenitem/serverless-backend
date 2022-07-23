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

export const addProduct = {
  handler: `${handlerPath(__dirname)}/addProduct.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'products',
        cors: true,
      },
    },
  ],
};
