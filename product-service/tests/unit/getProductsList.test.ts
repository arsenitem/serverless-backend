import { APIGatewayProxyEvent, Context } from "aws-lambda";
// import { getHandlerContext, getHandlerEvent } from "../mock/aws-sdk";
import {main as getProducts} from '../../src/functions/prodcuts/getProductsList';
test("get list of prodcuts", async () => {
    const event: APIGatewayProxyEvent = {
    } as any
    const result = await getProducts(event, {} as Context,
        () => ({}))
    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body).productlist.length).toBe(8);
})