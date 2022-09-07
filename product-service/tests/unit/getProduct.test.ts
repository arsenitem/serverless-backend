import { APIGatewayProxyEvent, Context } from "aws-lambda";
import { main as getProduct } from "../../src/functions/prodcuts/getProduct";
import * as pg from "@libs/pg";
import ProductModel from "src/models/product.model";
describe("get product by id", () => {
    const product: ProductModel = {
        id: "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
        count: 5,
        description: "testDescription",
        price: 5,
        title: "testTitle",
    };
    test("get product success", async () => {
        const id = "7567ec4b-b10c-48c5-9345-fc73c48a80aa";
        const mockedGetById = jest
            .spyOn(pg, "getProductById")
            .mockResolvedValue(product);
        const event: APIGatewayProxyEvent = {
            pathParameters: {
                productId: id,
            },
        } as any;
        const result = await getProduct(event, {} as Context, () => ({}));
        expect(result.statusCode).toBe(200);
        expect(JSON.parse(result.body).product.id).toBe(id);
        expect(JSON.parse(result.body).product.price).toBe(5);
        expect(mockedGetById).toHaveBeenCalled();
    });
    test("get product error", async () => {
        const id = "7567ec4b-b10c-48c5";
        const mockedGetById = jest
            .spyOn(pg, "getProductById")
            .mockResolvedValue(null);
        const event: APIGatewayProxyEvent = {
            pathParameters: {
                productId: id,
            },
        } as any;
        const result = await getProduct(event, {} as Context, () => ({}));
        expect(mockedGetById).toHaveBeenCalled();
        expect(result.statusCode).toBe(400);
        expect(JSON.parse(result.body).error).toBe("Product not found");
    });
});
