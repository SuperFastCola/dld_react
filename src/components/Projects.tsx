import React from 'react';
import {connect} from 'react-redux';
import ProjectSquare from './ProjectSquare';    

interface Properties {
    info:{
        results:any,
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
        
        let squares = [];
        if(this.props.info.results != null){
             squares = this.props.info.results.projects.map((item,index) =>
                <ProjectSquare key={index} item={item} />
            );
        }

		return (
	    	<>
	    	<div>Projects</div>
            <div className="projectList grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-0.5 grid-flow-row-dense">
                {squares}
            </div>
	    	</>
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
