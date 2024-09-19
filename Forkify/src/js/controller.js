import * as model from './views/model';
import recipeView from './views/recipeView';

import icons from 'url:../img/icons.svg';
console.log(icons);

const recipeContainer = document.querySelector('.recipe');



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
  }
};

['hashchange', 'load'].forEach(ev => {
  window.addEventListener(ev, controlRecipe);
});
// window.addEventListener('hashchange', showRecipes);
// window.addEventListener('load', showRecipes);
