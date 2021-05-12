import React from 'react';
import {connect} from 'react-redux';
import "./Projects.scss";
import ProjectSquare from './ProjectSquare';

interface Properties {
    info:{
        selected_item:any,
        category:Array<number> ,
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
        //create a regular expression pattern
        var pattern = "";

        //iterate through categories to create a string pattern
        this.props.info.category.map( (key,index) => {
            pattern += `(${key})`
            if(index+1 < this.props.info.category.length){
                pattern += "|";
            }
            return true;
        });
        
        //if pattern is still and empty string assign as word character
        if(pattern===""){
            pattern = "\\w";
        }

        //create a new regular expression
        var matcher = new RegExp(pattern,"i");
        
        //create an array of portfolio items
        let squares = [];

        //
        if(this.props.info.results != null){
             squares = this.props.info.results.projects.map((item,index) =>{  
                    if(matcher.test(String(item.type))){
                        return <ProjectSquare key={index} item={item} />
                    }
                    return false;
                }
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
