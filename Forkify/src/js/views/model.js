import { API_URL } from './config';
import { getJSON } from './helper';
import { RES_PER_PAGE } from './config';

export const state = {
  recipe: {},
  search: {
    query :'',
    results:[],
    page:1,
    resultsPerPage : RES_PER_PAGE
  },
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);
    let { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(state.recipe);
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const loadSearchResults = async function(query){
  try{
      state.search.query = query;
      const data = await getJSON(` ${API_URL}/?search=${query}`);
      console.log(data)
      state.search.results = data.data.recipes.map(recipe => {
        return{
          id: recipe.id,
          title: recipe.title,
          publisher: recipe.publisher,
          image: recipe.image_url,
        }
      });
  }catch(e){
    console.log(e);
    throw e;
  }
};

export const getSearchResultsPage = function(page = state.search.page){
  state.search.page = page;
  console.log(state.search.resultsPerPage);
   const start = (page - 1) * state.search.resultsPerPage;
   const end = page * state.search.resultsPerPage;
   return state.search.results.slice(start,end);
};

export const updateServings = function(newServing){
    state.recipe.ingredients.forEach(ing => {
          ing.quantity = (ing.quantity * newServing) / state.recipe.servings;
    });

    state.recipe.servings = newServing;
}