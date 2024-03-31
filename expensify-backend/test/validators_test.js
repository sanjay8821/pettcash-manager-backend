const {
  validateName,
  validateEmail,
  validatePassword,
} = require("../utlis/validator");

var expect = require("chai").expect;

describe("Testing validators", () => {
  it("Should return true for a valid name", () => {
    expect(validateName("yuvraj")).to.equal(true);
  });

  it("Should return false for a invalid name", () => {
    expect(validateName("yuvraj01")).to.equal(false);
  });

  it("Should return true for a valid email", () => {
    expect(validateEmail("asdf123sldkjfa@gmail.com")).to.equal(true);
  });

  it("Should return false for a invalid email", () => {
    expect(validateEmail("asdjflkdsad.ocm")).to.equal(false);
  });

  it("should return true for a valid password", () => {
    expect(validatePassword("asdfHH123@@#")).to.equal(true);
  });

  it("should return false for a invalid password", () => {
    expect(validatePassword("asdjfkd")).to.equal(false);
  });
});
