import React from 'react';
import "./ProjectDetails.scss";
import { connect } from 'react-redux';
import { KeyGenerator } from '../modules/KeyGenerator';
import ProjectImageArea from './ProjectsImageArea';
import ProjectDetailItem from './ProjectDetailsItem';
import { Navigate } from 'react-router-dom';

interface Properties {
    info: any;
};
interface State{
    closeClicked:boolean
}

class ProjectDetails extends React.Component<Properties,State> {
    keyGen:KeyGenerator = new KeyGenerator();
    constructor(props){
        super(props);
        this.state = {closeClicked:false};
        this.setTop = this.setTop.bind(this);
    }

    closeDetails(){
        window.scroll(0, this.props.info.scrollPosition);
        this.setState({closeClicked:true});
    }

    setTop(){
        var nav = document.querySelector(".navigation");
        if(nav!==null){
            var marginBottom = Number(String(window.getComputedStyle(nav).marginBottom).replace("px",""));
            window.scroll(0, 0);
            return {
                top: String((nav.clientHeight + marginBottom) + "px"),
            };
        }
        return null;
    }

    showProjectDetails() {
        var projectID = Number(window.location.pathname.replace("/",""));
        var project = this.props.info.results.projects.filter(p=>p.id===projectID)[0];
        var lang = this.props.info.language;

        return (
            <section className="projectDetails" style={this.setTop()}>
                <div className="projectClose">
                    <h1>{project.name[lang]}</h1>
                    <div className='btn-close-holder'>
                        <button type="button" className="closer" aria-label="Close" onClick={()=>this.closeDetails()}><span></span></button>
                    </div>
                </div>

                <div className="projectHolder">
                    <ProjectImageArea project={project} language={lang} assetPath={this.props.info.assetPath} key={this.keyGen.createItemKey()}/>

                    <div className="projectDescription">
                        <ProjectDetailItem item={project} labels={this.props.info.results.labels} infoType={"description"} language={lang}/>
                        <ProjectDetailItem item={project} labels={this.props.info.results.labels} infoType={"role"} language={lang}/>
                        <ProjectDetailItem item={project} labels={this.props.info.results.labels} infoType={"tech"} language={lang}/>       
                        <div className="projectUrls">
                            <ProjectDetailItem item={project} labels={this.props.info.results.labels} infoType={"url"} language={lang}/>             
                        </div>
                    </div>

               
                </div>

            </section>
            
        )
    }

    render() {
        if(this.state.closeClicked){
           return <><Navigate to="/" replace={true} /></>
        }
        else if(this.props.info.results!==null && this.props.info.results.projects.length>0){
            return this.showProjectDetails();
        }
        
        return null;
    }
}

const mapStateToProps = function (state) {
    return { "info": state };
}


export default connect(mapStateToProps)(ProjectDetails)
