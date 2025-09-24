import request from "supertest";
import app from "../src/server.js";

let orgToken;
let studentId;

describe("Organisation API", () => {
  it("should register organisation", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test Org",
        email: "org@test.com",
        password: "123456",
        role: "organisation",
      });
    expect(res.statusCode).toBe(200);
    orgToken = res.body.token;
  });

  it("should get all students (empty at first)", async () => {
    const res = await request(app)
      .get("/api/org/students")
      .set("Authorization", `Bearer ${orgToken}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should add student experience", async () => {
    // first register a student
    const student = await request(app).post("/api/auth/register").send({
      name: "Another Student",
      email: "another@student.com",
      password: "123456",
      role: "student",
    });
    studentId = student.body.user._id;

    const res = await request(app)
      .post("/api/org/experience")
      .set("Authorization", `Bearer ${orgToken}`)
      .send({
        studentId,
        title: "Internship",
        description: "Worked on backend",
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("experience");
  });
});
