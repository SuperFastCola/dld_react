import React from 'react';
import "./ProjectDetails.scss";
import { connect } from 'react-redux';
import { KeyGenerator } from '../modules/KeyGenerator';
import ProjectImageArea from './ProjectsImageArea';
import ProjectDetailItem from './ProjectDetailsItem';

interface Properties {
    info: any;
    setSelectedItem?(any):void;
};

class ProjectDetails extends React.Component<Properties> {
    keyGen:KeyGenerator = new KeyGenerator();
    constructor(props){
        super(props);
        console.log(this.props.info.selected_item);
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
                    <ProjectImageArea project={project} language={lang} assetPath={this.props.info.assetPath} key={this.keyGen.createItemKey()}/>

                    <div className="projectDescription">
                        <ProjectDetailItem item={project} labels={this.props.info.results.labels} infoType={"description"} language={lang}/>
                        <ProjectDetailItem item={project} labels={this.props.info.results.labels} infoType={"role"} language={lang}/>
                        <ProjectDetailItem item={project} labels={this.props.info.results.labels} infoType={"tech"} language={lang}/>       
                        <ProjectDetailItem item={project} labels={this.props.info.results.labels} infoType={"url"} language={lang}/>             
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
