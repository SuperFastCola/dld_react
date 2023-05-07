import React from 'react';
import { KeyGenerator } from '../modules/KeyGenerator';
import "./ProjectDetailsItem.scss"

interface Properties {
    item:any; 
    infoType?:string;
    language:string;
    labels:any;
};

class ProjectDetailItem extends React.Component<Properties> {
    keyGen:KeyGenerator = new KeyGenerator();

    createMarkup(text:string){
        return {__html: text};
    } 
    
    render(){
        var labels = this.props.labels;
        var item = this.props.item;
        var infoType = this.props.infoType;
        var lang = this.props.language;

        if(item[infoType] !== undefined && item[infoType][lang] !== undefined && item[infoType][lang] !== null ){
            console.log(infoType);

            switch(infoType){
                case "tech":
                    return(
                        <div className="project-section">
                            <h3>{labels[infoType][lang]}</h3>
                            <ul>
                                {item[infoType][lang].map((tech, index) => (<li key={this.keyGen.createItemKey()}>{tech}</li>))} 
                            </ul>
                        </div>
                    )
                    
                case "url":
                    return (
                        <div className="project-section">
                        {item[infoType][lang].map((urlItem:any) =><a href={urlItem.link} target="new" role="button"  key={this.keyGen.createItemKey()}>{urlItem.text}</a>)}
                        </div>
                    )

                default:
                    return(
                        <div className="project-section">
                           <h3>{labels[infoType][lang]}</h3>
                            <div dangerouslySetInnerHTML={this.createMarkup(item[infoType][lang])}></div>
                        </div>
                    )
            }
        }

        return null;

                    
    }
}

export default ProjectDetailItem;