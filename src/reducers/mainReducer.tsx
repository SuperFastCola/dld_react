
const initialState = {
    category: null,
    results: []
   };
   
   const rootReducer = function(state=initialState,action) {  
       // console.log("rootReducer>>>");
       // console.log(state);
       // console.log(action);
    //  console.log("<<<rootReducer");
      switch (action.type) {
       case "SET_RESULTS":
         state = Object.assign({}, state, {results: action.results})
         return state;
       
       case "SET_LANGUAGE":
         state = Object.assign({}, state, {language: action.language})
       return state;
   
       case "SELECTED_ITEM":
         state = Object.assign({}, state, {selected_item: action.selected_item});
       return state;
   
        case "SET_AJAX_ERROR":
           state = Object.assign({}, state, {error: action.error});
           //console.log(state)
         return state;
       case "SET_CATEGORY":
           state = Object.assign({}, state, {category: action.category});
           console.log(state.category)
         return state;
       case "SET_SEARCH_CATEGORY":
           state = Object.assign({}, state, {category: action.category});
           //console.log(state)
         return state;
       default:
         return state;  
      }
   }
   
   export default rootReducer;