
  export const setResults = results => {
    return {
      type: 'SET_RESULTS',
      "results":results
    }
  }
  
  export const changeLanguage = language => {

    return {
      type: 'SET_LANGUAGE',
      "language":language
    }
  }
  
  export const setTracks = tracks => {
    return {
      type: 'SET_TRACKS',
      "tracks":tracks
    }
  }
  
  export const setAjaxError = error => {
    return {
      type: 'SET_AJAX_ERROR',
      "error":error
    }
  }
  
  export const setArtist = object => {
    return {
      type: 'SET_ARTIST',
      "artist":object
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
  
  
  