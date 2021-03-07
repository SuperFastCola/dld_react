import React from 'react';
import ProjectImage from './ProjectImage';
import "./ProjectDetails.scss";
import { connect } from 'react-redux';

interface Properties {
    info: any;
    setSelectedItem?(any):void;
};

class ProjectDetails extends React.Component<Properties> {
    displayProject() {
        if (this.props.info.selected_item != null) {
            return true;
        }
        return false;
    }

    closeDetails(){
		this.props.setSelectedItem(null);
	}

    showProjectDetails() {
        var project = this.props.info.selected_item;
        var lang = this.props.info.language;
        var labels = this.props.info.results.labels;
        return (
            <section className="projectDetails">
                <button type="button" className="btn-close" aria-label="Close" onClick={()=>this.closeDetails()}></button>
                <h1>{project.name[lang]}</h1>
                <div className="projectHolder">
                    <div className="projectImage">
                        <ProjectImage source={project.image[lang]} text={project.name[lang]} path={this.props.info.assetPath} />
                    </div>

                    <div className="projectDescription">
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
        if (this.displayProject()) {
            return this.showProjectDetails();
        }
        return false;
    }
}

const mapStateToProps = function (state) {
    return { "info": state };
}

const mapDispatchToProps = function (dispatch) {
    return ({
        setSelectedItem: (item) => {
            dispatch({ type: "SELECTED_ITEM", "selected_item": item })
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetails)
