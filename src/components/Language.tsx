import React from 'react';
import {connect} from 'react-redux';

interface Properties {
    info:{
        language:string
    };
    changeLanguage(any):void;
};

interface State { 
    label: string;
};

class Language extends React.Component<Properties, State> {   
    constructor(props){
        super(props);
         this.setLanguage = this.setLanguage.bind(this);
         this.setLabel = this.setLabel.bind(this);
    }
    setLanguage(e) {
        e.preventDefault();
        if(this.props.info.language==="en"){
            this.props.changeLanguage("fr");
            this.setState({label:"English"});
        }
        else{
            this.props.changeLanguage("en");
            this.setState({label:"Français"});
        }
    }
    setLabel(){
        if(this.props.info.language==="en"){
            return "Français";
        }
        return "English";
    }
	showLanguage(){
		return (
	    	<>
            <button onClick={this.setLanguage}>{this.setLabel()}</button>
            </>
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
