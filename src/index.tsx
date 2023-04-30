import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from "redux";
import rootReducer from './reducers/mainReducer';
import App from './components/Main';
import reportWebVitals from './reportWebVitals';

let baseURL = "//images.deluxeluxury.com/";

let initialState = {
	error:null, //holds ajax error text - if not null go to Spotify login
	results:null, 
  category:[], //determines which collection component used
  scrollPosition: 0,
  language: "en",
  selected_item: null,
  assetPath: baseURL,
  url: `${baseURL}projects.json?t=${Math.random()}`,
  mobileMenu: false,
}

console.log(initialState);


//connect store
let store = createStore(rootReducer,initialState);

ReactDOM.render(
  <React.StrictMode>
   <Provider store={store}>
    <App />
  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
