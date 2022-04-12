
const initialState = {
  category: null,
  results: []
};

const rootReducer = function (state = initialState, action) {
  // console.log("rootReducer>>>");
  // console.log(state);
  // console.log(action);
  //  console.log("<<<rootReducer");
  switch (action.type) {
    case "SET_RESULTS":
      state = Object.assign({}, state, { results: action.results })
      return state;

    case "SET_SCROLL":
      state = Object.assign({}, state, { scrollPosition: action.scroll })
      return state;

    case "SET_LANGUAGE":
      state = Object.assign({}, state, { language: action.language })
      return state;

    case "SELECTED_ITEM":
      state = Object.assign({}, state, { selected_item: action.selected_item });
      return state;

    case "SET_AJAX_ERROR":
      state = Object.assign({}, state, { error: action.error });
      //console.log(state)
      return state;
    case "SET_CATEGORY":
      var categories = [];

      //set categories to zero
      if (action.category === 'all') {
        categories = [];
      }
      //add selected types to 
      else if (state.category.indexOf(action.category) === -1) {
        categories = [...state.category, ...Array(action.category)];
      }
      else {
        categories = state.category.filter((item, index) => {
          return item !== action.category && item !== 'all';
        })
      }
      state = Object.assign({}, state, { category: categories });
      return state;

    case "SET_SEARCH_CATEGORY":
      state = Object.assign({}, state, { category: action.category });
      return state;

    case "SET_MOBILE_MENU":
      state = Object.assign({}, state, { mobileMenu: action.mobileMenu });
      return state;

    default:
      return state;
  }
}

export default rootReducer;