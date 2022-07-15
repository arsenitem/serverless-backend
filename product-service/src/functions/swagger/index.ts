import { handlerPath } from '@libs/handler-resolver';

export const swagger =  {
  handler: `${handlerPath(__dirname)}/swagger.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'swagger',
      },
    },
  ],
};

export const swaggerJson = {
    handler: `${handlerPath(__dirname)}/swagger-json.main`,
    events: [
      {
        http: {
            method: 'get',
            path: 'swagger-json',
        },
        },
    ],
}
