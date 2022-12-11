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
    
    render(){
        var labels = this.props.labels;
        var item = this.props.item;
        var infoType = this.props.infoType;
        var lang = this.props.language;

        if(item[infoType] !== undefined && item[infoType][lang] !== undefined && item[infoType][lang].length>0){

            switch(infoType){
                case "tech":
                    return(
                        <>
                            <h3>{labels[infoType][lang]}</h3>
                            <ul>
                                {item[infoType][lang].map((tech, index) => (<li key={this.keyGen.createItemKey()}>{tech}</li>))} 
                            </ul>
                        </>
                    )
                    
                case "url":
                    return (
                        < div className='d-flex flex-column'>
                        {item[infoType][lang].map((urlItem:any) =><a className="btn btn-secondary border mb-2" href={urlItem.link} target="new" role="button"  key={this.keyGen.createItemKey()}>{urlItem.text}</a>)}
                        </div>
                    )

                default:
                    return(
                        <>
                            <h3>{labels[infoType][lang]}</h3>
                            <p>{item[infoType][lang]}</p>
                        </>
                    )
            }
        }

        return null;

                    
    }
}

export default ProjectDetailItem;