import React from 'react';
import ProjectImage from './ProjectImage';
import {connect} from 'react-redux';

interface Properties {
	info: any;
};

class ProjectDetails extends React.Component<Properties> {
    displayProject(){
        if(this.props.info.selected_item!=null){
            return true;
        }
        return false;
    }

	showProjectDetails(){
        var project = this.props.info.selected_item;
        var lang = this.props.info.language;
        var labels = this.props.info.results.labels;
		return (
	    	<section className="projectDetails">
                <h1>{project.name[lang]}</h1>
                <div>
                    <ProjectImage source={project.image[lang]} text={project.name[lang]} path={this.props.info.assetPath}/>
                    <div>
                        <h3>{labels.description[lang]}</h3>
                        <p>{project.description[lang]}</p>
                        <h3>{labels.role[lang]}</h3>
                        <p>{project.role[lang]}</p>
                        <h3>{labels.tech[lang]}</h3>
                        <p>{project.tech[lang]}</p>
                    </div>
            
                </div>
	    	</section>
	    )
	}
	
	render() {
        if(this.displayProject()){
            return this.showProjectDetails();
        }
        return false;
  }
}

const mapStateToProps = function(state){
	return {"info":state};		
}

const mapDispatchToProps = function(dispatch) {
    return({
        setSelectedItem: (item) => {
        	dispatch({type:"SELECTED_ITEM","selected_item":item})
        }
    })
}

export default connect(mapStateToProps,mapDispatchToProps)(ProjectDetails)
