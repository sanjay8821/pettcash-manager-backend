// const chai = require("chai");
// const chaiHttp = require("chai-http");

// const should = chai.should();
// const server = require("../server");

// const API = process.env.BASE_URL;
// chai.use(chaiHttp);

// describe("/delete testing for delete category", () => {
//   it("delete a category", () => {
//     chai
//       .request(API)
//       .delete("/api/v1/category/123")
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.body.should.have.a("object");
//         res.body.should.have.property("message");
//         res.body.message.should.contain("category deleted");
//         console.log(err);
//       });
//   });
// });
