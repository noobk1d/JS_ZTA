import * as model from './views/model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import recipeView from './views/recipeView';
import paginationView from './views/paginationView';
import bookmarksView from './views/bookmarksView';
import addRecipeView from './views/addRecipeView';
import { MODAL_CLOSE_SEC } from './views/config';

import icons from 'url:../img/icons.svg';
import resultsView from './views/resultsView';
console.log(icons);

const recipeContainer = document.querySelector('.recipe');

if (module.hot) {
  module.hot.accept();
}

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
console.log('TEST');

const controlRecipe = async function () {
  try {
    console.log(1);
    const id = window.location.hash.slice(1);
    console.log(id);
    console.log(2);
    if (!id) return;
    //Loader
    recipeView.renderSpinner(recipeContainer);

    //0]Updating search result list and bookmarks view
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmark);

    //1 ] Loading the recipefalse;
    await model.loadRecipe(id);
    const { recipe } = model.state;
    console.log(model.state.recipe);

    //2]Rendering the recipe
    recipeView.render(recipe);

    //Test:Servings
    //controlServing(8);
  } catch (e) {
    console.log(e);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    const query = searchView.getQuery();
    console.log(query);
    if (!query) return;
    await model.loadSearchResults(query);
    // console.log(model.state.search.results);
    // resultsView.render(model.state.search.results);

    //Render Results
    resultsView.render(model.getSearchResultsPage());

    //Render initial Pagination
    paginationView.render(model.state.search);
  } catch (e) {
    console.log(e);
  }
};

const controlPagination = function (gotoPage) {
  console.log('btn1');
  //Render new results and pagination
  resultsView.render(model.getSearchResultsPage(gotoPage));
  paginationView.render(model.state.search);
};

const controlServing = function (newServings) {
  // console.log('check');
  model.updateServings(newServings);

  //Updating Recipe
  // recipeView.render(model.state.recipe);
  //Update Dom which has only changed,not the entire Dom
  recipeView.update(model.state.recipe);
};

const controlBookMark = function () {
  //Add/Delete Bookmarks
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.removeBookmark(model.state.recipe.id);
  }

  //Render Recipes
  recipeView.update(model.state.recipe);

  //Render Bookmarks
  bookmarksView.render(model.state.bookmark);
};

const controlRenderBookmark = function () {
  bookmarksView.render(model.state.bookmark);
};

//Upload New Recipe
const controlAddRecipe = async function (newRecipe) {
  console.log(newRecipe);
  try {
    await model.uploadRecipes(newRecipe);
    // console.log(model.state.recipe);
    recipeView.render(model.state.recipe);
    //Success Message
    addRecipeView.renderMessage();
    //Close the form
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (e) {
    console.error('💣', e);
    //Render error message
    addRecipeView.renderError(e.message);
  }
};

// window.addEventListener('hashchange', showRecipes);
// window.addEventListener('load', showRecipes);
const init = function () {
  bookmarksView.addHandlerRender(controlRenderBookmark);
  recipeView.addHandleRender(controlRecipe);
  recipeView.addHandlerUpdateServing(controlServing);
  recipeView.addHandlerBookMark(controlBookMark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
