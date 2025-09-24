import request from "supertest";
import app from "../src/server.js";

let studentToken;
let expId;

describe("Student API", () => {
  beforeAll(async () => {
    const student = await request(app).post("/api/auth/register").send({
      name: "Student 123",
      email: "stud123@test.com",
      password: "123456",
      role: "student",
    });
    studentToken = student.body.token;
  });

  it("should get my experiences (empty)", async () => {
    const res = await request(app)
      .get("/api/student/experiences")
      .set("Authorization", `Bearer ${studentToken}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should update experience acceptance", async () => {
    // Add experience from org first
    const org = await request(app).post("/api/auth/register").send({
      name: "Org X",
      email: "orgx@test.com",
      password: "123456",
      role: "organisation",
    });
    const orgToken = org.body.token;

    const added = await request(app)
      .post("/api/org/experience")
      .set("Authorization", `Bearer ${orgToken}`)
      .send({
        studentId: (await request(app)
          .post("/api/auth/login")
          .send({ email: "stud123@test.com", password: "123456" })).body.user._id,
        title: "Workshop",
        description: "Attended a workshop",
      });

    expId = added.body.experience._id;

    const res = await request(app)
      .patch(`/api/student/experience/${expId}`)
      .set("Authorization", `Bearer ${studentToken}`)
      .send({ accepted: true });

    expect(res.statusCode).toBe(200);
    expect(res.body.experience.accepted).toBe(true);
  });
});
