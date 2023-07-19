import { Fraction } from "fractional";
import View from "./View";

class RecipeView extends View {
  _parentElement = document.querySelector(".recipe");
  _errorMessage = "No recipes found for your query! Please try again";

  addHandlerRender(handlerFun) {
    window.addEventListener("hashchange", handlerFun);
    window.addEventListener("load", handlerFun);
  }

  addHandlerServingsBtns(handlerFun) {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn__servings");
      if (!btn) return;
      const newServings = Number(btn.dataset.servings);
      if (newServings >= 1) {
        handlerFun(newServings);
      }
    });
  }

  addHandlerBookMarkBtn(handlerFun) {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn--add__bookmark");
      if (!btn) return;
      handlerFun();
    });
  }

  _generateMarkup() {
    return ` <figure class="recipe__fig">
    <img src="${this._data.image}" alt="Tomato" class="recipe__img" />
    <h1 class="recipe__title">
        <span>${this._data.title}</span>
    </h1>
    </figure>

    <div class="recipe__details">
    <div class="recipe__info">
        <i class="fa-solid fa-clock recipe__info-icon"></i>
        <span class="recipe__info-data recipe__info-data--minutes">${
          this._data.cookingTime
        }</span>
        <span class="recipe__info-text">minutes</span>
    </div>

    <div class="recipe__info">
        <i class="fa-solid fa-user-group recipe__info-icon"></i>
        <span class="recipe__info-data recipe__info-data--people">${
          this._data.servings
        }</span>
        <span class="recipe__info-text">servings</span>

        <div class="recipe__info-buttons">
        <button data-servings="${
          this._data.servings - 1
        }" class="btn btn--decrease-servings btn__servings">
            <i class="fa-solid fa-minus minus__icon"></i>
        </button>
        <button data-servings="${
          this._data.servings + 1
        }" class="btn btn--increase-servings btn__servings">
            <i class="fa-solid fa-plus plus__icon"></i>
        </button>
        </div>
    </div>

    <button class="btn btn--add__bookmark">
        <i class="fa${
          this._data.bookmarked ? "-solid" : "-regular"
        } fa-bookmark nav-icon icon"></i>
    </button>
    </div>

    <div class="recipe__ingredients">
    <h2 class="recipe__ingredients--heading">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">
    ${this._data.ingredients
      .map((ing) => this._renderIngredients(ing))
      .join("")}
    </ul>
    </div>

    <div class="recipe__directions">
    <h2 class="recipe__directions--heading">How to cook it</h2>
    <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__publisher">${this._data.publisher}</span>. Please
        check out directions at their website.
    </p>
    <a
        class="btn btn--recipe__directions"
        href="${this._data.sourceUrl}"
        target="_blank"
    >
        <span>Directions</span>
        <i class="fa-solid fa-arrow-right next-icon"></i>
    </a>
    </div>`;
  }

  _renderIngredients(ing) {
    return `<li class="recipe__ingredient">
        <i class="fa-solid fa-check check-icon"></i>
        <div class="recipe__quantity">${
          ing.quantity ? new Fraction(ing.quantity).toString() : " "
        }</div>
        <div class="recipe__description">
            <span class="recipe__unit">${ing.unit}</span>
            ${ing.description}
        </div>
        </li>`;
  }
}

export default new RecipeView();
