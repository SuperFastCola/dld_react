import React from 'react';
import "./Language.scss";
import {connect} from 'react-redux';

interface Properties {
    info:{
        language:string
    };
    changeLanguage(any):void;
};

class Language extends React.Component<Properties> {   
    constructor(props){
        super(props);
         this.setLanguage = this.setLanguage.bind(this);
         this.setLabel = this.setLabel.bind(this);
    }
    setLanguage(e) {
        e.preventDefault();
        if(this.props.info.language==="en"){
            this.props.changeLanguage("fr");
        }
        else{
            this.props.changeLanguage("en");
        }
    }
    setLabel(){
        if(this.props.info.language==="en"){
            return "fr";
        }
        return "en";
    }
	showLanguage(){
		return (
	    	<div className="languageButton">
            <button className="btn language" onClick={this.setLanguage}>{this.setLabel()}</button>
            </div>
	    )
    }
	render() {
	    return this.showLanguage();
  }
}

const mapStateToProps = function(state){
	return {"info":state};		
}

 const mapDispatchToProps = function(dispatch) {
    return({
        changeLanguage: (language) => {
        	dispatch({type:"SET_LANGUAGE","language":language})
        }
    })
}


export default connect(mapStateToProps,mapDispatchToProps)(Language)
