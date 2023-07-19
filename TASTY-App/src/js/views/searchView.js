class SearchView {
  _parentElement = document.querySelector(".search__form");

  _clearInput() {
    this._parentElement.querySelector(".search__field").value = "";
  }

  getSearchQuery() {
    return this._parentElement.querySelector(".search__field").value;
  }

  addHandlerSearch(handlerFun) {
    this._parentElement.addEventListener("submit", (e) => {
      e.preventDefault();
      handlerFun();
      this._clearInput();
    });
  }
}

export default new SearchView();
