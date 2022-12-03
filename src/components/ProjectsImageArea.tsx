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
    currentImageIndex:Number;
}

class ProjectImageArea extends React.Component<Props,State> {
    keyGen:KeyGenerator = new KeyGenerator();
    imageAvailable:boolean = false;

    constructor(Props){
        super(Props);
        this.state = {currentImageIndex:0};
        this.displayImages = this.displayImages.bind(this);
        this.displayImageNav = this.displayImageNav.bind(this);
    }

    displayImages(project:any){
        //return a project image is not null
        var img = project.image[this.props.language][0]??undefined;
        var imageDivHolder:any = [];
        
        if(img!==undefined){
            
            //cycle through image object properties and determine if one of the sources is NOT null
            for(const [key,value] of Object.entries(img)){
                if(key!=="order" && value!==null){
                    this.imageAvailable = true;
                }
            }

            //if has images return project image object
            if(this.imageAvailable){
                imageDivHolder.push(<ProjectImage key={this.keyGen.createItemKey()} source={img} text={project.name[this.props.language]} path={this.props.assetPath} />);
            }

            return (imageDivHolder.length>0)?imageDivHolder:null;
        }
    }

    displayImageNav(project:any){
        if(this.imageAvailable && project[this.props.language]!==undefined){
            if(project[this.props.language].length>1){
                return <div>Project Nav</div>;
            }
        }
    }

    render() {
            return (
                <div className="projectImage">
                    {this.displayImageNav(this.props.project)}
                    {this.displayImages(this.props.project)}
                </div>
            )
    }
}

export default ProjectImageArea;