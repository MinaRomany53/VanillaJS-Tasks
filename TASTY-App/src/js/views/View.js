export default class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }

  renderSpinner() {
    this._parentElement.innerHTML = `
    <div class="spinner">
      <i class="fa-solid fa-asterisk spinner--icon"></i>
    </div>`;
  }

  renderError(message = this._errorMessage) {
    this._parentElement.innerHTML = `<div class="error__message">
    <i class="fa-solid fa-triangle-exclamation error__message--icon"></i>
    <p>${message} </p>
    </div> `;
  }

  _clear() {
    this._parentElement.innerHTML = " ";
  }
}
