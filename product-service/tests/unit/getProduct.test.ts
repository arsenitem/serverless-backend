import { APIGatewayProxyEvent, Context } from "aws-lambda";
import {main as getProduct} from '../../src/functions/prodcuts/getProduct';
describe("get product by id", () => {
    test("get product success", async () => {
        const id = '7567ec4b-b10c-48c5-9345-fc73c48a80aa';
        const event: APIGatewayProxyEvent = {
            pathParameters: {
                productId: id,
            }
        } as any
        const result = await getProduct(event, {} as Context,
            () => ({}))
        expect(result.statusCode).toBe(200);
        expect(JSON.parse(result.body).product.id).toBe(id);
        expect(JSON.parse(result.body).product.price).toBe(2.4);
    })
    test("get product success", async () => {
        const id = '7567ec4b-b10c-48c5';
        const event: APIGatewayProxyEvent = {
            pathParameters: {
                productId: id,
            }
        } as any
        const result = await getProduct(event, {} as Context,
            () => ({}))
        expect(result.statusCode).toBe(400);
        expect(JSON.parse(result.body).error).toBe('No product found');
    })
})
