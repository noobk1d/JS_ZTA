import { API_URL } from './config';
import { getJSON } from './helper';
import { RES_PER_PAGE } from './config';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmark: [],
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
    // console.log(state.recipe);

    if (state.bookmark.some(rec => rec.id === id)) {
      state.recipe.bookmarked = true;
    } else state.recipe.bookmarked = false;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(` ${API_URL}/?search=${query}`);
    console.log(data);
    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
    state.search.page = 1;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  // console.log(state.search.resultsPerPage);
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServing) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServing) / state.recipe.servings;
  });

  state.recipe.servings = newServing;
};

const persistBookMarks = function (recipe) {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmark));
};

export const addBookmark = function (recipe) {
  //Add bookmark
  state.bookmark.push(recipe);
  console.log(state.bookmark.length);

  //Mark current recipe as BookMark
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  //localstorage
  persistBookMarks();
};

export const removeBookmark = function (id) {
  //Removing from bookmark list
  const recIndex = state.bookmark.findIndex(el => el.id === id);
  state.bookmark.splice(recIndex, 1);

  //Bookmarked Recipe

  if (id === state.recipe.id) {
    state.recipe.bookmarked = false;
  }

  //localstorage
  persistBookMarks();
};

export const uploadRecipes = async function (recipe) {
  const ingredients = Object.entries(recipe)
    .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
    .map(ing => {
      const [quantity, unit, description] = ing[1]
        .replaceAll(' ', '')
        .split(',');
      return { quantity, unit, description };
    });
  console.log(ingredients);
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmark = JSON.parse(storage);
};

init();
console.log(state.bookmark);
