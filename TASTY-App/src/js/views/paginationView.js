import View from "./View";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  addClickHandler(handlerFun) {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn");
      if (!btn) return;
      // console.log(btn);
      const goToPage = Number(btn.dataset.goto);
      handlerFun(goToPage);
    });
  }

  _generateMarkup() {
    const currPage = this._data.page;
    const maxPage = this._data.maxPage;
    // only one page
    if (maxPage <= 1) {
      return "";
    }
    // one page and Others
    if (currPage === 1 && currPage < maxPage) {
      return `<button data-goto="${currPage + 1}" class="btn btn--next">
      <span class="number">Page ${currPage + 1}</span>
      <i class="fa-solid fa-arrow-right next-icon"></i>
      </button>`;
    }
    // last page
    if (currPage === maxPage && maxPage > 1) {
      return `<button data-goto="${currPage - 1}" class="btn btn--prev">
      <i class="fa-solid fa-arrow-left prev-icon"></i>
      <span class="number"> Page ${currPage - 1}</span>
      </button>`;
    }
    // other page
    if (currPage > 1 && currPage < maxPage) {
      return `<button data-goto="${currPage - 1}" class="btn btn--prev">
      <i class="fa-solid fa-arrow-left prev-icon"></i>
      <span class="number"> Page ${currPage - 1}</span>
      </button>
      <button data-goto="${currPage + 1}" class="btn btn--next">
      <span class="number">Page ${currPage + 1}</span>
      <i class="fa-solid fa-arrow-right next-icon"></i>
      </button>`;
    }
  }
}

export default new PaginationView();
