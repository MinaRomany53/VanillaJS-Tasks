import { async } from "regenerator-runtime";
import * as config from "./config.js";
import * as helper from "./helper.js";

///////////////////////////////////////
/////////////////////////////////////
//////////////////////////////////
//////////////////////////////

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    page: 1,
    resultsPerPage: config.RESULT_PER_PAGE,
    maxPage: 1,
  },
  bookMarks: [],
};

export const loadRecipe = async function (id) {
  try {
    const data = await helper.getJSON(`${config.API_URL}/${id}`);
    const newRecipe = data.data.recipe;
    // Reformatted this json object
    state.recipe = {
      cookingTime: newRecipe.cooking_time,
      id: newRecipe.id,
      image: newRecipe.image_url,
      publisher: newRecipe.publisher,
      servings: newRecipe.servings,
      sourceUrl: newRecipe.source_url,
      title: newRecipe.title,
      ingredients: newRecipe.ingredients,
    };

    if (state.bookMarks.some((bookmark) => bookmark.id === id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }

    // console.log(state.recipe);
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  state.search.query = query;
  try {
    const data = await helper.getJSON(
      `${config.API_URL}?search=${query}&key=${config.API_KEY}`
    );
    state.search.results = data.data.recipes.map((rec) => {
      return {
        id: rec.id,
        title: rec.title,
        image: rec.image_url,
        publisher: rec.publisher,
      };
    });
  } catch (err) {
    throw err;
  }
};

export const SearchPagination = function (page = state.search.page) {
  state.search.page = page;
  state.search.maxPage = Math.ceil(
    state.search.results.length / state.search.resultsPerPage
  );
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach((ing) => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
};

export const addBookmark = function (recipe) {
  state.bookMarks.push(recipe);
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
};

export const deleteBookmark = function (id) {
  const recIndex = state.bookMarks.findIndex((rec) => rec.id === id);
  state.bookMarks.splice(recIndex, 1);
  state.recipe.bookmarked = false;
};

export const setInitialBookMarks = function (bookMarks) {
  state.bookMarks = bookMarks;
};

export const uploadReciepe = async function (newRecipe) {
  try {
    // Convert newReciepe to Api Data Format
    const ingredientsFormated = [];
    for (const [key, value] of Object.entries(newRecipe)) {
      if (key.includes("ingredient") && value) {
        ingArr = value.replaceAll(" ", "").split(",");
        if (ingArr.length !== 3)
          throw new Error(
            "Please Use a Valid Data Format❌❌ Refresh the Page and Try Again"
          );
        [quantity, unit, description] = ingArr;
        quantity = quantity ? Number(quantity) : null;
        ingredientsFormated.push({ quantity, unit, description });
      }
    }
    const reciepeFormated = {
      cooking_time: newRecipe.cookingTime,
      id: newRecipe.id,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      servings: newRecipe.servings,
      source_url: newRecipe.sourceUrl,
      title: newRecipe.title,
      ingredients: ingredientsFormated,
    };

    // Send Reciepe Data to Api
    const res = await helper.sendJSON(
      `${config.API_URL}?key=${config.API_KEY}`,
      reciepeFormated
    );
    const { recipe } = res.data;
    state.recipe = {
      cookingTime: recipe.cooking_time,
      id: recipe.id,
      image: recipe.image_url,
      publisher: recipe.publisher,
      servings: recipe.servings,
      sourceUrl: recipe.source_url,
      title: recipe.title,
      ingredients: recipe.ingredients,
      key: recipe.key,
    };
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};
