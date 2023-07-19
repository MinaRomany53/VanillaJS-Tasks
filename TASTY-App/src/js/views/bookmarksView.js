import View from "./View";

class BookMarks extends View {
  _parentElement = document.querySelector(".bookmarks__list");
  _errorMessage = "No bookmarks yet. Find a nice recipe and bookmark it";

  updateLocalStorage() {
    window.localStorage.setItem("bookMarks", JSON.stringify(this._data));
  }

  getLocalStorage() {
    const savedBookMarks = JSON.parse(window.localStorage.getItem("bookMarks"));
    if (!savedBookMarks) this.renderError(this._errorMessage);
    return savedBookMarks;
  }

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

export default new BookMarks();
