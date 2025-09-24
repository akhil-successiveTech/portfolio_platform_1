import request from "supertest";
import app from "../src/server.js";

describe("Public API", () => {
  it("should fetch public student portfolio", async () => {
    const student = await request(app).post("/api/auth/register").send({
      name: "Portfolio Student",
      email: "portfolio@test.com",
      password: "123456",
      role: "student",
    });
    const id = student.body.user._id;

    const res = await request(app).get(`/api/public/portfolio/${id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("student");
    expect(res.body).toHaveProperty("experiences");
  });
});
