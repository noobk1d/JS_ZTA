import View from "./view";
import icons from 'url:../../img/icons.svg';

class PaginationView extends View{
   _parentElement = document.querySelector('.pagination');
  
   addHandlerClick(handler){
      this._parentElement.addEventListener('click',function(e){
         const btn = e.target.closest('.btn--inline');
         const goto = +btn.dataset.goto;
         console.log(goto);
         handler(goto);
      })
   }


   generateMarkup(){
      const currPage = this._data.page;
      const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
      // console.log(numPages);
      
      //Page 1 and other page
      if(currPage === 1 && numPages > 1){
            return  `<button data-goto="${currPage+1}" class="btn--inline pagination__btn--next">
            <span>Page ${currPage+1}</span>
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
            </svg>
         </button> `;
      }
      
      //Last Page
      if(currPage === numPages && numPages > 1){
         return `<button data-goto="${currPage-1}" class="btn--inline pagination__btn--prev">
               <svg class="search__icon">
               <use href="${icons}#icon-arrow-left"></use>
               </svg>
               <span> Page ${currPage-1}</span>
            </button>`;
      }
      //Other Pages
      if( currPage < numPages){
         return `<button data-goto="${currPage-1}" class="btn--inline pagination__btn--prev">
               <svg class="search__icon">
               <use href="${icons}#icon-arrow-left"></use>
               </svg>
               <span>Page ${currPage-1}</span>
            </button>
            <button data-goto="${currPage+1}" class="btn--inline pagination__btn--next">
               <span>Page ${currPage+1}</span>
               <svg class="search__icon">
               <use href="${icons}#icon-arrow-right"></use>
               </svg>
            </button> `
      }

      //Page 1 and no other page
      return ``;
        
   }
}
 
export default new PaginationView();