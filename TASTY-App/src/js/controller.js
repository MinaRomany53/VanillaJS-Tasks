import { async } from "regenerator-runtime/runtime";
import "core-js/stable"; // Polyfilling ES6 features
import "regenerator-runtime/runtime"; // Polyfilling Async Await feature

import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import SearchResultsView from "./views/searchResultsView.js";
import paginationView from "./views/paginationView.js";
import bookMarksView from "./views/bookmarksView.js";
import uploadReciepe from "./views/uploadReciepeView.js";

///////////////////////////////////////
/////////////////////////////////////
//////////////////////////////////
//////////////////////////////

const controlRecipes = async function () {
  const id = window.location.hash.slice(1);
  if (!id) return;

  recipeView.renderSpinner();

  try {
    // Load Recipe
    await model.loadRecipe(id); // not return anything only change the state
    // get current state (recipe)
    const newRecipe = model.state.recipe;
    // Render Recipe in the DOM
    recipeView.render(newRecipe);
    console.log(newRecipe);
  } catch (err) {
    console.log(`${err} 💣💣`);
    // Render Error Message in the DOM
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  // get Search query
  searchQuery = searchView.getSearchQuery();

  SearchResultsView.renderSpinner();

  try {
    // Load Search Results
    await model.loadSearchResults(searchQuery);
    // get current state (searchRecipes)
    const searchResults = model.state.search.results;
    // Render initial Results in the DOM
    SearchResultsView.render(model.SearchPagination(1));
    // Render initial Pagination Buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(`${err} 💣💣`);
    // Render Error Message in the DOM
    SearchResultsView.renderError();
  }
};

const controlPagination = function (goToPage) {
  // Render New Results in the DOM
  SearchResultsView.render(model.SearchPagination(goToPage));
  // Render New Pagination Buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update the Recipe Servings (In State)
  model.updateServings(newServings);
  // Update Recipe View
  const newRecipe = model.state.recipe;
  recipeView.render(newRecipe);
};

const controlBookMarks = function () {
  // Add Reciepe to BookMarks in Model State or delete it
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else model.deleteBookmark(model.state.recipe.id);
  // Update Reciepe View --Btn fill
  recipeView.render(model.state.recipe);
  // Store BookMark at Local Storage
  bookMarksView.updateLocalStorage();
  // Render BookMark
  bookMarksView.render(model.state.bookMarks);
};

const getInitialBookMarks = function () {
  const savedBookMarks = bookMarksView.getLocalStorage();
  if (!savedBookMarks) return;
  model.setInitialBookMarks(savedBookMarks);
  bookMarksView.render(model.state.bookMarks);
};

const controlUploadRecipe = async function (newRecipeData) {
  try {
    // Upload New Recipe
    await model.uploadReciepe(newRecipeData);
    // Render New Reciepe
    recipeView.render(model.state.recipe);
    // Close Popup Window
    uploadReciepe.closeForm();
    // Render Bookmarks
    bookMarksView.render(model.state.bookMarks);
    bookMarksView.updateLocalStorage();
  } catch (err) {
    console.log(`${err} 💣💣`);
    // Render Error Message in the DOM
    uploadReciepe.renderError(err.message);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerServingsBtns(controlServings);
  recipeView.addHandlerBookMarkBtn(controlBookMarks);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addClickHandler(controlPagination);
  uploadReciepe.addHandlerOpenWindow();
  uploadReciepe.addHandlerCloseWindow();
  uploadReciepe.addHandlerUpload(controlUploadRecipe);
  getInitialBookMarks();
};
init();
