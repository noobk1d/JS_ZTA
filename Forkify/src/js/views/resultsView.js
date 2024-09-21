import View from "./view";
import icons from 'url:../../img/icons.svg';

class ResultsView extends View{
   _parentElement = document.querySelector('.results');
   _errorMessage = `No recipes found for your query!Please try agin with another recipe.`

   generateMarkup(){
         return this._data.map(this.generateMarkupPreview).join('');
   }

   generateMarkupPreview(result){
      // console.log(result);
      return `<li class="preview">
            <a class="preview__link " href="${result.id}">
              <figure class="preview__fig">
                <img src="${result.image}" alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${result.publisher}</p>
              </div>
            </a>
          </li>`;
   }
}
{/* <div class="preview__user-generated">
                  <svg>
                    <use href="${icons}#icon-user"></use>
                  </svg>
                </div> */}

export default new ResultsView();