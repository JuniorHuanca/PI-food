const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const agent = session(app);

describe('Recipe routes', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
});
describe('GET /recipes/:id', () => {
  it('should get 200', () => {
    return agent.get('/recipes/715594')
      .then(res => {
        expect(res.status).to.equal(200)
      })
  });
  it('should respond a recipe with the id and the correct name', () => {
    return agent.get("/recipes/716426")
      .then(res => {
        expect(res.body.name).to.equal("Cauliflower, Brown Rice, and Vegetable Fried Rice")
      })
  })
  it('should respond a recipe with the id and the correct name', () => {
    return agent.get("/recipes/715594")
      .then(res => {
        expect(res.body.name).to.equal('Homemade Garlic and Basil French Fries')
      })
  })
  it('should respond a recipe with the id and the correct name', () => {
    return agent.get("/recipes/644387")
      .then(res => {
        expect(res.body.name).to.equal('Garlicky Kale')
      })
  })
});
