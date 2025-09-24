import request from "supertest";
import app from "../src/server.js";
import mongoose from "mongoose";

beforeAll(async () => {
  // connect to test db if needed
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Auth API", () => {
  let token;

  it("should register a student", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test Student",
        email: "student@test.com",
        password: "123456",
        role: "student",
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    token = res.body.token;
  });

  it("should login user", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "student@test.com",
        password: "123456",
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});
