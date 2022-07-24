import type { AWS } from '@serverless/typescript';

import hello from '@functions/hello';
import { swagger, swaggerJson } from '@functions/swagger';
import {getProductList, getProduct, addProduct} from '@functions/prodcuts';

const serverlessConfiguration: AWS = {
  service: 'product-service',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline'],
  provider: {
    region: 'eu-west-1',
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      PG_HOST: 'host',
      PG_PORT: '5432',
      PG_DATABASE: 'database',
      PG_USERNAME: 'postgres',
      PG_PASSWORD: 'password',
    },
  },
  // import the function via paths
  functions: { hello, getProductList, getProduct, addProduct ,swagger, swaggerJson},
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk', 'pg-native'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
