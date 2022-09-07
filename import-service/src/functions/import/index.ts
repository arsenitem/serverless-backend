import { BUCKET, PREFIX } from "@libs/constants";
import { handlerPath } from "@libs/handler-resolver";
import { AWS } from "@serverless/typescript";

export const importProductsFile: AWS["functions"]["name"] = {
  handler: `${handlerPath(__dirname)}/importProductsFile.main`,
  events: [
    {
      http: {
        method: "get",
        path: "import",
        cors: true,
        request: {
          parameters: {
            querystrings: {
              name: {
                required: true,
              },
            },
          },
        },
      },
    },
  ],
};

export const importFileParser: AWS["functions"]["name"] = {
    handler: `${handlerPath(__dirname)}/importFileParser.main`,
    events: [
      {
        s3: {
            bucket: BUCKET,
            event: 's3:ObjectCreated:*',
            rules: [
                {
                    prefix: PREFIX
                },
                {
                    suffix: ".csv"
                }
            ],
            existing: true
        }
      },
    ],
  };
