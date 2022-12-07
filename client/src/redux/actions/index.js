import axios from 'axios';
const GET_RECIPES = 'GET_RECIPES';
const GET_RECIPE_BY_ID = 'GET_RECIPE_BY_ID';
const GET_RECIPES_BY_NAME = 'GET_RECIPES_BY_NAME';
const GET_TYPE_DIETS = 'GET_TYPE_DIETS';
const ORDER_BY_NAME = 'ORDER_BY_NAME';
const ORDER_BY_SCORE = 'ORDER_BY_SCORE';
const ORDER_BY_TYPE_DIET = 'ORDER_BY_TYPE_DIET'

export const getRecipes = () => {
    return function (dispatch) {
        axios.get(`http://localhost:3001/recipes`)
            .then((json) => {
                return dispatch({
                    type: GET_RECIPES,
                    payload: json.data
                })
            })
    }
}
export const getRecipeByID = (id) => {
    return function (dispatch) {
        axios.get(`http://localhost:3001/recipes/${id}`)
            .then((json) => {
                return dispatch({
                    type: GET_RECIPE_BY_ID,
                    payload: json.data
                })
            })
    }
}
export const getRecipesByName = (name) => {
    return function (dispatch) {
        axios.get(`http://localhost:3001/recipes?name=${name}`)
            .then((json) => {
                return dispatch({
                    type: GET_RECIPES_BY_NAME,
                    payload: json.data
                })
            })
    }
}
export const getTypesDiets = () => {
    return function(dispatch){
        axios.get(`http://localhost:3001/diets`)
        .then((json) => {
            return dispatch({
                type: GET_TYPE_DIETS,
                payload: json.data
            })
        })
    }
}
export const orderByName = (payload) => {
    return {
        type: ORDER_BY_NAME,
        payload
    }
}
export const orderByScore = (payload) => {
    return {
        type: ORDER_BY_SCORE,
        payload
    }
}
export const orderByTypeDiet = (payload) => {
    return {
        type: ORDER_BY_TYPE_DIET,
        payload
    }
}

export const postRecipe = (payload) => {
    return async function(dispatch){
        var json = await axios.post(`http://localhost:3001/recipe`, payload);
        return json
    }
}
