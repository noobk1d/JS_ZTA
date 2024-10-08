import { KEY, API_URL } from './config';
import { AJAX } from './helper';
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

const createRecipeObject = function (data) {
  let { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}/${id}?key=${KEY}`);
    state.recipe = createRecipeObject(data);
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
    const data = await AJAX(` ${API_URL}/?search=${query}&key=${KEY}`);
    console.log(data);
    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
        ...(recipe.key && { key: recipe.key }),
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
  try {
    const ingredients = Object.entries(recipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        // const ingArr = ing[1].replaceAll(' ', '').split(',');
        const ingArr = ing[1].split(',').map(el => el.trim());

        if (ingArr.length !== 3)
          throw new Error(
            'Wrong Ingredient format!Please use the correct format:)'
          );
        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });
    // console.log(ingredients);
    const recipeAPIformat = {
      title: recipe.title,
      source_url: recipe.sourceUrl,
      image_url: recipe.image,
      publisher: recipe.publisher,
      cooking_time: recipe.cookingTime,
      servings: recipe.servings,
      ingredients,
    };
    // console.log(recipeAPIformat);
    // const data = await AJAX(`${API_URL}?key=${API_KEY}`, recipeAPIformat);
    const data = await AJAX(`${API_URL}?key=${KEY}`, recipeAPIformat);
    state.recipe = createRecipeObject(data);
    console.log(state.recipe);
    addBookmark(state.recipe);
  } catch (e) {
    throw e;
  }
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmark = JSON.parse(storage);
};

init();
console.log(state.bookmark);
