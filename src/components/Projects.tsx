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

    showCategories(){        
        var categories = this.props.info.category.map((cat) => {
            return this.props.info.results.types.find((type)=>{
                return type.type===cat   
            })
        })

        var categoriesTitle = "";
        categories.forEach((cat,index)=>
            categoriesTitle += cat[this.props.info.language] + (index<categories.length-1?", ":"")
        )
        if(categoriesTitle!==""){
            return categoriesTitle;
        }
        return null;
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
                        return <ProjectSquare key={index} item={item} data-key={index} />
                    }
                    return false;
                }
            );
        }

		return (
	    	<section className="projects">
	    	<h1>{this.props.info.results.labels.projects[this.props.info.language]}</h1>
            <h6>{this.showCategories()}</h6>
            <div className="projectList">                
            {squares}
            </div>
	    	</section>
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
