const swagger = require('../../../swagger.json');
export const main = async () => {
    return {
        statusCode: 200,
        body: JSON.stringify(swagger),
    };
};