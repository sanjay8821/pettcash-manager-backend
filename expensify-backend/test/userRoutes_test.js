const chai = require("chai");
const chaiHttp = require("chai-http");

const should = chai.should();
const server = require("../server");

const API = process.env.BASE_URL;
chai.use(chaiHttp);

describe("/post tesing user sign up", () => {
  it("creates a new user", () => {
    chai
      .request(API)
      .post("/api/v1/user/register")
      .send({
        name: "yuvrajsingh",
        email: "auaaaiuita@gmail.com",
        password: "YUVRAJSINGHsingh123!@#",
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a("Object");
        res.body.should.have.property("message");
        res.body.message.should.contain("Welcome to expenser");
      });
  });
});

describe("/post testing user sign in", () => {
  it("Login in to user accout", () => {
    chai
      .request(API)
      .post("/api/v1/user/login")
      .send({
        email: "yuvrajsingh2348q@gmail.com",
        password: "YUVRAJsingh123!@#",
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("Object");
        res.body.should.have.property("message");
        res.body.message.should.contain("Login  successful");
      });
  });
});
