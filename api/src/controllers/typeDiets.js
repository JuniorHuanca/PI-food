const { Diet } = require('../db');
const dietTypesDb = ['gluten free', 'whole 30', 'dairy free', 'ketogenic', 'ovo vegetarian', 'lacto ovo vegetarian', 'vegetarian', 'lacto vegetarian', 'vegan', 'pescetarian', 'paleolithic', 'primal', 'low fodmap'];

const typesDiet = () => {
    try {
        dietTypesDb.forEach(e => {
            Diet.findOrCreate({
                where: { name: e }
            })
        });
    }
    catch (e) {
        return 'error'
    }
}
module.exports = {
    typesDiet
}