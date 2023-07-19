import View from "./View";

class SearchResultsView extends View {
  _parentElement = document.querySelector(".search__results--list");
  _errorMessage = "No recipes found for your query! Please try again";

  _generateMarkup() {
    return this._data
      .map((rec) => {
        return `<li class="preview">
        <a class="preview__link" href="#${rec.id}">
          <figure class="preview__fig">
            <img src="${rec.image}" alt="Test" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__name">${rec.title}</h4>
            <p class="preview__publisher">${rec.publisher}</p>
          </div>
        </a>
      </li>`;
      })
      .join("");
  }
}
export default new SearchResultsView();
