
  export const setResults = results => {
    return {
      type: 'SET_RESULTS',
      "results":results
    }
  }

  export const setScroll = scroll => {
    return {
      type: 'SET_SCROLL',
      "scroll":scroll
    }
  }
  
  
  export const changeLanguage = language => {

    return {
      type: 'SET_LANGUAGE',
      "language":language
    }
  }
  
  export const setSelectedItem = object => {
    return {
      type: 'SELECTED_ITEM',
      "selected_item":object
    }
  }

  export const setType = category => {
    return {
      type: 'SET_CATEGORY',
      "category":category
    }
  }
  
  export const setAjaxError = error => {
    return {
      type: 'SET_AJAX_ERROR',
      "error":error
    }
  }
  
 
  
  export const setCategory = category => {
    return {
      type: 'SET_SEARCH_CATEGORY',
      "category":category
    }
  }
  
  export const setNav = category => {
    return {
      type: 'SET_NAV'
    }
  }

  export default {

  }
  
  
  