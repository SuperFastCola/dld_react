import React from 'react';
import ProjectImage from './ProjectImage';
import "./ProjectDetails.scss";
import { connect } from 'react-redux';

interface Properties {
    info: any;
    setSelectedItem?(any):void;
};

class ProjectDetails extends React.Component<Properties> {
    constructor(props){
        super(props);
        this.setTop = this.setTop.bind(this);
    }
    displayProject() {
        if (this.props.info.selected_item != null) {
            return true;
        }
        return false;
    }
    closeDetails(){
        window.scroll(0, this.props.info.scrollPosition);
		this.props.setSelectedItem(null);
    }

    setTop(){
        var nav = document.querySelector(".navigation");
        var marginBottom = Number(String(window.getComputedStyle(nav).marginBottom).replace("px",""));
        window.scroll(0, 0);
        return {
            top: String((nav.clientHeight + marginBottom) + "px"),
        };
    }
    
    showItem(item,key){
        var lang = this.props.info.language;
        var labels = this.props.info.results.labels;

        if(item[key] !== undefined && item[key][lang] !== undefined){

            if(key==="tech"){
                return(
                    <>
                        <h3>{labels[key][lang]}</h3>
                        <ul>
                            {item[key][lang].map((tech, index) => (<li key={index}>{tech}</li>))} 
                        </ul>
                    </>
                )
            }
            else{
                return(
                    <>
                        <h3>{labels[key][lang]}</h3>
                        <p>{item[key][lang]}</p>
                    </>
                )
            }
            
        }
        
        return null;
    }

    showProjectDetails() {
        var project = this.props.info.selected_item;
        var lang = this.props.info.language;

        return (
            <section className="projectDetails" style={this.setTop()}>
                <div className="projectClose">
                    <h1>{project.name[lang]}</h1>
                    <button type="button" className="btn-close" aria-label="Close" onClick={()=>this.closeDetails()}></button>
                </div>

                <div className="projectHolder">
                    <div className="projectImage">
                        <ProjectImage source={project.image[lang]} text={project.name[lang]} path={this.props.info.assetPath} />
                    </div>

                    <div className="projectDescription">
                        {this.showItem(project,"description")}
                        {this.showItem(project,"role")}
                        {this.showItem(project,"tech")}                        
                    </div>
                </div>
            </section>
        )
    }

    render() {
        if (this.displayProject()) {
            return this.showProjectDetails();
        }
        return null;
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
