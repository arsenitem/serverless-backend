const swagger = require('../../../openapi.json');
export const main = async () => {
    return {
        statusCode: 200,
        body: JSON.stringify(swagger),
    };
};