const axios = require("axios");
const { Diet, Recipe } = require("../db");
const { FOOD_API_KEY } = process.env;

const getApiInfo = async () => {
    try {
        const resAxios = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${FOOD_API_KEY}&addRecipeInformation=true&number=100`);
        const { results } = resAxios.data;
        if (results.length > 0) {
            let response = await results?.map((i) => {
                return {
                    idApi: i.id,
                    name: i.title,
                    vegetarian: i.vegetarian,
                    vegan: i.vegan,
                    glutenFree: i.glutenFree,
                    image: i.image,
                    healthScore: i.healthScore,
                    dishTypes: i.dishTypes?.map(element => element),
                    diets: i.diets?.map(element => element),
                    summary: i.summary,
                    steps: (i.analyzedInstructions[0] ? i.analyzedInstructions[0].steps.map(item => item.step).join(" \n") : '')
                }
            })
            return response;
        }
    } catch (error) {
        console.error(error);
        return ('Apikey error')
    }
}
const getDBInfo = async () => {
    try {
        const resultsDB = await Recipe.findAll({
            include: {
                model: Diet,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        })
        let response = await resultsDB?.map(recipe => {
            return {
                id: recipe.id,
                name: recipe.name,
                summary: recipe.summary,
                score: recipe.score,
                healthScore: recipe.healthScore,
                image: recipe.image,
                steps: recipe.steps,
                diets: recipe.diets?.map(diet => diet.name),
                dishTypes: recipe.dishTypes
            }
        });
        return response;
    } catch (error) {
        console.error(error);
        return ('error')
    }
}
const getAllInfo = async () => {
    try {
        const apiInfo = await getApiInfo();
        const bdInfo = await getDBInfo();
        const infoTotal = apiInfo.concat(bdInfo);
        // const infoTotal = [].concat(bdInfo); 
        return infoTotal;
    } catch (error) {
        return { error: 'data not found' }
    }
}
const getApiInfoByName = async (name) => {
    try {
        const resAxios = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${name}&addRecipeInformation=true&number=100&apiKey=${FOOD_API_KEY}`);
        const { results } = resAxios.data;
        if (results.length > 0) {
            let response = results?.map((i) => {
                return {
                    idApi: i.id,
                    name: i.title,
                    vegetarian: i.vegetarian,
                    vegan: i.vegan,
                    glutenFree: i.glutenFree,
                    image: i.image,
                    healthScore: i.healthScore,
                    dishTypes: i.dishTypes?.map(element => element),
                    diets: i.diets?.map(element => element),
                    summary: i.summary,
                    steps: (i.analyzedInstructions[0] ? i.analyzedInstructions[0].steps.map(item => item.step).join(" \n") : '')
                }
            })
            return response
        }
    } catch (error) {
        console.error(error);
        return ('error')
    }
}

const getDBInfoByName = async (name) => {
    try {
        const DBInfo = await getDBInfo();
        const filtByName = DBInfo.filter(recipe => recipe.name.includes(name));
        return filtByName;
    } catch (error) {
        return ('error')
    }
}

const getInfoByName = async (name) => {
    try {
        const apiByName = await getApiInfoByName(name)
        const DBByName = await getDBInfoByName(name)
        const infoTotal = apiByName.concat(DBByName)
        return infoTotal
    } catch (error) {
        return { error }
    }
}
const getDBInfoByID = async (id) => {
    try {
        const resultsDB = await Recipe.findByPk(id, {
            include: {
                model: Diet,
                atributes: ["name"],
                through: {
                    attributes: [],
                },
            },
        });
        let response =
        {
            id: resultsDB.id,
            name: resultsDB.name,
            summary: resultsDB.summary,
            healthScore: resultsDB.healthScore,
            image: resultsDB.image,
            steps: resultsDB.steps,
            diets: resultsDB.diets?.map(diet => diet.name),
            dishTypes: resultsDB.dishTypes
        }
        console.log(response)
        return response;
    } catch (error) {
        console.error(error);
        return ('error')
    }
}
const getInfoApiByID = async (id) => {
    try {
        const resAxios = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${FOOD_API_KEY}`);
        const { data } = resAxios;
        if (data.title) {
            return {
                name: data.title,
                vegetarian: data.vegetarian,
                vegan: data.vegan,
                glutenFree: data.glutenFree,
                dairyFree: data.dairyFree,
                image: data.image,
                idApi: data.id,
                healthScore: data.healthScore,
                diets: data.diets?.map(element => element),
                dishTypes: data.dishTypes?.map(element => element),
                summary: data.summary,
                steps: data.instructions
            }
        }
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    getAllInfo,
    getInfoByName,
    getDBInfoByID,
    getInfoApiByID
}