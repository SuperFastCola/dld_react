import React from 'react';
import { KeyGenerator } from '../modules/KeyGenerator';
import ProjectImage from './ProjectImage';
import ProjectImageNavigation from './ProjectImageNavigation';

interface Props {
    assetPath: string;
    project:any;
    language:string;
};

interface State{
    currentImageIndex:number;
}

class ProjectImageArea extends React.Component<Props,State> {
    keyGen:KeyGenerator = new KeyGenerator();

    constructor(Props){
        super(Props);
        this.state = {currentImageIndex:0};
        this.displayImages = this.displayImages.bind(this);
        this.displayImageNav = this.displayImageNav.bind(this);
        this.changeImage = this.changeImage.bind(this);
    }

    changeImage(e:any){
        e.preventDefault();
        this.setState({currentImageIndex:Number(e.target.dataset["index"])})
    }

    displayImages(project:any){
        //return a project image is not null
        var img = project.image[this.props.language][this.state.currentImageIndex]??undefined;
        var imageAvailable = false;
        
        if(img!==undefined){
            
            //cycle through image object properties and determine if one of the sources is NOT null
            for(const [key,value] of Object.entries(img)){
                if(key!=="order" && value!==null){
                    imageAvailable = true;
                }
            }

            //if has images return project image object
            if(imageAvailable){
                return <ProjectImage key={this.keyGen.createItemKey()} source={img} text={project.name[this.props.language]} path={this.props.assetPath} />;
            }

            return null;
        }
    }

    displayImageNav(project:any){
        if(project.image[this.props.language]!==undefined && project.image[this.props.language].length>1){
                return <ProjectImageNavigation sources={project.image[this.props.language]} currentImageIndex={this.state.currentImageIndex} selectFunction={this.changeImage} />
        }
    }

    render() {
            return (
                <div className="projectImage d-flex flex-column flex-md-row justify-content-between">
                    {this.displayImageNav(this.props.project)}
                    {this.displayImages(this.props.project)}
                </div>
            )
    }
}

export default ProjectImageArea;