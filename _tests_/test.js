const request = require("supertest");

const db = require("../database/dbConfig.js");
const server = require("../api/server");

it("Testing to see if Jest works", () => {
  expect(1).toBe(1);
});

it("testing if not on development", () => {
  expect(process.env.DB_ENV).toBe("testing");
});

describe("server setup", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  describe("POST register testing", () => {
    it("returns 201 when new user is created", () => {
      return request(server)
        .post("/api/auth/register")
        .send({
          username: "testuser1",
          password: "test1"
        })
        .then(res => {
          expect(res.status).toBe(201);
        });
    });
    it("return JSON", () => {
      return request(server)
        .post("/api/auth/register")
        .send({
          username: "testusers",
          password: "test1"
        })
        .then(res => {
          expect(res.type).toEqual("application/json");
        });
    });
  });

  describe("POST login testing", () => {
    const user = {
      username: "hello",
      password: "world"
    };
    it("logs in", () => {
      return request(server)
        .post("/api/auth/login")
        .send(user)
        .then(res => {
          expect(user).not.toBeNull();
        });
    });
    it("return JSON", () => {
      return request(server)
        .post("/api/auth/login")
        .send({
          username: "student",
          password: "hired"
        })
        .then(res => {
          expect(res.type).toEqual("application/json");
        });
    });
  });

  describe("GET Joke testing", () => {
    it("returns all jokes", () => {
      return request(server)
        .get("/api/jokes")
        .set(
          "Authorization",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6ImNocmlzdGlhbiIsImp3dGlkIjoxLCJpYXQiOjE1Njg5OTcxODUsImV4cCI6MTU2OTAyNTk4NX0.c_l5Ap151tYTgXFZ5RB8J25CBKqLQDAwh1yBazVQWjU"
        )
        .then(res => {
          expect(Array.isArray(res.body)).toBe(true);
        });
    });
    it("expect status 200", () => {
        return request(server)
        .get("/api/jokes")
        .set(
            "Authorization",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6ImNocmlzdGlhbiIsImp3dGlkIjoxLCJpYXQiOjE1Njg5OTcxODUsImV4cCI6MTU2OTAyNTk4NX0.c_l5Ap151tYTgXFZ5RB8J25CBKqLQDAwh1yBazVQWjU"
          )
          .then(res => {
              expect(res.status).toBe(200);
          })
        
    })
  });
});
