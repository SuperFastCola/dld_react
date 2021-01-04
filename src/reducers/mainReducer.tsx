
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
       
       case "ADD_ALBUM_DETAILS":
         var new_results = Object.assign({}, state.results, {items: action.results.albums})
         state = Object.assign({}, state, {results: new_results})
       return state;
   
       case "SET_TRACKS":
         state = Object.assign({}, state, {selected_tracks: action.tracks})
       return state;
   
        case "SET_AJAX_ERROR":
           state = Object.assign({}, state, {error: action.error});
           //console.log(state)
         return state;
       case "SET_ARTIST":
           state = Object.assign({}, state, {selected_artist: action.artist});
           //console.log(state)
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