import * as model from './views/model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import recipeView from './views/recipeView';

import icons from 'url:../img/icons.svg';
import resultsView from './views/resultsView';
console.log(icons);

const recipeContainer = document.querySelector('.recipe');

if(module.hot){
  module.hot.accept();
}

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
console.log('TEST');

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;
    console.log(1);
    //Loader
    recipeView.renderSpinner(recipeContainer);

    //1 ] Loading the recipe
    await model.loadRecipe(id);
    const { recipe } = model.state;
    console.log(model.state.recipe);

    //2]Rendering the recipe
    recipeView.render(recipe);
  } catch (e) {
    console.log(e);
    recipeView.renderError();
  }
};

const controlSearchResults = async function(){
  try{
      resultsView.renderSpinner();

      const query = searchView.getQuery();  
      console.log(query);
      if(!query) return;
      await model.loadSearchResults(query);
      console.log(model.state.search.results);
      resultsView.render(model.state.search.results);
  }catch(e){
    console.log(e);
  }
}

// window.addEventListener('hashchange', showRecipes);
// window.addEventListener('load', showRecipes);
const init = function(){
  recipeView.addHandleRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
}
init();
