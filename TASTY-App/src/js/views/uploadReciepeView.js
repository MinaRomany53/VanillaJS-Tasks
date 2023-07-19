import View from "./View";

class UploadReciepe extends View {
  _parentElement = document.querySelector(".upload");
  _popupWindow = document.querySelector(".add__recipe--window");
  _overlay = document.querySelector(".overlay");
  _openBtn = document.querySelector(".add__recipe--btn");
  _closeBtn = document.querySelector(".btn--close-modal");
  _errorMessage = "Please Enter a Valid Data!❌❌";

  _showForm() {
    this._popupWindow.classList.remove("hidden");
    this._overlay.classList.remove("hidden");
  }
  closeForm() {
    this._popupWindow.classList.add("hidden");
    this._overlay.classList.add("hidden");
  }

  addHandlerOpenWindow() {
    this._openBtn.addEventListener("click", (e) => {
      this._showForm();
    });
  }

  addHandlerCloseWindow() {
    this._closeBtn.addEventListener("click", (e) => {
      this.closeForm();
    });
    this._overlay.addEventListener("click", (e) => {
      this.closeForm();
    });
    window.addEventListener("keydown", (e) => {
      if (e.code === "Escape") this.closeForm();
    });
  }

  addHandlerUpload(handlerFun) {
    this._parentElement.addEventListener("submit", (e) => {
      e.preventDefault();
      // An easy way with this New Api to get all inputs at once in any form
      const dataArr = [...new FormData(this._parentElement)];
      const newRecipeData = Object.fromEntries(dataArr); // Convert Array to Object
      handlerFun(newRecipeData);
    });
  }
}

export default new UploadReciepe();
