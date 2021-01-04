import React from 'react';
import {connect} from 'react-redux';
import rootReducer from "../reducers/mainReducer";
import {sendAjaxRequest} from "../modules/sendAjaxRequest";

interface Properties {
    info:{
        results:[],
        error:null
    };
    setResults(any):void;
    setAjaxError(any):void;
};

class Projects extends React.Component<Properties> {
	constructor(props) {
		super(props);
		this.ajaxError = this.ajaxError.bind(this);
	}
	showProjects(){
		return (
	    	<div>
	    	<p>Projects</p>
	    	</div>
	    )
	}
	ajaxError(jqXHR, textStatus){
		this.props.setAjaxError(textStatus);
	}
	render() {
	    return this.showProjects();
  }
}

const mapStateToProps = function(state){
	return {"info":state};		
}

 const mapDispatchToProps = function(dispatch) {
    return({
        setResults: (results) => {
        	dispatch({type:"SET_RESULTS","results":results})
        },
        errorAlert: () => {
        	dispatch({type:"ALL"})
        },
        setAjaxError: (error) => {
        	console.log("---",error);
        	dispatch({type:"SET_AJAX_ERROR","error":error})
        }
    })
}


export default connect(mapStateToProps,mapDispatchToProps)(Projects)
