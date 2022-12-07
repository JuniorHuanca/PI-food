const { Recipe } = require("../../src/db.js");
const { expect } = require("chai");

describe("Recipe Model", function () {
  let RecipeTest;
  beforeEach(async function () {
    await Recipe.sync({ force: true });
    RecipeTest = await Recipe.create({ name: "test", summary: "summary" });
  });

  it("throws error if a name isnt provided", (done) => {
    Recipe.create({
      summary: "test",
    })
      .then(() => done(new Error("It shouldnt be created")))
      .catch(() => done());
  });
  it("throws error if a summary isnt provided", (done) => {
    Recipe.create({
      name: "test",
    })
      .then(() => done(new Error("It shouldnt be created")))
      .catch(() => done());
  });
  it("generates an id", () => {
    expect(RecipeTest.id).to.exist;
  });
});