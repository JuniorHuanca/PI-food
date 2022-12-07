export const initialState = {
    allRecipes: [],
    recipe: {},
    typeDiets: [],
    recipesFilter: []
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_RECIPES':
            return {
                ...state,
                allRecipes: action.payload,
                recipesFilter: action.payload
            }
        case 'GET_RECIPE_BY_ID':
            return {
                ...state,
                recipe: action.payload
            }
        case 'GET_RECIPES_BY_NAME':
            return {
                ...state,
                recipesFilter: action.payload
            }
        case 'GET_TYPE_DIETS':
            return {
                ...state,
                typeDiets: action.payload
            }
        case 'ORDER_BY_NAME':
            const recypesByOrder = action.payload === 'atoz' ? state.recipesFilter.sort((a, b) => {
                if (a.name.toLowerCase() > b.name.toLowerCase()) return 1
                else return -1
            }) : state.recipesFilter.sort((a, b) => {
                if (a.name.toLowerCase() < b.name.toLowerCase()) return 1
                else return -1
            })
            return {
                ...state,
                recipesFilter: recypesByOrder
            }
        case 'ORDER_BY_SCORE':
            let recipesByScore = action.payload === 'MenorMayor' ?
                state.recipesFilter.sort((a, b) => {
                    if (a.healthScore > b.healthScore) {
                        return 1
                    }
                    if (b.healthScore > a.healthScore) {
                        return -1
                    }
                    return 0
                }) :
                state.recipesFilter.sort(function (a, b) {
                    if (a.healthScore > b.healthScore) {
                        return -1
                    }
                    if (b.healthScore > a.healthScore) {
                        return 1
                    }
                    return 0
                })
            return {
                ...state,
                recipesFilter: recipesByScore
            }
        case 'ORDER_BY_TYPE_DIET':
            const recipes_All = state.allRecipes
            const filterByType = action.payload === 'all' ? recipes_All : recipes_All.filter(recipe => {
                if (recipe.diets.length > 0) {
                    if (recipe.diets.find(element => element === action.payload)) return recipe
                }

                if ((action.payload === 'vegetarian') && (recipe.hasOwnProperty('vegetarian')) && (recipe.vegetarian === true)) return recipe

                if ((action.payload === 'dairy Free') && (recipe.hasOwnProperty('dairy Free')) && (recipe.dairyFree === true)) return recipe
            })
            return {
                ...state,
                recipesFilter: filterByType
            }
        case 'POST_RECIPES':
            return {
                ...state
            }
        default:
            return state
    }
}
export default rootReducer;