import request from "supertest";
import mongoose from "mongoose";

import server from "../../app.js";
import Product from "../../models/product.js";
import User from "../../models/user.js";

describe("GET /api/products", () => {
  let products;
  beforeEach(async () => {
    products = [
      {
        name: "product1",
        image: "/product1.jpg",
        defaultPrice: 2.5,
        numberInStock: 10,
      },
      {
        name: "product2",
        image: "/product2.jpg",
        defaultPrice: 5.6,
        numberInStock: 10,
      },
    ];
    await Product.collection.insertMany(products);
  });
  afterEach(async () => {
    await Product.remove({});
    await mongoose.disconnect();
  });

  const exec = () => {
    return request(server).get("/api/products");
  };

  it("should return all products", async () => {
    const res = await exec();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(2);
    expect(Object.keys(res.body[0])).toEqual(
      expect.arrayContaining([
        "name",
        "defaultPrice",
        "numberInStock",
      ])
    );
  });
});

describe("POST /api/products", () => {
  let product;
  let token;

  beforeEach(async () => {
    token = new User().genAuthToken();

    product = new Product({
      name: "Product1",
      image: "path_to_image1",
      defaultPrice: 10,
      numberInStock: 10,
    });
  });
  afterEach(async () => {
    await Product.remove({});
    await mongoose.disconnect();
  });

  const exec = () => {
    return request(server)
      .post("/api/products")
      .set("x-auth-token", token)
      .send(product);
  };

  it("should return all products", async () => {
    const res = await exec();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(2);
    expect(Object.keys(res.body[0])).toEqual(
      expect.arrayContaining([
        "name",
        "defaultPrice",
        "numberInStock",
      ])
    );
  });
});
