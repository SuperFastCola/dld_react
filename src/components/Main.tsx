import React from 'react';
import {connect} from 'react-redux';
import {sendAjaxRequest} from "../modules/sendAjaxRequest";
import Language from './Language';
import ProjectsList from './Projects';
import ProjectDetails from './ProjectDetails';

interface Properties {
    info:{
        url:null,
        language:string,
        error:null,
        token: null
    };
    setResults(any):void;
    setAjaxError(any):void;
};

class App extends React.Component<Properties> {
	constructor(props) {
		super(props);
		this.ajaxError = this.ajaxError.bind(this);
	}
	componentDidMount() {
			sendAjaxRequest(this.props.info.url,this.props.setResults,this.ajaxError);
	}

	showProjectDetails(){
		
	}

	showApp(){
		return (
	    	<>
            <Language/>
	    	<ProjectsList/>
			<ProjectDetails/>
	    	</>
	    )
	}
	ajaxError(jqXHR, textStatus){
		this.props.setAjaxError(textStatus);
	}
	render() {
	    return this.showApp();
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


export default connect(mapStateToProps,mapDispatchToProps)(App)
