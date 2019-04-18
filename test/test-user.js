let User = require("../models/user");
let expect = require("chai").expect;
var sinon = require("sinon");

describe("join controller", () => {
  // Test will pass if the User is saved
  describe("Add a new User", function() {
    it("should create new user", function(done) {
      var UserMock = sinon.mock(
        new User({ username: "arnold", password: "arnold" })
      );
      var user = UserMock.object;
      var expectedResult = { status: true };
      UserMock.expects("save").yields(null, expectedResult);
      user.save(function(err, result) {
        UserMock.verify();
        UserMock.restore();
        expect(result.status).to.be.true;
        done();
      });
    });
    // Test will pass if the todo is not saved
    it("should return error, if user is not saved", function(done) {
      var UserMock = sinon.mock(
        new User({ username: "cornan", password: "cornan" })
      );
      var user = UserMock.object;
      var expectedResult = { status: false };
      UserMock.expects("save").yields(expectedResult, null);
      user.save(function(err, result) {
        UserMock.verify();
        UserMock.restore();
        expect(err.status).to.not.be.true;
        done();
      });
    });
  });
});
