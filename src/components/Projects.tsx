import React from 'react';
import {connect} from 'react-redux';
import ProjectSquare from './ProjectSquare';    

interface Properties {
    info:{
        selected_item:any,
        results:any,
        error:null,
        language:string
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
	    	<section className="projects">
	    	<h1>{this.props.info.results.labels.projects[this.props.info.language]}</h1>
            <div className="projectList grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-0.5 grid-flow-row-dense">
                {squares}
            </div>
	    	</section>
	    )
    }
    
	ajaxError(jqXHR, textStatus){
		this.props.setAjaxError(textStatus);
	}
	render() {
        if(this.props.info.selected_item==null){
            return this.showProjects();
        }
        return false;
	    
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
