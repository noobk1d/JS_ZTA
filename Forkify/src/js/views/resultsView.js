import View from './view';
import previewView from './previewView';
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = `No recipes found for your query!Please try agin with another recipe.`;

  generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}
{
  /* <div class="preview__user-generated">
                  <svg>
                    <use href="${icons}#icon-user"></use>
                  </svg>
                </div> */
}

export default new ResultsView();
