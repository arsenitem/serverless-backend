import { APIGatewayProxyEvent, Context } from "aws-lambda";
// import { getHandlerContext, getHandlerEvent } from "../mock/aws-sdk";
import * as pg from "@libs/pg";
import { main as getProducts } from "../../src/functions/prodcuts/getProductsList";
import ProductModel from "src/models/product.model";
const product: ProductModel = {
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
    count: 5,
    description: "testDescription",
    price: 5,
    title: "testTitle",
};
test("get list of prodcuts", async () => {
    const mockedList = jest
        .spyOn(pg, "getAllProducts")
        .mockResolvedValue([product, product]);
    const event: APIGatewayProxyEvent = {} as any;
    const result = await getProducts(event, {} as Context, () => ({}));
    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body).productslist.length).toBe(2);
    expect(mockedList).toHaveBeenCalled();
});
